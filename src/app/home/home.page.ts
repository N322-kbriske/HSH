import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private auth: AuthService, private router: Router) {}

  async signOut() {
    await this.auth.signOut();
    this.router.navigateByUrl('/landing', { replaceUrl: true });
  }
}
