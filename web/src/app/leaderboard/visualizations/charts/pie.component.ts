import { TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseChartDirective } from 'ng2-charts';
import { startWith, tap } from 'rxjs';
import { PlayerStatsDto, Stats } from '../../leaderboard.model';
import { PieType, pieTypes } from '../visualiztions.model';
import { VisualiztionsService } from '../visualiztions.service';

@Component({
  template: `
    <div class="config__container">
      <mat-form-field>
        <mat-label>Stat</mat-label>
        <mat-select [formControl]="pieType">
          @for (stat of $statList(); track stat) {
          <mat-option [value]="stat.value">{{ stat.label }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Pie Type</mat-label>
        <mat-select [formControl]="pie">
          @for (pieType of pieTypes; track pieType) {
          <mat-option [value]="pieType">{{ pieType | titlecase }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </div>
    <div class="chart__container">
      <canvas baseChart [data]="$datasets()" [type]="pie.value ?? 'doughnut'">
      </canvas>
    </div>
  `,
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  selector: 'app-pie',
  standalone: true,
})
export class PieComponent implements OnInit {
  private readonly visualizationsService = inject(VisualiztionsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly $playerStats = input.required<PlayerStatsDto[]>({
    alias: 'playerStats',
  });

  protected readonly $playerAndStatList = computed(() =>
    this.visualizationsService.$playerAndStatList(),
  );

  protected readonly $statList = computed(() =>
    this.visualizationsService.$statList(),
  );

  protected readonly pieType = new FormControl<keyof Stats>('kills');
  protected readonly pieTypes = pieTypes;
  protected readonly pie = new FormControl<PieType>('doughnut');

  protected readonly $datasets = signal<any>(null);

  constructor() {
    effect(() => this.setDatasets(this.$playerStats(), this.pieType.value), {
      allowSignalWrites: true,
    });
  }

  ngOnInit(): void {
    this.pieType.valueChanges
      .pipe(
        startWith(this.pieType.value),
        tap((selectedStat) =>
          this.setDatasets(this.$playerStats(), selectedStat),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private setDatasets(
    playerStats: PlayerStatsDto[],
    selectedStat?: keyof Stats | null,
  ) {
    const players = playerStats.map((player) => player.playerName);
    const stats = this.$playerAndStatList()
      .map((s) => s.value)
      .filter((stat) => stat === (selectedStat ?? 'kills'));

    this.$datasets.set({
      labels: players,
      datasets: stats.map((stat) => ({
        label: this.$statList().find((s) => s.value === stat)?.label,
        data: playerStats.map(
          // NOTE: the + 0.00000000001 is a workaround for chart.js not rendering 0 values
          (player) => player.stats[stat as keyof Stats] + 0.00000000001,
        ),
      })),
    });
  }
}
