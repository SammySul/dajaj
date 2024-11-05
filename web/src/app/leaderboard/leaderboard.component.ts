import { Component, inject } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { VisualizationsComponent } from './visualizations/visualizations.component';

@Component({
  template: `
    <!-- <app-visualizations [visualization]="'table'"></app-visualizations> -->
  `,
  imports: [VisualizationsComponent],
  providers: [LeaderboardService],
  selector: 'app-leaderboard',
  standalone: true,
})
export class LeaderboardComponent {
  private readonly leaderboardService = inject(LeaderboardService);

  protected getPlayerStats$() {
    // this.leaderboardService.getLeaderboard$()
  }
}
