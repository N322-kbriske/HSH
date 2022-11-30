import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-setup',
  templateUrl: './home-setup.page.html',
  styleUrls: ['./home-setup.page.scss'],
})
export class HomeSetupPage implements OnInit {
  profile = null;
  homeName: string = '';

  constructor(private auth: AuthService) {
    /* Getting the user profile from the database and assigning it to the variable profile. */
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  //* this function sets the initial model for home in auth, and then adds the homeName
  initHome() {
    // console.log('home-setup', this.homeName, 'auth', this.auth.home.homeName);
    this.auth.home = {
      owner: [],
      homeName: this.homeName,
      rooms: [],
    };
    this.auth.save();
  }

  ngOnInit() {}
}
