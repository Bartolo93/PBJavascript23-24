import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent {
  @Input() userName: string = '';
  @Input() seconds: number = 0;
  @Input() minutes: number = 0;
  @Input() hours: number = 0;
  @Input() score: number = 0;
  handleFoodEaten(score: number) {
    this.score = score;
  }
}
