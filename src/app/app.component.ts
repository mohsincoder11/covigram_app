import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UrlService } from "./services/url/url.service";
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ToasterService } from "./services/toaster/toaster.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  editurl;
  img_url;
  session_data={
    f_name:"",
    l_name:"",
    email_username:"",
    image:""
  };

  constructor(
    public platform: Platform,
    public router: Router,
    public storage: Storage,
    public url: UrlService,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private toaster: ToasterService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.storage.create();
    this.platform.ready().then(() => {
      this.storage.get('login_details').then(res => {
        if (res) {
          if (res.u_type == 1) {
            this.router.navigateByUrl('/dashboard');
          }
          else {
            this.router.navigateByUrl('/doctordash');
          }
        }
        else
          this.router.navigateByUrl('/home');
      })
    })
  }

  get_session_data() {
    this.storage.get('login_details').then(res => {
      this.img_url=this.url.imageurl+'profile/'+res.image;
      this.session_data['f_name']=res.f_name;
      this.session_data['l_name']=res.l_name;
      this.session_data['email_username']=res.email_username;
      this.session_data['image']=res.image;
      if (res.u_type == 1) {
        this.editurl = 'editprofile';
      }
      else {
        this.editurl ='editdoctorprofile';
      }

    })
  }

  socialshare() {
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      url: 'https://play.google.com/store/apps/details?id=io.globaldentistry.starter',
    };
    this.socialSharing.shareWithOptions(options);
  }

  open_playstore() {
    window.open("https://play.google.com/store/apps/details?id=io.globaldentistry.starter", "_system");
  }

  log_out() {
    this.toaster.common_family_member_list=null;
    this.storage.remove('login_details').then(re => {
      this.router.navigateByUrl('/home');
    })
  }


}
