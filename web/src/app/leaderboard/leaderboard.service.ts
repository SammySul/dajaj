import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';
import { ListRes } from '../core/dtos';
import { PlayerMatchStatsDto, PlayerStatsDto } from './leaderboard.model';

@Injectable()
export class LeaderboardService {
  private readonly appService = inject(AppService);
  private readonly httpClient = inject(HttpClient);

  private readonly playerStats = signal<PlayerStatsDto[]>([]);
  private readonly playerMatchStats = signal<PlayerMatchStatsDto[]>([]);
  private readonly validPlayers = signal<string[]>([]);

  getValidPlayers$(): Observable<string[]> {
    const cachedValidPlayers = this.validPlayers();
    if (cachedValidPlayers.length > 0) return of(cachedValidPlayers);

    return this.httpClient
      .get<ListRes<string>>(`${environment.baseUrl}/leaderboard/players`)
      .pipe(
        map((res) => res.data),
        tap((data) => this.validPlayers.set(data)),
      );
  }

  getPlayersMatchStats$(
    usernames: string[],
    doRefresh: boolean = false,
  ): Observable<PlayerMatchStatsDto[]> {
    const cachedPlayerStats = this.playerMatchStats();
    if (
      !doRefresh &&
      this.areArraysEqual(
        usernames,
        cachedPlayerStats.map((p) => p.playerName),
      )
    ) {
      return of(cachedPlayerStats);
    }

    this.appService.$isError.set(false);
    this.appService.$isLoading.set(true);

    return this.httpClient
      .post<ListRes<PlayerMatchStatsDto>>(
        `${environment.baseUrl}/leaderboard/matches`,
        {
          usernames,
        },
      )
      .pipe(
        map((res) => res.data),
        tap((data) => {
          this.appService.$isLoading.set(false);
          this.playerMatchStats.set(data);
        }),
        catchError((err) => {
          console.error(err);
          this.appService.$isLoading.set(false);
          this.appService.$isError.set(true);
          return of([]);
        }),
      );
  }

  getLeaderboard$(
    usernames: string[],
    doRefresh: boolean = false,
  ): Observable<PlayerStatsDto[]> {
    const cachedPlayerStats = this.playerStats();
    if (
      !doRefresh &&
      this.areArraysEqual(
        usernames,
        cachedPlayerStats.map((p) => p.playerName),
      )
    ) {
      return of(cachedPlayerStats);
    }

    this.appService.$isError.set(false);
    this.appService.$isLoading.set(true);

    return this.httpClient
      .post<ListRes<PlayerStatsDto>>(`${environment.baseUrl}/leaderboard`, {
        usernames,
      })
      .pipe(
        map((res) => res.data),
        tap((data) => {
          this.appService.$isLoading.set(false);
          this.playerStats.set(data);
        }),
        catchError((err) => {
          console.error(err);
          this.appService.$isLoading.set(false);
          this.appService.$isError.set(true);
          return of([]);
        }),
      );
  }

  private areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.slice().sort().toString() === arr2.slice().sort().toString();
  }
}
