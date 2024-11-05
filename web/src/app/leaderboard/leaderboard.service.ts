import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ListRes } from '../core/dtos';
import { PlayerStatsDto } from './leaderboard.model';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';
import { consumerBeforeComputation } from '@angular/core/primitives/signals';

@Injectable()
export class LeaderboardService {
  private readonly appService = inject(AppService);
  private readonly httpClient = inject(HttpClient);

  private readonly playerStats = signal<PlayerStatsDto[]>([]);
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

  getLeaderboard$(
    usernames: string[],
    doRefresh: boolean = false,
  ): Observable<PlayerStatsDto[]> {
    const cachedPlayerStats = this.playerStats();
    if (
      !doRefresh &&
      cachedPlayerStats.length > 0 &&
      usernames.every((username) =>
        cachedPlayerStats.some((player) => player.playerName === username),
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
          this.appService.$isError.set(true);
          return of([]);
        }),
      );
  }
}
