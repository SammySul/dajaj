import { Component, inject, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
  template: `
    <div class="container">
      @if (appService.$isLoading()) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
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
export class AppComponent implements OnInit {
  protected readonly appService = inject(AppService);

  ngOnInit(): void {
    document.querySelector('.loader')?.remove();
  }
}
