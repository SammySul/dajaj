import { Component, computed, effect, inject, input } from '@angular/core';
import { PlayerStatsDto } from '../../leaderboard.model';
import { BaseChartDirective } from 'ng2-charts';
import { VisualiztionsService } from '../visualiztions.service';

@Component({
  template: `
    <div class="chart__container">
      <canvas baseChart [options]="options" [data]="$datasets()" [type]="'bar'">
      </canvas>
    </div>
  `,
  imports: [BaseChartDirective],
  selector: 'app-bar',
})
export class BarComponent {
  private readonly visualizationsService = inject(VisualiztionsService);
  readonly $playerStats = input.required<PlayerStatsDto[]>({
    alias: 'playerStats',
  });

  protected readonly options = {
    maintainAspectRatio: false,
    indexAxis: 'y' as any,
    plugins: {
      legend: {
        display: true,
        align: 'start' as any,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  private readonly backgroundColors = Array.from(
    this.visualizationsService.backgroundColors,
  );

  protected readonly $datasets = computed(() => {
    const data = this.$playerStats();
    const statList = this.visualizationsService.$statList();

    return {
      datasets: data.map((player) => ({
        label: player.playerName,
        backgroundColor: this.backgroundColors.shift(),
        data: Object.entries(player.stats).map(([key, value]) => {
          const stat = statList?.find((stat) => stat.value === key);
          return {
            y: stat?.label ?? key,
            x: value,
          };
        }),
      })),
    };
  });
}
