import { effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly translocoService = inject(TranslocoService);
  private readonly snackBar = inject(MatSnackBar);

  readonly $isLoading = signal(false);
  readonly $isError = signal(false);

  constructor() {
    effect(() => {
      if (this.$isError()) this.snackBar.open('An Error Occured.', 'dismiss');
    });
  }

  initI18N(): void {
    const setLang = localStorage.getItem('DAJAJ:LANG');
    this.translocoService.setActiveLang(
      setLang ?? this.translocoService.getDefaultLang(),
    );
  }

  setLang(lang: string): void {
    localStorage.setItem('DAJAJ:LANG', lang);
  }
}
