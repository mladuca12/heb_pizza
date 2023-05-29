import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.isLoggedIn$.subscribe((val) => (this.isLoggedIn = val));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
