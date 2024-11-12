import { Component, input } from '@angular/core';
import { PlayerStatsDto } from '../leaderboard.model';
import { BarComponent } from './charts/bar.component';
import { PieComponent } from './charts/pie.component';
import { TableComponent } from './table.component';
import { Visualization } from './visualiztions.model';

@Component({
  template: `
    @if ($playerStats(); as playerStats) { @switch ($visualization()) { @case
    ('Table') {
    <app-table [playerStats]="playerStats"></app-table>
    } @case ('Bar') {
    <app-bar></app-bar>
    } @case ('Pie') {
    <app-pie></app-pie>
    } } } @else {
    <span> No data to display. </span>
    }
  `,
  imports: [TableComponent, BarComponent, PieComponent],
  selector: 'app-visualizations',
  standalone: true,
})
export class VisualizationsComponent {
  // TODO: we could just pass in the component instead.
  readonly $visualization = input.required<Visualization>({
    alias: 'visualization',
  });
  readonly $playerStats = input.required<PlayerStatsDto[]>({
    alias: 'playerStats',
  });
}
