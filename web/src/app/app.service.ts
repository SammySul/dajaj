import { effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly snackBar = inject(MatSnackBar);

  readonly $isLoading = signal(false);
  readonly $isError = signal(false);

  constructor() {
    effect(() => {
      if (this.$isError()) this.snackBar.open('An Error Occured.', 'dismiss');
    });
  }
}
