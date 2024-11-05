import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  template: `<router-outlet></router-outlet>`,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } 
  `,
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent {
  title = 'dajaj';
}
