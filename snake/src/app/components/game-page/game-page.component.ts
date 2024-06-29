import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GameInfoComponent } from '../game-info/game-info.component';
import { SnakePanelComponent } from '../snake-panel/snake-panel.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameInfoComponent, SnakePanelComponent],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  userName: string = '';
  score: number = 0;
  selectedTheme: string = 'light'; // Domyślna wartość; ustaw to odpowiednio
  time: { seconds: number; minutes: number; hours: number } = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.userName = navigation.extras.state['name'];
    }
  }

  updateTime(time: { seconds: number; minutes: number; hours: number }) {
    this.time = time;
  }

  changePage() {
    this.location.back();
  }

  onFoodEaten(score: number) {
    this.score = score;
  }

  goToScorePage() {
    this.router.navigate(['/scores', this.selectedTheme]);
  }

  userActions: {
    action: string;
    time: { seconds: number; minutes: number; hours: number };
  }[] = [];

  handleActionClicked(action: string): void {
    if (action === 'Reset') {
      this.userActions = [];
    } else {
      this.userActions.push({ action: action, time: this.time });
    }
  }
}
