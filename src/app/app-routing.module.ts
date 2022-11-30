import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'profile-setup',
    loadChildren: () =>
      import('./profile-setup/profile-setup.module').then(
        (m) => m.ProfileSetupPageModule
      ),
  },
  {
    path: 'home-setup',
    loadChildren: () =>
      import('./home-setup/home-setup.module').then(
        (m) => m.HomeSetupPageModule
      ),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'acc-choices',
    loadChildren: () =>
      import('./acc-choices/acc-choices.module').then(
        (m) => m.AccChoicesPageModule
      ),
  },
  {
    path: 'acc-setup',
    loadChildren: () =>
      import('./acc-setup/acc-setup.module').then((m) => m.AccSetupPageModule),
  },
  {
    path: 'accessory-room',
    loadChildren: () =>
      import('./accessory-room/accessory-room.module').then(
        (m) => m.AccessoryRoomPageModule
      ),
  },
  {
    path: 'profile-detail',
    loadChildren: () =>
      import('./profile-detail/profile-detail.module').then(
        (m) => m.ProfileDetailPageModule
      ),
  },
  {
    //! could use /:id instead?
    path: 'room-detail',
    loadChildren: () =>
      import('./room-detail/room-detail.module').then(
        (m) => m.RoomDetailPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

// const routes: Routes = [
//   {
//     path: 'landing',
//     loadChildren: () =>
//       import('./landing/landing.module').then((m) => m.LandingPageModule),
//   },
//   {
//     path: '',
//     redirectTo: 'landing',
//     pathMatch: 'full',
//   },
//   {
//     path: 'home',
//     loadChildren: () =>
//       import('./home/home.module').then((m) => m.HomePageModule),
//   },
//   {
//     path: 'sign-up',
//     loadChildren: () =>
//       import('./sign-up/sign-up.module').then((m) => m.SignUpPageModule),
//   },
//   {
//     path: 'profile-setup',
//     loadChildren: () =>
//       import('./profile-setup/profile-setup.module').then(
//         (m) => m.ProfileSetupPageModule
//       ),
//   },
//   {
//     path: 'home-setup',
//     loadChildren: () =>
//       import('./home-setup/home-setup.module').then(
//         (m) => m.HomeSetupPageModule
//       ),
//   },
//   {
//     path: 'sign-in',
//     loadChildren: () =>
//       import('./sign-in/sign-in.module').then((m) => m.SignInPageModule),
//   },
//   {
//     path: 'acc-choices',
//     loadChildren: () =>
//       import('./acc-choices/acc-choices.module').then(
//         (m) => m.AccChoicesPageModule
//       ),
//   },
//   {
//     path: 'acc-setup',
//     loadChildren: () =>
//       import('./acc-setup/acc-setup.module').then((m) => m.AccSetupPageModule),
//   },
//   {
//     path: 'accessory-room',
//     loadChildren: () =>
//       import('./accessory-room/accessory-room.module').then(
//         (m) => m.AccessoryRoomPageModule
//       ),
//   },
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
