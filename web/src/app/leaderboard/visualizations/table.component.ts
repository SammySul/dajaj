import { Component, computed, effect, input, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlayerStatsDto } from '../leaderboard.model';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  template: `
    <table
      mat-table
      [dataSource]="$dataSource()"
      class="mat-elevation-z8"
      matSort
    >
      <ng-container matColumnDef="playerName">
        <th mat-header-cell *matHeaderCellDef>Player</th>
        <td mat-cell *matCellDef="let element">{{ element.playerName }}</td>
      </ng-container>
      <ng-container matColumnDef="assists">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Assists</th>
        <td mat-cell *matCellDef="let element">{{ element.assists }}</td>
      </ng-container>
      <ng-container matColumnDef="damage">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Damage</th>
        <td mat-cell *matCellDef="let element">{{ element.damage }}</td>
      </ng-container>
      <ng-container matColumnDef="headshotKills">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Headshot Kills
        </th>
        <td mat-cell *matCellDef="let element">{{ element.headshotKills }}</td>
      </ng-container>
      <ng-container matColumnDef="heals">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Heals</th>
        <td mat-cell *matCellDef="let element">{{ element.heals }}</td>
      </ng-container>
      <ng-container matColumnDef="kills">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Kills</th>
        <td mat-cell *matCellDef="let element">{{ element.kills }}</td>
      </ng-container>
      <ng-container matColumnDef="longestKill">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Longest Kill</th>
        <td mat-cell *matCellDef="let element">{{ element.longestKill }}</td>
      </ng-container>
      <ng-container matColumnDef="revives">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Revives</th>
        <td mat-cell *matCellDef="let element">{{ element.revives }}</td>
      </ng-container>
      <ng-container matColumnDef="rideDistance">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Ride Distance</th>
        <td mat-cell *matCellDef="let element">{{ element.rideDistance }}</td>
      </ng-container>
      <ng-container matColumnDef="roadKills">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Road Kills</th>
        <td mat-cell *matCellDef="let element">{{ element.roadKills }}</td>
      </ng-container>
      <ng-container matColumnDef="swimDistance">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Swim Distance</th>
        <td mat-cell *matCellDef="let element">{{ element.swimDistance }}</td>
      </ng-container>
      <ng-container matColumnDef="teamKills">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Team Kills</th>
        <td mat-cell *matCellDef="let element">{{ element.teamKills }}</td>
      </ng-container>
      <ng-container matColumnDef="timeSurvived">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Time Survived</th>
        <td mat-cell *matCellDef="let element">{{ element.timeSurvived }}</td>
      </ng-container>
      <ng-container matColumnDef="vehicleDestroys">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Vehicle Destroys
        </th>
        <td mat-cell *matCellDef="let element">
          {{ element.vehicleDestroys }}
        </td>
      </ng-container>
      <ng-container matColumnDef="walkDistance">
        <th mat-header-cell *matHeaderCellDef>Walk Distance</th>
        <td mat-cell *matCellDef="let element">{{ element.walkDistance }}</td>
      </ng-container>
      <ng-container matColumnDef="weaponsAcquired">
        <th mat-header-cell *matHeaderCellDef>Weapons Acquired</th>
        <td mat-cell *matCellDef="let element">
          {{ element.weaponsAcquired }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: `
    table {
      width: 100%;
      overflow-x: auto;
    }

    th, td {
      padding: 16px;
      text-align: left;
    }

    @media (max-width: 600px) {
      th, td {
        display: block;
        width: 100%;
      }
    }
`,
  imports: [MatTableModule, MatSortModule],
  selector: 'app-table',
  standalone: true,
})
export class TableComponent {
  readonly $playerStats = input.required<PlayerStatsDto[]>({
    alias: 'playerStats',
  });

  protected readonly $dataSource = computed(() => {
    const sort = this.$sort();

    const dataSource = new MatTableDataSource(
      this.$playerStats().map((playerStats) => ({
        playerName: playerStats.playerName,
        ...playerStats.stats,
      })),
    );
    if (sort) dataSource.sort = sort;

    return dataSource;
  });

  private readonly $sort = viewChild(MatSort);

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
