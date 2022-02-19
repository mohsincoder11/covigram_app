import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-createaccdoctor',
  templateUrl: './createaccdoctor.page.html',
  styleUrls: ['./createaccdoctor.page.scss'],
})
export class CreateaccdoctorPage implements OnInit {
  f_name: boolean = false;
  l_name: boolean = false;
  email_username: boolean = false;
  email_username_exist: boolean = false;
  mobile: boolean = false;
  mobile_length: boolean = false;
  mobile_no_exist: boolean = false;
  password: boolean = false;
  gender: boolean = false;
  specialization: boolean = false;
  state_licence_no: boolean = false;
  npi_no: boolean = false;
  covid_lab_reg: boolean = false;
  office_address: boolean = false;
  work_phone: boolean = false;
  fax_no: boolean = false;


  loader_visibility: boolean = false;


  constructor(
    public router: Router,
    public url: UrlService,
    public http: HttpClient,
    public toaster: ToasterService,

  ) { }

  ngOnInit() {
  }

  confirm_mobile(formdata: NgForm) {
    formdata.value.f_name ? this.f_name = false : this.f_name = true;
    formdata.value.l_name ? this.l_name = false : this.l_name = true;
    formdata.value.mobile.toString().length == 10 ? this.mobile_length = false : this.mobile_length = true;
    formdata.value.email_username ? this.email_username = false : this.email_username = true;
    formdata.value.password ? this.password = false : this.password = true;
    formdata.value.gender ? this.gender = false : this.gender = true;
    formdata.value.gender != 'Select Gender' ? this.gender = false : this.gender = true;

    formdata.value.specialization ? this.specialization = false : this.specialization = true;
    formdata.value.state_licence_no ? this.state_licence_no = false : this.state_licence_no = true;
    formdata.value.npi_no ? this.npi_no = false : this.npi_no = true;
    formdata.value.covid_lab_reg ? this.covid_lab_reg = false : this.covid_lab_reg = true;
    formdata.value.office_address ? this.office_address = false : this.office_address = true;
    formdata.value.work_phone ? this.work_phone = false : this.work_phone = true;
    formdata.value.fax_no ? this.fax_no = false : this.fax_no = true;

    formdata.value.otp = 1111;

    if (formdata.value.f_name && formdata.value.l_name && formdata.value.email_username && !this.email_username_exist && !this.mobile_no_exist &&
      formdata.value.mobile && formdata.value.mobile.toString().length == 10 && formdata.value.password && formdata.value.gender && formdata.value.gender != 'Select Gender' && formdata.value.specialization && formdata.value.state_licence_no && formdata.value.npi_no && formdata.value.covid_lab_reg && formdata.value.office_address && formdata.value.work_phone && formdata.value.fax_no) {
      this.loader_visibility = true;
      this.mobile_length = false;
      console.log(formdata.value);
      this.http
        .post(`${this.url.serverUrl}send_mobile_verify_otp`, formdata.value)
        .subscribe(
          (res) => {
            this.loader_visibility = false;
            formdata.value.otp = res;
            formdata.value.user_type = 2;
            let navExtra: NavigationExtras = {
              state: {
                regData: formdata.value,
              },
            };
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
