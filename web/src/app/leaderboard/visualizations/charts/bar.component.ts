import { Component, computed, input } from '@angular/core';
import { PlayerStatsDto } from '../../leaderboard.model';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  template: `
    <div class="chart__container">
      <canvas baseChart [options]="options" [data]="$datasets()" [type]="'bar'">
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
  selector: 'app-bar',
  standalone: true,
})
export class BarComponent {
  readonly $playerStats = input.required<PlayerStatsDto[]>({
    alias: 'playerStats',
  });

  protected readonly options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  protected readonly $datasets = computed(() => {
    const data = this.$playerStats();
    return {
      datasets: data.map((player) => ({
        label: player.playerName,
        data: { ...player.stats },
      })),
    };
  });
}
