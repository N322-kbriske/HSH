import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public homeName: string;

  constructor(private auth: AuthService, private router: Router) {}

  async signOut() {
    await this.auth.signOut();
    this.router.navigateByUrl('/landing', { replaceUrl: true });
  }

  /*
   ! gets the user's home name from the database and assigns it to the variable homeName
   */
  async getHomeInfo() {
    // console.log(this.auth);
    this.auth.getUserProfile().subscribe((data) => {
      this.homeName = data.homeName;
      //? for future stuff user this.home{whatever the data is} = data.{whatever the data is}
    });
  }

  addAcc() {
    console.log('clicked');
    //update the home object in auth service
    //in your auth call save.
  }

  ngOnInit() {
    this.getHomeInfo();
  }
}
