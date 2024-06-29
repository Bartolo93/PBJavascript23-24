import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent, IntroPageComponent, GamePageComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
