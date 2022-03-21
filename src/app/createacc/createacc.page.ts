import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "../services/toaster/toaster.service";
@Component({
  selector: 'app-createacc',
  templateUrl: './createacc.page.html',
  styleUrls: ['./createacc.page.scss'],
})
export class CreateaccPage implements OnInit {

  f_name: boolean = false;
  l_name: boolean = false;
  email_username: boolean = false;
  email_username_exist: boolean = false;
  age: boolean = false;
  gender: boolean = false;
  mobile: boolean = false;
  mobile_length: boolean = false;
  mobile_no_exist: boolean = false;
  password: boolean = false;
  state: boolean = false;
  country: boolean = false;
  loader_visibility: boolean = false;
  doctor_list;
  doctor_id: boolean = false;

  constructor(
    public router: Router,
    public url: UrlService,
    public http: HttpClient,
    public toaster: ToasterService,

  ) { }
ionViewWillEnter() {
  this.get_doctor();
}
  ngOnInit() {
  }
  get_doctor() {
    this.http
      .get(`${this.url.serverUrl}get_doctor_for_login`)
      .subscribe(
        (res) => {
          this.doctor_list = res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  confirm_mobile(formdata: NgForm) {
    formdata.value.f_name ? this.f_name = false : this.f_name = true;
    formdata.value.l_name ? this.l_name = false : this.l_name = true;
    formdata.value.email_username ? this.email_username = false : this.email_username = true;
    formdata.value.age ? this.age = false : this.age = true;
    formdata.value.gender ? this.gender = false : this.gender = true;
    formdata.value.gender != 'Select Gender' ? this.gender = false : this.gender = true;
    formdata.value.mobile.toString().length == 10 ? this.mobile_length = false : this.mobile_length = true;
    formdata.value.password ? this.password = false : this.password = true;
    formdata.value.state ? this.state = false : this.state = true;
    formdata.value.country ? this.country = false : this.country = true;
    formdata.value.otp = 1234;
    formdata.value.doctor_id ? this.doctor_id = false : this.doctor_id = true;
    formdata.value.doctor_id != 'Select Doctor' ? this.doctor_id = false : this.doctor_id = true;
 
    if (formdata.value.f_name && formdata.value.l_name && formdata.value.age && formdata.value.gender && formdata.value.gender != 'Select Gender' && formdata.value.email_username && !this.email_username_exist && formdata.value.state && formdata.value.country && !this.mobile_no_exist &&
      formdata.value.mobile && formdata.value.mobile.toString().length == 10 && formdata.value.password && formdata.value.doctor_id &&
      formdata.value.doctor_id != 'Select Doctor') {
        formdata.value.user_type=1;
      this.loader_visibility = true;
      this.mobile_length = false;
      this.http
        .post(`${this.url.serverUrl}send_mobile_verify_otp`, formdata.value)
        .subscribe(
          (res) => {
            this.loader_visibility = false;
            formdata.value.otp = res;
            let navExtra: NavigationExtras = {
              state: {
                regData: formdata.value,
              },
            };
            formdata.resetForm();

            this.router.navigate(['otp'], navExtra);
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          });
    }
  }

  check_exist_mobile(event) {
    if (event.target.value.length == 10) {
      console.log('check');
      this.mobile_length = false;
      this.loader_visibility = true;
      this.http.get(`${this.url.serverUrl}check_existing_mobile_user?mobile=${event.target.value}`)
        .subscribe(
          (res) => {
            this.loader_visibility = false;
            if (res == 1) {
              this.mobile_no_exist = true;
            }
            else {
              this.mobile_no_exist = false;
            }
          },
          (err) => console.log(err)
        );
    }
  }

  check_email_username_Exist(ev) {
    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}check_existing_email_username?email_username=${ev.target.value}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          if (res == 1) {
            this.email_username_exist = true;
          }
          else {
            this.email_username_exist = false;
          }
        },
        (err) => console.log(err)
      );

  }

}
