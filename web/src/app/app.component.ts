import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  template: `<router-outlet></router-outlet>`,
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent {
  title = "dajaj";
}
