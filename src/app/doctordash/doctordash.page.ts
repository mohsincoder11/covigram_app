import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UrlService } from "../services/url/url.service";
import { MenuController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';

import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-doctordash',
  templateUrl: './doctordash.page.html',
  styleUrls: ['./doctordash.page.scss'],
})
export class DoctordashPage implements OnInit {
  img_url;
  slider: any;
  today_new_count = 0;
  total_patient_count = 0;
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,

  };

  constructor(
    public storage: Storage,
    public url: UrlService,
    public menuCtrl: MenuController,
    public http: HttpClient,
    public alertController: AlertController,
    private _location: Location,
    private platform: Platform,
  

  ) { }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.storage.get('login_details').then(res => {
      this.img_url = this.url.imageurl + 'profile/' + res.image;
      this.get_user_count_for_doctor(res.id);
    })
  }
  slideChanged() {
    this.slider.stopAutoplay(); //this code for slide after page change
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/doctordash')) {
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

  get_user_count_for_doctor(doctor_id) {
    this.http
      .get(`${this.url.serverUrl}get_user_count_for_doctor?doctor_id=${doctor_id}`)
      .subscribe(
        (res) => {
          console.log(res);
          this.today_new_count = res['today_new_count'];
          this.total_patient_count = res['total_patient_count'];
        },
        (err) => {
        }
      );
  }

}
