import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc-choices',
  templateUrl: './acc-choices.page.html',
  styleUrls: ['./acc-choices.page.scss'],
})
export class AccChoicesPage implements OnInit {
  constructor() {}

  addLightBulb() {
    console.log('light bulb');
  }

  ngOnInit() {}
}
