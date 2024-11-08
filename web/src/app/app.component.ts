import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  template: `
    <div class="container">
      @if (appService.$isLoading()) {
      <mat-progress-bar mode="buffer"></mat-progress-bar>
      }
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: `
    main {
      display: flex;
      flex-direction: column;
    }
  `,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressBar],
})
export class AppComponent {
  title = 'dajaj';

  protected readonly appService = inject(AppService);
}
