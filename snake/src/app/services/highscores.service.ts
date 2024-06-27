import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  private apiUrl = 'https://your-api-url'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getHighscores(game: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/scores/${game}`);
  }
}
