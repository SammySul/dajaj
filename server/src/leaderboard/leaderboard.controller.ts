import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { ListRes } from 'src/core/dtos';
import { PlayerMatchStatsDto, PlayerStatsDto } from './leaderboard.model';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('players')
  getValidPlayerUsernames(): ListRes<string> {
    return { data: this.leaderboardService.getValidPlayers(), count: 0 };
  }

  @Post('matches')
  fetchPlayersMatchStats(
    @Body('usernames') usernames: string[],
  ): Observable<ListRes<PlayerMatchStatsDto>> {
    if (!usernames || !usernames.length) return of({ data: [], count: 0 });

    if (!this.leaderboardService.arePlayerNamesValid(usernames))
      return of({ data: [], count: 0 });

    return this.leaderboardService.fetchPlayerMatchStats$(usernames).pipe(
      map((data) => {
        const res = data.filter((a) => usernames.includes(a.playerName));
        return {
          data: res,
          count: res.length,
        };
      }),
    );
  }

  @Post()
  fetchLeaderboard(
    @Body('usernames') usernames: string[],
  ): Observable<ListRes<PlayerStatsDto>> {
    if (!usernames || !usernames.length) return of({ data: [], count: 0 });

    if (!this.leaderboardService.arePlayerNamesValid(usernames))
      return of({ data: [], count: 0 });

    return this.leaderboardService.fetchLeaderboard$(usernames).pipe(
      map((data) => {
        const res = data.filter((a) => usernames.includes(a.playerName));
        return {
          data: res,
          count: res.length,
        };
      }),
    );
  }
}
