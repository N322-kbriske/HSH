import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
})
export class ProfileSetupPage implements OnInit {
  profile = null;
  firstName: string;
  lastName: string;

  constructor(private auth: AuthService) {
    this.auth.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  //* initialize an owner by setting input equal to an object and injecting it into home interface
  initOwner() {
    let owner = {
      firstName: this.firstName,
      lastName: this.lastName,
      role: 'admin',
    };

    // this.auth.user.push(owner);
    this.auth.home.owner.push(owner);
    console.log('final', this.auth.home.owner);

    this.auth.save();
  }

  ngOnInit() {}
}
