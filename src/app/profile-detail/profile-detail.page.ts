import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  public firstName: string;
  public lastName: string;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
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
      this.ownerFirstName = data.owner[0].firstName;
      this.ownerLastName = data.owner[0].lastName;
    });
  }

  //* save new ownerDetails
  //! THIS ACTUALLY FUNCTIONS AS AN ADD NEW OWNER FEATURE
  setOwner() {
    let owner = {
      firstName: this.firstName,
      lastName: this.lastName,
      role: 'user',
    };

    // this.auth.user.push(owner);
    this.auth.home.owner.push(owner);
    console.log('final', this.auth.home.owner);

    this.auth.save();
  }

  ngOnInit() {
    this.getProfile();
  }
}
