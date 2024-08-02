import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(userEmail: string, token: string) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  authenticate(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email?email=${email}`);
  }

  updateUser(userId: number, user: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${userId}`, user);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  resetPassword(email: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reset-password`, { email, newPassword });
  }
}
