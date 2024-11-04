export interface PlayerResponseDto {
  data: PlayerDto[];
}

export interface MatchResponseDto {
  data: MatchDto;
  included: MatchIncludedDto[];
}

type MatchIncludedDto = ParticipantDto | RosterDto;

export interface ParticipantDto {
  type: 'participant';
  id: string;
  attributes?: {
    stats?: ParticipantStatsDto;
  };
}

export interface ParticipantStatsDto {
  assists: number;
  boosts: number;
  damageDealt: number;
  deathType: 'alive' | 'byplayer' | 'byzone' | 'suicide' | 'logout';
  headshotKills: number;
  heals: number;
  killPlace: number;
  killStreaks: number;
  kills: number;
  longestKill: number;
  name: string;
  playerId: string;
  revives: number;
  rideDistance: number;
  roadKills: number;
  swimDistance: number;
  teamKills: number;
  timeSurvived: number;
  vehicleDestroys: number;
  walkDistance: number;
  weaponsAcquired: number;
  winPlace: number; // rank
}

interface RosterDto {
  type: 'roster';
  id: string;
  attributes: {
    stats: {
      rank: number;
      teamId: number;
    };
    won: 'false' | 'true';
    shardId: 'steam';
  };
  relationships: {
    participants: {
      data: {
        type: 'participant';
        id: string;
      }[];
    };
  };
}

interface PlayerDto {
  type: 'player';
  id: string;
  attributes: {
    name: string;
  };
  relationships: {
    matches: {
      data: {
        type: 'match';
        id: string;
      }[];
    };
  };
}

interface MatchDto {
  type: 'match';
  id: string;
  attributes: {
    createdAt: string;
    gameMode: string;
    mapName: string;
    duration: number;
  };
}

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
