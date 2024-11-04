import {
  PlayerStatsDto,
  Stats,
  MatchResponseDto,
  ParticipantDto,
} from './leaderboard.model';

export class LeaderboardMapper {
  static toLeaderboardDto(data: {
    playerId: string;
    playerName: string;
    matches: MatchResponseDto[];
  }): PlayerStatsDto {
    const playerStatsFromMatches = data.matches.flatMap((match) => {
      const playerStats = match.included.filter(
        (included): included is ParticipantDto => {
          return (
            included.type === 'participant' &&
            included.attributes.stats.playerId === data.playerId
          );
        },
      );

      return playerStats.map((playerStat) => playerStat.attributes.stats);
    });

    const stats: Stats = playerStatsFromMatches.reduce(
      (acc, curr) => {
        return {
          assists: acc.assists + curr.assists,
          damage: acc.damage + curr.damageDealt,
          headshotKills: acc.headshotKills + curr.headshotKills,
          heals: acc.heals + curr.heals,
          kills: acc.kills + curr.kills,
          longestKill: Math.max(acc.longestKill, curr.longestKill),
          revives: acc.revives + curr.revives,
          rideDistance: acc.rideDistance + curr.rideDistance,
          roadKills: acc.roadKills + curr.roadKills,
          swimDistance: acc.swimDistance + curr.swimDistance,
          teamKills: acc.teamKills + curr.teamKills,
          timeSurvived: acc.timeSurvived + curr.timeSurvived,
          vehicleDestroys: acc.vehicleDestroys + curr.vehicleDestroys,
          walkDistance: acc.walkDistance + curr.walkDistance,
          weaponsAcquired: acc.weaponsAcquired + curr.weaponsAcquired,
        } as Stats;
      },
      {
        assists: 0,
        damage: 0,
        headshotKills: 0,
        heals: 0,
        kills: 0,
        longestKill: 0,
        revives: 0,
        rideDistance: 0,
        roadKills: 0,
        swimDistance: 0,
        teamKills: 0,
        timeSurvived: 0,
        vehicleDestroys: 0,
        walkDistance: 0,
        weaponsAcquired: 0,
      },
    );
    return {
      playerName: data.playerName,
      stats,
    };
  }
}
