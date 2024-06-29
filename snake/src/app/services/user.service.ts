import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IUserData {
  name: string;
  token: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userData: IUserData = { name: '', token: 0 };
  private _POST_TOKEN_URL = 'https://scores.chrum.it/check-token';

  constructor(private _http: HttpClient) {}

  public isAuthenticated() {
    if (this.userData.name != '' && this.userData.token !== null) {
      return true;
    } else {
      return false;
    }
  }

  public setUserData(name: string, token: number) {
    this.userData = { name: name, token: token };
  }

  public getUserData() {
    return this.userData;
  }

  public checkToken(token: number) {
    const dataTosend = {
      'auth-token': token.toString(),
    };

    return this._http.post(this._POST_TOKEN_URL, dataTosend, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
