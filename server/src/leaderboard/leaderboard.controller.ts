import { Body, Controller, Post } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  async fetchLeaderboard(@Body() usernames: string[]) {
    return this.leaderboardService.fetchLeaderboard$(usernames);
  }
}
