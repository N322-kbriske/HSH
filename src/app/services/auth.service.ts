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
import { Home } from '../models/home.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //? Should I be storing the values for these things locally and THEN pushing them up?
  // homeName: string;
  // accName: string;
  roomName: string;
  //! had to add the full structure so that it was not undefined
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
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getUserProfile() {
    /* Getting the current user from the auth service. */
    const user = this.auth.currentUser;
    /* Getting a reference to the user's document in the firestore database. */
    const userDocRef = doc(this.firestore, `Users/${user.uid}`);
    console.log('Profile Retrieved ID:', user.uid);
    /* Getting the data from the userDocRef and returning it. */
    return docData(userDocRef, { idField: 'id' });
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

  // async addtoDB() {
  //   this.home.rooms[0].accessories[0].accessoryName = this.accName;
  //   this.home.rooms[0].roomName = this.roomName;
  //   this.save();
  // }

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
        console.log('home', this.home);
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
    /* Getting the current user from the auth service. */
    const user = this.auth.currentUser;
    /* Getting a reference to the user's document in the firestore database. */
    const userDocRef = doc(this.firestore, `Users/${user.uid}`);
    /* Setting the document in the firestore database. */
    setDoc(userDocRef, this.home);
  }
}
