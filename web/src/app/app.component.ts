import { Component, inject, OnInit } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSelect } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { LangDefinition, TranslocoService } from '@jsverse/transloco';
import { AppService } from './app.service';

@Component({
  template: `
    <div>
      @if (appService.$isLoading()) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      }
      <button mat-mini-fab (click)="select.open()">
        <mat-icon>language</mat-icon>
      </button>
      <mat-select
        #select
        (selectionChange)="changeLang($event.value)"
        [hideSingleSelectionIndicator]="true"
      >
        @for(option of langs; track option){
        <mat-option [value]="option.id">
          {{ option.label }}
        </mat-option>
        }
      </mat-select>
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

    button {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 1000;
    }

    mat-select {
      width: 100px;
      position: fixed;
      right: 1rem;
      bottom: 3rem;
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
    }
  `,
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatProgressBar,
    MatIcon,
    MatMiniFabButton,
    MatSelect,
    MatOption,
  ],
})
export class AppComponent implements OnInit {
  protected readonly appService = inject(AppService);
  protected readonly translocoService = inject(TranslocoService);

  protected readonly langs =
    this.translocoService.getAvailableLangs() as LangDefinition[];

  ngOnInit(): void {
    document.querySelector('.loader')?.remove();
    this.appService.initI18N();
  }

  changeLang(lang: string): void {
    this.appService.setLang(lang);
  }
}
