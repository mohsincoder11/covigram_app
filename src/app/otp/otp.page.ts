import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";
import { NgForm } from '@angular/forms';

import * as $ from "jquery";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  regUserData;
  mobile_no;
  otp;
  otp_error: boolean = false;
  loader_visibility: boolean = false;
  back_url = 'createacc';

  time;
  resend_click: boolean = false;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService
  ) {
    activatedRoute.queryParams.subscribe(async (params) => {
      if (router.getCurrentNavigation().extras.state.regData) {
        this.regUserData = await router.getCurrentNavigation().extras.state
          .regData;
        if (this.regUserData.user_type == 2)
          this.back_url = 'createaccdoctor';
        this.mobile_no = this.regUserData.mobile;
        this.otp = this.regUserData.otp;
        this.starttimer();
        console.log(this.regUserData);
      }
    });
  }

  ngOnInit() {
  }

  focusnext(event) {
    this.otp_error = false;
    if (event.target.value.length > 0) {
      $('#' + event.target.id).addClass('focus_class');
      if (event.target.id == 4) {
        this.verify_otp();
      }
      else {
        let movenext = +parseInt(event.target.id) + 1;
        $("#" + movenext).val('');
        document.getElementById('' + movenext).focus();
      }
    }
    else {
      $('#' + event.target.id).removeClass('focus_class');
    }
  }

  verify_otp() {
    if ($("#1").val() && $("#2").val() && $("#3").val() && $("#4").val()) {
      let input_otp = $("#1").val().toString() + $("#2").val().toString() + $("#3").val().toString() + $("#4").val().toString();
      if (this.otp == input_otp) {
        let custome_url = 'user_registration';
        if (this.regUserData.user_type == 2)
          custome_url = 'doctor_registration';
        this.loader_visibility = true;
        this.http
          .post(`${this.url.serverUrl}` + custome_url, this.regUserData)
          .subscribe(
            (res) => {
              this.loader_visibility = false;
              if (res > 0) {
                this.toaster.toaster_show('Account created successfully. Wait sometime for admim approval', 'success', 'white');
                if (this.regUserData.user_type == 2)
                  this.router.navigate(['/doctorlogin']);
                else
                  this.router.navigate(['/login']);
              }
              else {
                this.toaster.toaster_show('Server error.', 'error', 'white');

              }
            },
            (err) => {
              this.loader_visibility = false;

              this.toaster.toaster_show('Server error.', 'error', 'white');

            }
          );
      }
      else {
        this.otp_error = true;
      }
    }
    else {
      this.otp_error = true;
    }
  }



  resend_otp() {
    console.log(this.regUserData.mobile);
    this.starttimer();
    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}forgot_password`, this.regUserData.mobile)
      .subscribe(
        (res) => {
          this.otp = res;
          this.loader_visibility = false;
          this.toaster.toaster_show('OTP sent successfully.', 'success', 'white');
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }
  starttimer() {
    this.time = '59';
    var a = setInterval(() => {
      if (this.time > 0)
        this.time = String(this.time - 1).padStart(2, "0");
      else {
        this.resend_click = true;
        clearInterval(a);
      }
    }, 1000)
  }
}
