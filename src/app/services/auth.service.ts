import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    // Mock login - replace with real API call
    const mockUsers = {
      'admin@example.com': { id: '1', name: 'Admin User', role: 'ADMIN' as const },
      'employee@example.com': { id: '2', name: 'Employee User', role: 'EMPLOYEE' as const }
    };

    const user = mockUsers[email as keyof typeof mockUsers];

    return of(user).pipe(
      delay(1000),
      tap(user => {
        if (user && password === 'password') {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}