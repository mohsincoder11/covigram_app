
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";
@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  mobile_number;
  otp;
  otp_error: boolean = false;
  time;
  resend_click: boolean = false;
  loader_visibility: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.mobile_number = this.route.snapshot.paramMap.get('number');
    this.otp = this.route.snapshot.paramMap.get('otp');
    this.starttimer();
    this.toaster.doctor_backurl='verify/'+ this.mobile_number+'/'+this.otp;
  }

  resend_otp() {
    this.starttimer();
    this.loader_visibility = true;
    this.http
      .post(`${this.url.serverUrl}forgot_password`, this.mobile_number)
      .subscribe(
        (res) => {
          this.otp=res;
          this.loader_visibility = false;
          this.toaster.toaster_show('Sent. OTP sent successfully.', 'success', 'white');
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


  verify_otp() {
    if ($("#1").val() && $("#2").val() && $("#3").val() && $("#4").val()) {
      let input_otp = $("#1").val().toString() + $("#2").val().toString() + $("#3").val().toString() + $("#4").val().toString();
      if (this.otp == input_otp)
        this.router.navigate(['/resetpassword/' + this.mobile_number]);
      else
        this.otp_error = true;
    }
    else
      this.otp_error = true;
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

}
