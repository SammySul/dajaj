import { Body, Controller, Post } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardDto } from './leaderboard.model';
import { Observable, of } from 'rxjs';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  fetchLeaderboard(@Body() usernames: string[]): Observable<LeaderboardDto[]> {
    // NOTE: Since we don't have authentication, I'm doing this to make sure we only fetch the leaderboard if player names provided are in the `.env` file
    if (!this.leaderboardService.arePlayerNamesValid(usernames)) return of([]);
    return this.leaderboardService.fetchLeaderboard$(usernames);
  }
}
