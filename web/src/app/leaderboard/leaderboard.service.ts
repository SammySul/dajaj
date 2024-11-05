import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ListRes } from '../core/dtos';
import { PlayerStatsDto } from './leaderboard.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LeaderboardService {
  private readonly httpClient = inject(HttpClient);

  private readonly playerStats = signal<PlayerStatsDto[]>([]);
  private readonly validPlayers = signal<string[]>([]);

  getValidPlayers$(): Observable<string[]> {
    return this.httpClient
      .get<ListRes<string>>(`${environment.baseUrl}/leaderboard/players`)
      .pipe(map((res) => res.data));
  }

  getLeaderboard$(
    usernames: string[],
    doRefresh: boolean = false,
  ): Observable<PlayerStatsDto[]> {
    const cachedPlayerStats = this.playerStats();
    if (!doRefresh && cachedPlayerStats.length > 0)
      return of(cachedPlayerStats);

    return this.httpClient
      .post<ListRes<PlayerStatsDto>>(`${environment.baseUrl}/leaderboard`, {
        usernames,
      })
      .pipe(
        map((res) => res.data),
        tap((data) => this.playerStats.set(data)),
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
      );
  }
}
