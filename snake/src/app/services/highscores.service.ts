import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

export interface IScoresListItem {
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  public score = new BehaviorSubject<number>(0);
  private _URL = 'https://scores.chrum.it/scores/snake';
  private _POST_SCORE_URL = 'https://scores.chrum.it/scores';
  public score$ = this.score.asObservable();
  public scores$!: Observable<IScoresListItem[]>;

  constructor(private _http: HttpClient) {
    this.scores$ = interval(3000).pipe(
      startWith(0),
      switchMap(() => this.getScores())
    );
  }

  public setScore(score: number): void {
    this.score.next(score);
  }

  public postScore(userData: { name: string; score: number; token: number }) {
    const dataToSend = {
      name: userData.name,
      game: 'snake',
      score: userData.score,
    };
    return this._http.post(this._POST_SCORE_URL, dataToSend, {
      headers: {
        Accept: 'application/json',
        'Auth-Token': userData.token.toString(),
        'Content-Type': 'application/json',
      },
    });
  }

  public getScores(): Observable<IScoresListItem[]> {
    return this._http.get<Array<IScoresListItem>>(this._URL, {
      headers: { Accept: 'application/json' },
    });
  }
}
