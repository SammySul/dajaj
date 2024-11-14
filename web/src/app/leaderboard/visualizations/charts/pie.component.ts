import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { PlayerStatsDto, Stats } from '../../leaderboard.model';

@Component({
  template: `
    <div class="chart__container">
      <canvas baseChart [options]="options" [data]="$datasets()" [type]="'pie'">
      </canvas>
    </div>
  `,
  styles: `
    .chart__container {
      position: relative;
      height: 80vh;
      width: 80vw;
    }
  `,
  imports: [BaseChartDirective],
  selector: 'app-pie',
  standalone: true,
})
export class PieComponent {
  readonly $playerStats = input.required<PlayerStatsDto[]>({
    alias: 'playerStats',
  });

  protected readonly options = {};

  protected readonly $datasets = computed(() => {
    const data = this.$playerStats();
    const players = data.map((player) => player.playerName);
    const stats = Object.keys(data[0].stats).filter((stat) => stat === 'kills');

    return {
      labels: players,
      datasets: stats.map((stat) => ({
        label: stat,
        data: data.map((player) => player.stats[stat as keyof Stats]),
      })),
    };

    // return {
    //   datasets: data.map((player) => ({
    //     label: player.playerName,
    //     data: [player.stats.damage],
    //   })),
    // };
  });
}
