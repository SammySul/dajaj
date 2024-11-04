import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlayerStatsDto } from "./leaderboard.model";

@Injectable()
export class LeaderboardService {
  private readonly httpClient = inject(HttpClient);

  async getLeaderboard$(): Observable<PlayerStatsDto> {}
}
