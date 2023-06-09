import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  isLoggedIn = false;
  
  constructor(private authService: AuthService) {
    authService.isLoggedIn$.subscribe((val) => (this.isLoggedIn = val));
  }
}
