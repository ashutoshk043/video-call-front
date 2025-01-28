import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  // BehaviorSubject to hold user data
  private userDataSubject = new BehaviorSubject<any>(null);

  constructor(private cookieService: CookieService) {
    this.decodeTokenAndSetUser();
  }

  /**
   * Decode JWT token from cookie and update user data
   */
  public decodeTokenAndSetUser(): void {
    const token = this.cookieService.get('auth'); // Get the token from cookies
    if (token) {
      try {
        const decodedData = jwtDecode<any>(token); // Decode the token
        this.userDataSubject.next(decodedData); // Set the decoded data in the BehaviorSubject
      } catch (error) {
        console.error('Failed to decode token:', error);
        this.userDataSubject.next(null); // Reset if decoding fails
      }
    } else {
      this.userDataSubject.next(null); // No token found, set null
    }
  }

  /**
   * Get an observable of the user data for subscription
   */
  getUserData() {
    return this.userDataSubject.asObservable();
  }

  /**
   * Manually refresh user data from the token
   */
  refreshUserData(): void {
    this.decodeTokenAndSetUser();
  }

  /**
   * Clear user data (e.g., on logout)
   */
  clearUserData(): void {
    this.cookieService.delete('auth'); // Delete the token cookie
    this.userDataSubject.next(null); // Clear the user data
  }
}
