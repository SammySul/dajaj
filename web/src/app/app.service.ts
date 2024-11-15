import { effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, tap } from 'rxjs';

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
  }

  initI18N(): Observable<any> {
    const setLang = localStorage.getItem('DAJAJ:LANG');
    this.translocoService.setActiveLang(
      setLang ?? this.translocoService.getDefaultLang(),
    );
    return this.translocoService
      .selectTranslate('title')
      .pipe(tap((title) => this.title.setTitle(title)));
  }

  setLang(lang: string): void {
    localStorage.setItem('DAJAJ:LANG', lang);
  }
}
