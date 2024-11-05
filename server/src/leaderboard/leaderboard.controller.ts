import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { ListRes } from 'src/core/dtos';
import { PlayerStatsDto } from './leaderboard.model';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('players')
  getValidPlayerUsernames(): ListRes<string> {
    return { data: this.leaderboardService.getValidPlayers(), count: 0 };
  }

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
