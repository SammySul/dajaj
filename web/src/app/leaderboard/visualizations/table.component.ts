import { Component, computed, effect, input, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlayerStatsDto } from '../leaderboard.model';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  template: `
    <mat-table [dataSource]="$dataSource()" class="mat-elevation-z8" matSort>
      <ng-container matColumnDef="playerName">
        <mat-header-cell *matHeaderCellDef>Player</mat-header-cell>
        <mat-cell *matCellDef="let element">{{ element.playerName }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="assists">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Assists</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.assists }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="damage">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Damage</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.damage }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="headshotKills">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Headshot Kills</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{
          element.headshotKills
        }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="heals">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Heals</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.heals }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="kills">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Kills</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.kills }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="longestKill">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Longest Kill</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.longestKill }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="revives">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Revives</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.revives }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="rideDistance">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Ride Distance</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{
          element.rideDistance
        }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="roadKills">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Road Kills</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.roadKills }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="swimDistance">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Swim Distance</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{
          element.swimDistance
        }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="teamKills">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Team Kills</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{ element.teamKills }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="timeSurvived">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Time Survived</mat-header-cell
        >
        <mat-cell *matCellDef="let element">{{
          element.timeSurvived
        }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="vehicleDestroys">
        <mat-header-cell *matHeaderCellDef mat-sort-header
          >Vehicle Destroys</mat-header-cell
        >
        <mat-cell *matCellDef="let element">
          {{ element.vehicleDestroys }}
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="walkDistance">
        <mat-header-cell *matHeaderCellDef>Walk Distance</mat-header-cell>
        <mat-cell *matCellDef="let element">{{
          element.walkDistance
        }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="weaponsAcquired">
        <mat-header-cell *matHeaderCellDef>Weapons Acquired</mat-header-cell>
        <mat-cell *matCellDef="let element">
          {{ element.weaponsAcquired }}
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
  `,
  styles: `
    mat-table {
      width: 100%;
      overflow: auto;
    }

    mat-header-row, mat-row, mat-header-cell, mat-cell {
      min-width: 100px;
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
