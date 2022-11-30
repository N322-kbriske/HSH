import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-accessory-room',
  templateUrl: './accessory-room.page.html',
  styleUrls: ['./accessory-room.page.scss'],
})
export class AccessoryRoomPage implements OnInit {
  profile = null;
  roomName: string;
  rooms: [];

  constructor(private auth: AuthService) {
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
      //! this can be used on the next page to show rooms in the acc<>room
      this.rooms = data.rooms;
      // console.log('test', this.rooms);
    });
  }

  getRoom(room) {
    console.log(room);
    // this.auth.home.rooms.push(room);
    this.auth.currentRoomObj = room;
    // this.auth.save();
  }

  getRoomName() {
    // console.log(this.roomName);
    let room = {
      name: this.roomName,
      accessories: [],
      roomID: Date.now().toString(),
    };

    console.log(room);

    //! check the order of these
    this.auth.home.rooms.push(room);
    this.auth.currentRoomObj = room;
    this.auth.save();
  }

  ngOnInit() {}
}
