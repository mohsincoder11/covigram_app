import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UrlService } from "../services/url/url.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  session_data = {
    'id': '',
    'f_name': '',
    'l_name': '',
    'mobile': '',
    'image': '',
    'gender': '',
    'email_username': '',
    'specialization': '',
    'state_licence_no': '',
    'work_phone': '',
    'office_address': '',
    'npi_no': '',
    'fax_no': '',
    'covid_lab_reg': '',


  };
  loader_visibility: boolean = true;
  exist_image;
  img_url;
  

  constructor(
    public router: Router,
    public storage: Storage,
    public url: UrlService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('login_details').then(res => {
      this.session_data.id = res.id;
      this.session_data.f_name = res.f_name;
      this.session_data.l_name = res.l_name;
      this.session_data.mobile = res.mobile;
      this.session_data.image = res.image;
      this.session_data.gender = res.gender;
      this.session_data.email_username = res.email_username;
      this.session_data.specialization = res.specialization;
      this.session_data.state_licence_no = res.state_licence_no;
      this.session_data.work_phone = res.work_phone;
      this.session_data.office_address = res.office_address;
      this.session_data.npi_no = res.npi_no;
      this.session_data.fax_no = res.fax_no;
      this.session_data.covid_lab_reg = res.covid_lab_reg;
      this.exist_image = res.image;
      this.loader_visibility = false;
      this.img_url = this.url.imageurl + 'profile/' + res.image;
    })
  }

  log_out() {
    this.storage.remove('login_details').then(re => {
      this.router.navigateByUrl('/home');
    })
  }



}
