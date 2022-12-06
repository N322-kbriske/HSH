import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-acc-choices',
  templateUrl: './acc-choices.page.html',
  styleUrls: ['./acc-choices.page.scss'],
})
export class AccChoicesPage implements OnInit {
  // accType: string = 'lightbulb';
  constructor(private auth: AuthService) {}

  addLightBulb() {
    console.log('light bulb');
    this.auth.accType = 'lightbulb';
    this.auth.accIcon = 'lightbulb.svg';
  }

  addSwitch() {
    console.log('switch');
    this.auth.accType = 'switch';
    this.auth.accIcon = 'switch.svg';
  }

  addLock() {
    console.log('lock');
    this.auth.accType = 'lock';
    this.auth.accIcon = 'lock.svg';
  }

  ngOnInit() {}
}
