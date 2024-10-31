import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, map, Observable, of } from 'rxjs';
import { PUBG_API_URL } from './leaderboard.consts';
import { MatchResponseDto, PlayerResponseDto } from './leaderboard.model';

@Injectable()
export class LeaderboardService {
  private readonly apiKey =
    this.configService.getOrThrow<string>('PUBG_API_KEY');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private fetchPlayers$(playerNames: string[]): Observable<PlayerResponseDto> {
    const url =
      `${PUBG_API_URL}/players?filter[playerNames]=` + playerNames.join(',');

    return this.httpService
      .get<PlayerResponseDto>(url, {
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `Bearer ${this.apiKey}`,
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

  private fetchMatch$(matchId: string): Observable<MatchResponseDto> {
    const url = `${PUBG_API_URL}/matches/${matchId}`;

    return this.httpService
      .get<MatchResponseDto>(url, {
        headers: {
          Accept: 'application/vnd.api+json',
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
}
