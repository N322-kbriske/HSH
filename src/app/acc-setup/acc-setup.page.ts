import { Component, OnInit } from '@angular/core';
import { Home } from '../models/home.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-acc-setup',
  templateUrl: './acc-setup.page.html',
  styleUrls: ['./acc-setup.page.scss'],
})
export class AccSetupPage implements OnInit {
  accName: string;
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
  constructor(private auth: AuthService) {}

  getAccName() {
    // console.log(this.homeName);
    this.home.rooms[0].accessories[0].accessoryName = this.accName;
    //? This will likely be another function, or should I store everything in service and push at once?
    // this.auth.addHomeToDB(this.home);
    console.log(this.home.rooms[0].accessories[0].accessoryName);
  }

  ngOnInit() {}
}
