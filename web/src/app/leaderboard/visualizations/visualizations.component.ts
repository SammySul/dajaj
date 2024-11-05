import { Component, effect, input } from '@angular/core';
import { Visualization } from './visualiztions.model';
import { TableComponent } from './table.component';
import { BarComponent } from './charts/bar.component';
import { PieComponent } from './charts/pie.component';
import { PlayerStatsDto } from '../leaderboard.model';

@Component({
  template: `
    @switch ($visualization()) { @case ('table') {
    <app-table></app-table>
    } @case ('bar') {
    <app-bar></app-bar>
    } @case ('pie') {
    <app-pie></app-pie>
    } }
  `,
  styles: ``,
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

  a = effect(() => {
    console.log(this.$playerStats());
  });
}
