import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-accessory-room',
  templateUrl: './accessory-room.page.html',
  styleUrls: ['./accessory-room.page.scss'],
})
export class AccessoryRoomPage implements OnInit {
  roomName: string;
  constructor(private auth: AuthService) {}

  getRoomName() {
    console.log(this.roomName);
    this.auth.roomName = this.roomName;
    console.log('AUTH ROOM NAME', this.auth.roomName);
    // this.auth.addtoDB();
  }

  ngOnInit() {}
}
