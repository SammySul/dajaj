import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, filter, map, Observable, of, tap } from "rxjs";
import { PlayerStatsDto } from "./leaderboard.model";
import { ListRes } from "../core/dtos";

@Injectable()
export class LeaderboardService {
  private readonly httpClient = inject(HttpClient);

  private readonly playerStats = signal<PlayerStatsDto[]>([]);

  getLeaderboard$(
    doRefresh: boolean = false,
    usernames: string[]
  ): Observable<PlayerStatsDto[]> {
    const cachedPlayerStats = this.playerStats();
    if (!doRefresh && cachedPlayerStats.length > 0)
      return of(cachedPlayerStats);

    return this.httpClient
      .post<ListRes<PlayerStatsDto>>("/leaderboard", { usernames })
      .pipe(
        map((res) => res.data),
        tap((data) => this.playerStats.set(data)),
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      );
  }
}
