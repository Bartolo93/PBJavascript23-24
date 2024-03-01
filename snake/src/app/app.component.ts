import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  playerData: any;

  startGame(playerData: any) {
    this.playerData = playerData;
  }
}
