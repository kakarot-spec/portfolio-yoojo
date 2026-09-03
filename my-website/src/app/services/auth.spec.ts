import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // WARNING: Hardcoded credentials are for DEMO purposes only!
  private readonly VALID_USER = 'admin';
  private readonly VALID_PASS = 'admin123';

  login(username: string, password: string): boolean {
    if (username === this.VALID_USER && password === this.VALID_PASS) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
