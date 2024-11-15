import { effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { filter, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly translocoService = inject(TranslocoService);
  private readonly title = inject(Title);
  private readonly snackBar = inject(MatSnackBar);

  readonly $isLoading = signal(false);
  readonly $isError = signal(false);

  constructor() {
    effect(() => {
      if (this.$isError()) this.snackBar.open('An Error Occured.', 'dismiss');
    });

    this.translocoService.events$
      .pipe(
        filter((event) => event.type === 'langChanged'),
        switchMap(() => this.translocoService.selectTranslate('title')),
        tap((title) => this.title.setTitle(title)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  initI18N(): void {
    const setLang = localStorage.getItem('DAJAJ:LANG');
    this.translocoService.setActiveLang(
      setLang ?? this.translocoService.getDefaultLang(),
    );
  }

  setLang(lang: string): void {
    localStorage.setItem('DAJAJ:LANG', lang);
    this.translocoService.setActiveLang(lang);
  }
}
