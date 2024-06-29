import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { RouterOutlet, Router } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GamePageComponent, IntroPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public constructor(
    private _router: Router,
    private userService: UserService
  ) {}
}
