import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import {
  catchError,
  defaultIfEmpty,
  filter,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { PUBG_ACCEPT_HEADER, PUBG_API_URL } from './leaderboard.consts';
import { LeaderboardMapper } from './leaderboard.mapper';
import {
  MatchResponseDto,
  PlayerDto,
  PlayerResponseDto,
  PlayerStatsDto,
} from './leaderboard.model';

@Injectable()
export class LeaderboardService {
  private readonly apiKey =
    this.configService.getOrThrow<string>('PUBG_API_KEY');
  private readonly validPlayers = this.getAvailablePlayers();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  fetchLeaderboard$(playerNames: string[]): Observable<PlayerStatsDto[]> {
    return this.fetchPlayersWithMathes$(playerNames).pipe(
      map((players) => players.map(LeaderboardMapper.toLeaderboardDto)),
    );
  }

  getValidPlayers(): string[] {
    return this.validPlayers;
  }

  arePlayerNamesValid(playerName: string[]): boolean {
    return playerName.every((name) => this.validPlayers.includes(name));
  }

  private fetchPlayersWithMathes$(playerNames: string[]): Observable<
    {
      playerId: string;
      playerName: string;
      matches: MatchResponseDto[];
    }[]
  > {
    return this.fetchPlayers$(playerNames).pipe(
      filter((players) => !!players),
      switchMap((players) => {
        const playersWithMatchIds = players.map((player) => ({
          playerId: player.id,
          playerName: player.attributes.name,
          matches: player.relationships.matches.data.map((match) => match.id),
        }));
        return zip(
          playersWithMatchIds.map((player) => {
            return this.fetchMatches$(player.matches).pipe(
              map((matches) => ({
                playerId: player.playerId,
                playerName: player.playerName,
                matches: matches.filter((match) =>
                  this.doesMatchContainPlayers(
                    match,
                    players.map((p) => p.id),
                  ),
                ),
              })),
            );
          }),
        );
      }),
      defaultIfEmpty([]),
    );
  }

  private doesMatchContainPlayers(
    match: MatchResponseDto,
    playerIds: string[],
  ): boolean {
    return playerIds.every((playerId) =>
      match.included.some(
        (included) =>
          included.type === 'participant' &&
          included.attributes.stats.playerId === playerId,
      ),
    );
  }

  private fetchPlayers$(playerNames: string[]): Observable<PlayerDto[]> {
    const url =
      `${PUBG_API_URL}/players?filter[playerNames]=` + playerNames.join(',');

    return from(this.cacheManager.get<PlayerDto[]>('players')).pipe(
      switchMap((cachedPlayers) => {
        if (
          !!cachedPlayers &&
          playerNames.every((name) =>
            cachedPlayers.some((player) => player.attributes.name === name),
          )
        )
          return of(cachedPlayers).pipe(
            tap(() =>
              Logger.debug(
                'Cache hit, fetching from cache',
                LeaderboardService.name,
              ),
            ),
            map((data) =>
              data.filter((player) =>
                playerNames.includes(player.attributes.name),
              ),
            ),
          );
        else {
          {
            return this.httpService
              .get<PlayerResponseDto>(url, {
                headers: {
                  Accept: PUBG_ACCEPT_HEADER,
                  Authorization: `Bearer ${this.apiKey}`,
                },
              })
              .pipe(
                filter((response) => !!response?.data?.data),
                map((response) => response.data.data),
                tap(async (data) => {
                  Logger.debug(
                    'Cache miss, fetching from API',
                    LeaderboardService.name,
                  );
                  await this.cacheManager.set('players', data, 3600);
                }),
                catchError((error: AxiosError) => {
                  Logger.error(
                    error.message,
                    error.stack,
                    LeaderboardService.name,
                  );
                  return of(null);
                }),
              );
          }
        }
      }),
    );
  }

  private fetchMatches$(matchIds: string[]): Observable<MatchResponseDto[]> {
    return zip(
      matchIds
        .map((matchId) => {
          return this.fetchMatch$(matchId)?.pipe(filter((match) => !!match));
        })
        .filter((match) => !!match),
    ).pipe(defaultIfEmpty([]));
  }

  private fetchMatch$(matchId: string): Observable<MatchResponseDto | null> {
    const url = `${PUBG_API_URL}/matches/${matchId}`;

    return this.httpService
      .get<MatchResponseDto>(url, {
        headers: {
          Accept: PUBG_ACCEPT_HEADER,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error: AxiosError) => {
          Logger.error(error.message, error.stack, LeaderboardService.name);
          return of(null);
        }),
      );
  }

  private getAvailablePlayers(): string[] {
    return this.configService.getOrThrow<string>('PUBG_PLAYERS').split(',');
  }
}
