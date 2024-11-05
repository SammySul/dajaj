import { Component, inject, Input, signal } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { VisualizationsComponent } from './visualizations/visualizations.component';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Observable, switchMap, take, tap } from 'rxjs';
import { PlayerStatsDto } from './leaderboard.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  template: `
    <div>
      <mat-form-field>
        <mat-label>Usernames</mat-label>
        <mat-select [formControl]="usernames" multiple>
          @for (username of $validUsernames(); track username) {
          <mat-option [value]="username">{{ username }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <button mat-icon-button (click)="onRefresh()">
        <mat-icon>refresh</mat-icon>
      </button>
    </div>
    <app-visualizations
      [visualization]="'table'"
      [playerStats]="$playerStats()"
    ></app-visualizations>
  `,
  imports: [
    VisualizationsComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
  ],
  providers: [LeaderboardService],
  selector: 'app-leaderboard',
  standalone: true,
})
export class LeaderboardComponent {
  private readonly leaderboardService = inject(LeaderboardService);

  protected readonly $playerStats = signal<PlayerStatsDto[]>([]);
  protected readonly $validUsernames = toSignal(
    this.leaderboardService
      .getValidPlayers$()
      .pipe(tap((usernames) => this.usernames.setValue(usernames))),
  );

  protected readonly usernames = new FormControl<string[]>([]);

  constructor() {
    this.usernames.valueChanges
      .pipe(
        filter((usernames) => !!usernames),
        switchMap((usernames) => this.getPlayerStats$(usernames, false)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected onRefresh(): void {
    this.getPlayerStats$(this.usernames.value ?? [], true).subscribe();
  }

  protected getPlayerStats$(
    usernames: string[],
    doRefresh = false,
  ): Observable<PlayerStatsDto[]> {
    return this.leaderboardService.getLeaderboard$(usernames, doRefresh).pipe(
      tap((playerStats) => {
        this.$playerStats.set(
          playerStats.filter((stats) => usernames.includes(stats.playerName)),
        );
      }),
      take(1),
    );
  }
}
