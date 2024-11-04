import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { ListRes } from 'src/core/dtos';
import { PlayerStatsDto } from './leaderboard.model';
import { LeaderboardService } from './leaderboard.service';

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
