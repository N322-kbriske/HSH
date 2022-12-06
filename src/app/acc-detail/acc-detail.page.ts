import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonModal } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-acc-detail',
  templateUrl: './acc-detail.page.html',
  styleUrls: ['./acc-detail.page.scss'],
})
export class AccDetailPage implements OnInit {
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

  getCurrentAcc() {
    this.currentAcc = this.auth.currentAccObj;
    console.log('get current', this.currentAcc);
  }

  updateAcc(acc) {
    acc = this.currentAcc;
    console.log('current', acc);
    acc.name = this.newAccName;
    this.auth.updateAcc(acc);
    this.presentToast('top', 'Accessory Edited');
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  deleteAcc(acc) {
    acc = this.currentAcc;
    console.log('DELETE TIME', acc);
    this.auth.deleteAcc(acc);
    this.presentToast('top', 'Accessory Deleted');
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  ngOnInit() {
    this.getCurrentAcc();
  }
}
