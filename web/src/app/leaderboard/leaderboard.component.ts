import { Component, inject } from "@angular/core";
import { LeaderboardService } from "./leaderboard.service";

@Component({
  template: ` <p>leaderboard works!</p> `,
  providers: [LeaderboardService],
  selector: "app-leaderboard",
  standalone: true,
})
export class LeaderboardComponent {
  private readonly leaderboardService = inject(LeaderboardService);

  constructor() {
    this.leaderboardService
      .getLeaderboard$(["SamiSul", "Rectifier94"])
      .subscribe(console.log);
  }
}
