export type PlayerStatsDto = {
  playerName: string;
  stats: Stats;
};

export type Stats = {
  boosts: number;
  knockouts: number;
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
};
