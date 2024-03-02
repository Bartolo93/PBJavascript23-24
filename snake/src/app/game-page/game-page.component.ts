import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SnakePanelComponent } from '../snake-panel/snake-panel.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [SnakePanelComponent, GameInfoComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  @Input() userName: string = '';
  score: number = 0;
  time: { seconds: number; minutes: number; hours: number } = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };

  updateTime(time: { seconds: number; minutes: number; hours: number }) {
    this.time = time;
  }

  @Input() welcomePageShouldBeVisible: boolean = false;
  @Output() pageChange = new EventEmitter<void>();

  changePage() {
    this.pageChange.emit();
  }
  onFoodEaten(score: number) {
    this.score = score;
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
