import { Component } from '@angular/core';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CommonModule, IntroPageComponent, GamePageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  welcomePageShouldbeVivible = true!;
  userName = '';
  user = { name: '', email: '' };

  handleUserData(userData: { name: string; email: string }) {
    this.user = userData;
  }

  changePage() {
    this.welcomePageShouldbeVivible = !this.welcomePageShouldbeVivible;
  }
}
