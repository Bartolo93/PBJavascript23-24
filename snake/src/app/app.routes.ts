import { Routes } from '@angular/router';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { ScorePageComponent } from './components/scorepagecomponent/scorePage.component';
import { userGuard } from './guards/userGuard.guard';
export const routes: Routes = [
  { path: 'intro', component: IntroPageComponent },
  {
    path: 'game/:theme',
    component: GamePageComponent,
    canActivate: [userGuard],
  },
  { path: 'scores/:theme', component: ScorePageComponent },
  { path: '**', redirectTo: '/intro', pathMatch: 'full' },
];
