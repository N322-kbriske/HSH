import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonModal } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  // public message = 'Add a new image to your card array';
  name: string;
  profile = null;
  public rooms: any = [];
  public currentRoomID: any;
  public currentRoom: any;
  public currentRoomName: string;
  public currentRoomAcc: any = [];
  public newAccName: string;
  public currentAcc: any = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    /* Getting the user profile from the database and assigning it to the variable profile. */
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2200,
      cssClass: 'custom-toast',
      position: position,
      // icon: 'checkmark-outline'
      // buttons: [
      //   {
      //     text: 'Dismiss',
      //     role: 'cancel',
      //   },
      // ],
    });
    await toast.present();
  }

  accPass(acc) {
    // console.log(acc);
    this.currentAcc = acc;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  updateAcc(acc) {
    acc = this.currentAcc;
    console.log(acc);
    acc.name = this.newAccName;
    this.auth.updateAcc(acc);
    this.presentToast('top', 'Accessory Edited');
    this.modal.dismiss();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  deleteAcc(acc) {
    acc = this.currentAcc;
    console.log(acc);
    this.auth.deleteAcc(acc);
    this.presentToast('top', 'Accessory Deleted');
    this.modal.dismiss();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  getCurrentRoom() {
    this.auth.getUserProfile().subscribe((data) => {
      // console.log('room detail retrieval', data);

      //* set retrieved data to local variables for display
      this.rooms = data.rooms;

      this.currentRoomID = this.auth.currentRoomID;

      this.currentRoom = this.rooms.find(
        (room) => room.roomID === this.currentRoomID
      );
      console.log('room obj', this.currentRoom);
      this.auth.currentRoomObj = this.currentRoom;
      console.log('Auth room', this.auth.currentRoomObj);
      // console.log(this.currentRoom.name);

      this.currentRoomName = this.currentRoom.name;
      this.currentRoomAcc = this.currentRoom.accessories;
      console.log('acc array', this.currentRoomAcc);
    });
  }

  addAccToCurrentRoom() {
    console.log('almost there!');
    console.log(this.currentRoom);
    this.router.navigateByUrl('/acc-choices', { replaceUrl: true });
  }

  ngOnInit() {
    // this.getRoom();
    this.getCurrentRoom();
  }
}
