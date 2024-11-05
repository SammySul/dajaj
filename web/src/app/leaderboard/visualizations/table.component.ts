import { Component } from '@angular/core';

@Component({
  template: ` <p>table works!</p> `,
  styles: ``,
  selector: 'app-table',
  standalone: true,
})
export class TableComponent {
  protected readonly displayedColumns = [
    'playerName',
    'assists',
    'damage',
    'headshotKills',
    'heals',
    'kills',
    'longestKill',
    'revives',
    'rideDistance',
    'roadKills',
    'swimDistance',
    'teamKills',
    'timeSurvived',
    'vehicleDestroys',
    'walkDistance',
    'weaponsAcquired',
  ];
}
