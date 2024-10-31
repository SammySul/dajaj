import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [LeaderboardModule, ConfigModule.forRoot()],
})
export class AppModule {}
