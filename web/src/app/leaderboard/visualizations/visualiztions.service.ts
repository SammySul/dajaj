import { computed, Injectable, Signal, signal } from '@angular/core';
import { PlayerStatsDto, Stats } from '../leaderboard.model';

@Injectable({
  providedIn: 'root',
})
export class VisualiztionsService {
  readonly backgroundColors = [
    'rgba(251, 73, 52, 0.7)',
    'rgba(215, 153, 33, 0.7)',
    'rgba(129, 161, 193, 0.7)',
    'rgba(131, 165, 152, 0.7)',
    'rgba(177, 98, 134, 0.7)',
    'rgba(214, 93, 14, 0.7)',
    'rgba(142, 192, 124, 0.7)',
  ];
  readonly $statList = computed(() =>
    this.$playerAndStatList().filter((item) => item.value !== 'playerName'),
  );
  readonly $playerAndStatList: Signal<
    {
      value: keyof Pick<PlayerStatsDto, 'playerName'> | keyof Stats;
      label: string;
    }[]
  > = signal([
    {
      value: 'playerName',
      label: 'Player',
    },
    {
      value: 'kills',
      label: 'Kills',
    },
    {
      value: 'longestKill',
      label: 'Longest Kill',
    },
    {
      value: 'headshotKills',
      label: 'Headshot Kills',
    },
    {
      value: 'roadKills',
      label: 'Road Kills',
    },
    {
      value: 'teamKills',
      label: 'Team Kills',
    },
    {
      value: 'knockouts',
      label: 'Knockouts',
    },
    {
      value: 'assists',
      label: 'Assists',
    },
    {
      value: 'damage',
      label: 'Damage',
    },
    {
      value: 'revives',
      label: 'Revives',
    },
    {
      value: 'heals',
      label: 'Heals',
    },
    {
      value: 'boosts',
      label: 'Boosts',
    },
    {
      value: 'vehicleDestroys',
      label: 'Vehicle Destroys',
    },
    {
      value: 'walkDistance',
      label: 'Walk Distance',
    },
    {
      value: 'rideDistance',
      label: 'Ride Distance',
    },
    {
      value: 'swimDistance',
      label: 'Swim Distance',
    },
    {
      value: 'timeSurvived',
      label: 'Time Survived',
    },
    {
      value: 'weaponsAcquired',
      label: 'Weapons Acquired',
    },
  ]);
}
