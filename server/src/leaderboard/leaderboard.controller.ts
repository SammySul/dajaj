import { Body, Controller, Post } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { PlayerStatsDto } from './leaderboard.model';
import { map, Observable, of } from 'rxjs';
import { ListRes } from 'src/core/dtos';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  fetchLeaderboard(
    @Body() usernames: string[],
  ): Observable<ListRes<PlayerStatsDto>> {
    if (!this.leaderboardService.arePlayerNamesValid(usernames))
      return of({ data: [], count: 0 });

    return this.leaderboardService.fetchLeaderboard$(usernames).pipe(
      map((data) => ({
        data,
        count: data.length,
      })),
    );
  }
}
