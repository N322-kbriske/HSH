import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Home } from '../models/home.interface';

@Component({
  selector: 'app-home-setup',
  templateUrl: './home-setup.page.html',
  styleUrls: ['./home-setup.page.scss'],
})
export class HomeSetupPage implements OnInit {
  profile = null;
  homeName: string;

  public home: Home = {
    owner: [
      {
        name: '',
        role: '',
      },
    ],
    homeName: '',
    rooms: [
      {
        roomName: '',
        accessories: [
          {
            accessoryName: '',
            accessoryType: '',
            accessoryState: false,
          },
        ],
      },
    ],
  };

  constructor(private auth: AuthService) {
    /* Getting the user profile from the database and assigning it to the variable profile. */
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  /**
   * The function gets the home name from the input field and then adds the home name to the home object
   * and then adds the home object to the database
   */
  getHomeName() {
    // console.log(this.homeName);
    this.home.homeName = this.homeName;
    this.auth.addHomeToDB(this.home);
    // console.log(this.home.homeName);
  }

  ngOnInit() {}
}
