import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { FinanceComponent } from './components/finance/finance.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    InventoryComponent,
    FinanceComponent,
    ThemeToggleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NgChartsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { 
        path: 'inventory', 
        component: InventoryComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'EMPLOYEE'] }
      },
      { 
        path: 'finance', 
        component: FinanceComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] }
      },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }