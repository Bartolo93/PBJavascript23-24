import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgxSnakeModule } from 'ngx-snake';

@Component({
  selector: 'app-snake-panel',
  standalone: true,
  imports: [NgxSnakeModule],
  templateUrl: './snake-panel.component.html',
  styleUrl: './snake-panel.component.scss',
})
export class SnakePanelComponent {
  @Output() lineCleared = new EventEmitter<number>();
  @Output() updateTimer = new EventEmitter<{
    seconds: number;
    minutes: number;
    hours: number;
  }>();
  @Input() welcomePageShouldBeVisible: boolean = false;
  @Output() pageChange = new EventEmitter<void>();

  changePage() {
    this.pageChange.emit();
  }

  score = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  isTimerRunning = false;
  timerIntervalId: any;

  timerStart() {
    if (!this.isTimerRunning) {
      this.timerIntervalId = setInterval(() => {
        this.seconds += 1;
        if (this.seconds === 60) {
          this.seconds = 0;
          this.minutes += 1;
        }
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours += 1;
        }
        this.updateTimer.emit({
          seconds: this.seconds,
          minutes: this.minutes,
          hours: this.hours,
        });
      }, 1000);
      this.isTimerRunning = true;
    }
  }

  timerStop() {
    if (this.isTimerRunning) {
      clearInterval(this.timerIntervalId);
      this.isTimerRunning = false;
    }
  }

  timerReset() {
    clearInterval(this.timerIntervalId);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.score = 0;
    if (!this.isTimerRunning) {
      clearInterval(this.timerIntervalId);
      this.updateTimer.emit({
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
      });
      this.lineCleared.emit(this.score);
    } else {
      this.isTimerRunning = false;
      this.timerStart();
      this.updateTimer.emit({
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
      });
      this.lineCleared.emit(this.score);
    }
  }

  onLineCleared() {
    this.score += 10;
    this.lineCleared.emit(this.score);
    this.handleButtonClick('Line Cleared');
  }

  @Output() actionClicked = new EventEmitter<string>();

  handleButtonClick(action: string): void {
    if (action != 'Reset') {
      this.isTimerRunning === true && this.actionClicked.emit(action);
    } else {
      this.actionClicked.emit(action);
    }
  }

  onGameOver() {
    alert('game over');
    this.timerStop();
  }
}
