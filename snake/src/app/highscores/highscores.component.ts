import { Component, OnInit } from '@angular/core';
import { HighscoresService, Highscore } from './../services/highscores.service';
@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css'],
})
export class HighscoresComponent implements OnInit {
  highscores: Highscore[] = [];
  sortedBy: string = 'desc'; // Default sorting by descending

  constructor(private highscoresService: HighscoresService) {}

  ngOnInit(): void {
    this.loadHighscores();
  }

  loadHighscores(): void {
    this.highscoresService.getHighscores().subscribe((data: Highscore[]) => {
      this.highscores = data.slice(0, 10); // Show only top 10
      this.sortHighscores();
    });
  }

  sortHighscores(): void {
    if (this.sortedBy === 'asc') {
      this.highscores.sort((a, b) => a.score - b.score);
    } else {
      this.highscores.sort((a, b) => b.score - a.score);
    }
  }

  toggleSortOrder(): void {
    this.sortedBy = this.sortedBy === 'asc' ? 'desc' : 'asc';
    this.sortHighscores();
  }
}
