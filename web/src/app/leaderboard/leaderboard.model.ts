export interface PlayerStatsDto {
  playerName: string;
  stats: Stats;
}

export interface Stats {
  assists: number;
  damage: number;
  headshotKills: number;
  heals: number;
  kills: number;
  longestKill: number;
  revives: number;
  rideDistance: number;
  roadKills: number;
  swimDistance: number;
  teamKills: number;
  timeSurvived: number;
  vehicleDestroys: number;
  walkDistance: number;
  weaponsAcquired: number;
}
