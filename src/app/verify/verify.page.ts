
import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  mobile_number;
  otp;
  otp_error: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public router: Router

  ) { }

  ngOnInit() {
  }

  resend() {
    document.querySelector('#timer').classList.toggle('hide');
    document.querySelector('#dark').classList.toggle('bold');
  }

  ionViewWillEnter() {
    this.mobile_number = this.route.snapshot.paramMap.get('number');
    this.otp = this.route.snapshot.paramMap.get('otp');
  }


  verify_otp(formdata: NgForm) {
    if (formdata.value.otp) {
      if (this.otp == formdata.value.otp)
        this.router.navigate(['/resetpassword/' + this.mobile_number]);
      else
        this.otp_error = true;
    }
    else
      this.otp_error = true;
  }

  // focusnext(event) {
  //   this.otp_error=false;

  //   if (event.target.value.length > 0) {
  //     $('#' + event.target.id).addClass('focus_class');

  //     if (event.target.id == 4) {
  //       this.verify_otp();
  //     }
  //     else {
  //       let movenext = +parseInt(event.target.id) + 1;
  //       document.getElementById('' + movenext).focus();
  //     }
  //   }
  //   else {
  //     $('#' + event.target.id).removeClass('focus_class');
  //   }

  // }

}
