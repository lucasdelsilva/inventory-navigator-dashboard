import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" [class.dark-theme]="isDarkTheme">
      <mat-sidenav-container>
        <mat-sidenav *ngIf="isLoggedIn" mode="side" opened>
          <app-sidebar></app-sidebar>
        </mat-sidenav>
        <mat-sidenav-content>
          <div class="theme-toggle">
            <app-theme-toggle (themeChange)="onThemeChange($event)"></app-theme-toggle>
          </div>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
    }
    .theme-toggle {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
    }
    .dark-theme {
      background-color: #1a1a1a;
      color: #ffffff;
    }
  `]
})
export class AppComponent {
  isDarkTheme = false;
  isLoggedIn = false;

  constructor() {
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  onThemeChange(isDark: boolean) {
    this.isDarkTheme = isDark;
  }
}