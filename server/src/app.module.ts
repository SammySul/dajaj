import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    LeaderboardModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ global: true }),
  ],
})
export class AppModule {}
