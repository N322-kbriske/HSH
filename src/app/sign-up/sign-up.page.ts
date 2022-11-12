import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  credentials: FormGroup;
  // added this, also have some new things on auth service
  profile = null;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  /* This is setting up the form builder group to be equal to what is on the page. */
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24),
        ],
      ],
    });
  }

  /**
   * It creates a loader, presents it, calls the register function in the auth service, dismisses the
   * loader, and then navigates to the home page if the user is logged in
   */
  async register() {
    // create the loader
    const loading = await this.loadingController.create();
    // present the loader
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    /* If the user is logged in, it will navigate to the home page. If not, it will show an alert. */
    if (user) {
      this.router.navigateByUrl('/home-setup', { replaceUrl: true });
    } else {
      this.showAlert('Sign up failed', 'Please try again');
    }
  }

  /**
   * It creates an alert, then presents it
   * @param header - The title of the alert
   * @param message - The message you want to display in the alert.
   */
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
