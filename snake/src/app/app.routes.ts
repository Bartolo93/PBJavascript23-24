import { Routes } from '@angular/router';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
  { path: 'intro', component: IntroPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
];
