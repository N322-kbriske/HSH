import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {
  profile = null;
  public owners: [];
  public ownerFirstName: string;
  public ownerLastName: string;
  public ownerRole: string;
  public fName: string;
  public lName: string;
  @ViewChild(IonModal) modal: IonModal;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigateByUrl('/landing', { replaceUrl: true });
  }

  async getProfile() {
    this.auth.getUserProfile().subscribe((data) => {
      console.log(data.owner);

      //TODO attempting to use a forEach loop in order to obtain all owners for display
      // data.owner.forEach((owner) => {
      //   console.log(owner.firstName);
      // });

      this.owners = data.owner;
      // this.ownerFirstName = data.owner[0].firstName;
      // this.ownerLastName = data.owner[0].lastName;
      // this.ownerRole = data.owner[0].role;
    });
  }

  //* save new ownerDetails
  //! THIS ACTUALLY FUNCTIONS AS AN ADD NEW OWNER FEATURE
  setOwner() {
    let owner = {
      firstName: this.fName,
      lastName: this.lName,
      role: 'user',
    };

    // this.auth.user.push(owner);
    this.auth.home.owner.push(owner);
    console.log('final', this.auth.home.owner);

    this.auth.save();
    this.modal.dismiss();
    this.presentToast('top', 'User added');
  }

  ngOnInit() {
    this.getProfile();
  }
}
