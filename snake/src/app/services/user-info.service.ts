import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private playerData = { name: '', email: '' };
  private ageVerified = false;

  setPlayerData(name: string, email: string) {
    this.playerData = { name, email };
  }

  getPlayerData() {
    return this.playerData;
  }

  setAgeVerified(value: boolean) {
    this.ageVerified = value;
  }

  isAgeVerified() {
    return this.ageVerified;
  }
}
