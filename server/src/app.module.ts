import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    LeaderboardModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ global: true }),
  ],
})
export class AppModule {}
