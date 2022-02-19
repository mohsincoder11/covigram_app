import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  type = 'patient';
  constructor(
    public router: Router,
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private _location: Location,
    private platform: Platform,
  ) { }

  submit() {
    if (this.type == 'patient') {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/doctorlogin'])
    }
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/home')) {
        navigator['app'].exitApp();
      } else {
        this._location.back();
      }
    });


    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
      })
    });
  }


}
