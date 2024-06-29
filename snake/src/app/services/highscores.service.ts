import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Highscore {
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  private url = 'https://scores.chrum.it/snake';

  constructor(private http: HttpClient) {}

  getHighscores(): Observable<Highscore[]> {
    return this.http.get<Highscore[]>(this.url);
  }
}
