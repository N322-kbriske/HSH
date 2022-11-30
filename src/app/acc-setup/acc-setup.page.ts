import { Component, OnInit } from '@angular/core';
import { Home } from '../models/home.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-acc-setup',
  templateUrl: './acc-setup.page.html',
  styleUrls: ['./acc-setup.page.scss'],
})
export class AccSetupPage implements OnInit {
  profile = null;
  accName: string;
  accType: string;
  currentRoom: any = {};

  constructor(private auth: AuthService) {
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  initAccessory() {
    console.log(this.accName);
    this.accType = this.auth.accType;

    let accessory = {
      name: this.accName,
      type: this.accType,
      state: false,
      accessoryID: Date.now().toString(),
    };

    this.currentRoom.accessories.push(accessory);
    this.auth.currentRoomObj = this.currentRoom;
    this.auth.updateRoom();
    console.log(this.currentRoom);
    // this.auth.home.rooms[idx].accessories.push(accessory);
    // console.log('AUTH ACCESSORIES', this.auth.home.rooms[idx].accessories);
    this.auth.save();
  }

  ngOnInit() {
    console.log(this.auth.currentRoomID);
    this.currentRoom = this.auth.currentRoomObj;
    // console.log(this.currentRoom);
  }
}
