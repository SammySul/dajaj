import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  template: `
    <div class="container">
      @if(appService.$isLoading()) {
      <mat-progress-bar mode="buffer"></mat-progress-bar>
      }
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: `
    main {
      margin: auto;
      padding: 1rem;
      border: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 1024px) {
        max-width: 42rem;
      }
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
