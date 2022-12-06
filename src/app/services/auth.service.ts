import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, setDoc, docData, doc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  getDownloadURL,
  uploadString,
} from '@angular/fire/storage';
import { HomePage } from '../home/home.page';
import { Home, Room, User, Accessories } from '../models/home.interface';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public home: Home;
  // public currentRoom: any = {};

  public currentRoomObj: any = {};

  public accType: string;
  public currentRoomID: string;
  public currentAccID: string;
  public accIcon: string;
  public currentAccObj: any = {};

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private toastController: ToastController
  ) {
    // this.getCurrentRoom();
  }

  getUserProfile() {
    /* Getting the current user from the auth service. */
    const user = this.auth.currentUser;
    /* Getting a reference to the user's document in the firestore database. */
    const userDocRef = doc(this.firestore, `Users/${user.uid}`);
    /* Getting the data from the userDocRef and returning it. */
    return docData(userDocRef, { idField: 'id' });
  }

  deleteAcc(acc) {
    this.home.rooms.forEach((room) => {
      if (room.roomID === this.currentRoomObj.roomID) {
        // console.log('ID', acc.accID);
        const index = this.currentRoomObj.accessories.indexOf(acc);
        console.log(index);
        this.currentRoomObj.accessories.splice(index, 1);
        console.log(this.currentRoomObj.accessories);
        room.accessories = this.currentRoomObj.accessories;
        this.save();
      }
    });
  }

  deleteRoom(roomObj) {
    this.home.rooms.forEach((room) => {
      if (room.roomID === this.currentRoomObj.roomID) {
        // console.log('ID', acc.accID);
        const index = this.currentRoomObj.accessories.indexOf(roomObj);
        console.log(index);
        this.home.rooms.splice(index, 1);
        // console.log(this.currentRoomObj.accessories);
        // room.accessories = this.currentRoomObj.accessories;
        this.save();
      }
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

  updateAcc(acc) {
    this.home.rooms.forEach((room) => {
      if (room.roomID === this.currentRoomObj.roomID) {
        const index = this.currentRoomObj.accessories.indexOf(acc);
        console.log(index);
        room.accessories = this.currentRoomObj.accessories;
        this.save();
      }
    });
  }

  updateRoom() {
    this.home.rooms.forEach((room) => {
      console.log(room.roomID);
      if (room.roomID === this.currentRoomObj.roomID) {
        console.log('Eurika');
        room.accessories = this.currentRoomObj.accessories;
        this.save();
        //! added this nov 30 3:28
        this.presentToast('top', 'Accessory Added');
      }
    });
  }

  /*
   * take a home object, set it to the home property, and then call the save function
   * @param {Home} home - Home - this is the home object that we are passing in from the home.ts file.
   */
  async addHomeToDB(home: Home) {
    this.home = home;
    console.log(this.home);
    this.save();
  }

  //* create a user
  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

  //* log in a user
  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('user', user.user);

      /* get the uid from the user object. */
      const uid = user?.user?.uid;
      // console.log('uid', uid);

      /* Getting a reference to the user's document in the firestore database. */
      const userDocRef = doc(this.firestore, `Users/${uid}`);

      /* Getting the data from the userDocRef and returning it. */
      docData(userDocRef, { idField: 'id' }).subscribe((data) => {
        /* Casting the data as a Home object. */
        this.home = data as Home;
        console.log('auth data retrieval', this.home);
      });

      /* Returning the user object. */
      return user;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

  //* sign out a user
  signOut() {
    return signOut(this.auth);
  }

  //* save information about a user to firestore
  save() {
    console.log('auth ', this.home);
    /* Getting the current user from the auth service. */
    const user = this.auth.currentUser;
    /* Getting a reference to the user's document in the firestore database. */
    const userDocRef = doc(this.firestore, `Users/${user.uid}`);

    /* Setting the document in the firestore database. */
    setDoc(userDocRef, this.home);
  }
}
