import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //TODO try setting the entire data object equal to home instead of these individually? Might not work since we need to display them on html
  public homeName: string;
  // public roomName: string;
  public rooms: any = [];
  public owners: [];
  public accessories: any = [];
  public currentRoom: string;
  public currentAcc: string;

  constructor(private auth: AuthService, private router: Router) {}

  //* this has been moved to profile-detail
  // async signOut() {
  //   await this.auth.signOut();
  //   this.router.navigateByUrl('/landing', { replaceUrl: true });
  // }

  async profile() {
    this.router.navigateByUrl('/profile-detail', { replaceUrl: true });
  }

  async getHomeInfo() {
    // console.log(this.auth);
    this.auth.getUserProfile().subscribe((data) => {
      // console.log('home page retrieval', data);

      //* set retrieved data to local variables for display
      this.homeName = data.homeName;
      this.rooms = data.rooms;
      this.owners = data.owner;
      //TODO need to retrieve rooms from service and then display each accessory in every room

      data.rooms.forEach((room) => {
        // console.log(room.name);
        // this.accessories = room.accessories;
        // console.log(room.accessories);
        // room.accessories.forEach((accessory) => {
        //   console.log(accessory.name);
        // });
      });
    });
  }

  roomDetail(roomID) {
    this.currentRoom = roomID;
    // console.log('current room:', this.currentRoom);
    //! ensure steps
    this.auth.currentRoomID = this.currentRoom;
    this.router.navigateByUrl('/room-detail', { replaceUrl: true });
  }

  accDetail(accID) {
    console.log(accID);
  }

  addAcc() {
    // console.log('clicked');
    //update the home object in auth service
    //in your auth call save.
  }

  changeState(accessoryID) {
    this.currentAcc = accessoryID;
    console.log('current acc:', this.currentAcc);
    this.auth.currentAccID = this.currentAcc;
  }

  ngOnInit() {
    this.getHomeInfo();
  }
}
