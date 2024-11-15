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

@Component({
  template: `
    <div class="config__container">
      <mat-form-field>
        <mat-label>Stat</mat-label>
        <mat-select [formControl]="pieType">
          @for (stat of $statList(); track stat) {
          <mat-option [value]="stat">{{ stat }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Pie Type</mat-label>
        <mat-select [formControl]="pie">
          @for (pieType of pieTypes; track pieType) {
          <mat-option [value]="pieType">{{ pieType }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </div>
    <div class="chart__container">
      <canvas
        baseChart
        [options]="options"
        [data]="$datasets()"
        [type]="pie.value ?? 'doughnut'"
      >
      </canvas>
    </div>
  `,
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-pie',
  standalone: true,
})
export class PieComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly $playerStats = input.required<PlayerStatsDto[]>({
    alias: 'playerStats',
  });

  protected readonly pieType = new FormControl<keyof Stats>('kills');
  protected readonly pieTypes = pieTypes;
  protected readonly pie = new FormControl<PieType>('doughnut');

  protected readonly $statList = computed(() => {
    const statKeys = this.$playerStats().find((p) => !!p)?.stats;
    return Object.keys(statKeys ?? {});
  });

  protected readonly options = {};

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
    const stats = Object.keys(
      playerStats.find((stat) => !!stat)?.stats ?? {},
    ).filter((stat) => stat === (selectedStat ?? 'kills'));

    this.$datasets.set({
      labels: players,
      datasets: stats.map((stat) => ({
        label: stat,
        data: playerStats.map((player) => player.stats[stat as keyof Stats]),
      })),
    });
  }
}
