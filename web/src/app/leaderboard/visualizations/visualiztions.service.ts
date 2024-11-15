import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisualiztionsService {
  private readonly translocoService = inject(TranslocoService);

  readonly backgroundColors = [
    'rgba(251, 73, 52, 0.7)',
    'rgba(215, 153, 33, 0.7)',
    'rgba(129, 161, 193, 0.7)',
    'rgba(131, 165, 152, 0.7)',
    'rgba(177, 98, 134, 0.7)',
    'rgba(214, 93, 14, 0.7)',
    'rgba(142, 192, 124, 0.7)',
  ];
  readonly $statList = computed(() =>
    this.$playerAndStatList()?.filter((item) => item.value !== 'playerName'),
  );
  readonly $playerAndStatList = toSignal(
    this.translocoService.selectTranslateObject('stats').pipe(
      map((translations) => [
        ...Object.entries(translations).map(([key, value]) => ({
          value: key,
          label: value as string,
        })),
      ]),
    ),
  );
}
