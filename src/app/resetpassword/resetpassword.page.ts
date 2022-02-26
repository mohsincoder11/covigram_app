import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  mobile_number;
  fill_all;
  both_same;
  loader_visibility;
  backurl;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public url: UrlService,
    public  toaster:ToasterService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.backurl=this.toaster.doctor_backurl;
    this.mobile_number = this.route.snapshot.paramMap.get('number');
  }

  update_password(formdata: NgForm) {
    formdata.value.password1 && formdata.value.password2 ? this.fill_all = false : this.fill_all = true;
    formdata.value.password1 == formdata.value.password2 ? this.both_same = false : this.both_same = true;
    if (formdata.value.password1 && formdata.value.password2 && formdata.value.password1 == formdata.value.password2) {
      this.loader_visibility=true;
      formdata.value.mobile = this.mobile_number;
     
      this.http
        .post(`${this.url.serverUrl}update_user_password`, formdata.value)
        .subscribe(
          (res) => {          
              this.toaster.toaster_show('Password updated successfully.', 'success', 'white');
            this.loader_visibility=false;
            if(this.toaster.forgot_by==1)
            this.router.navigate(['/login']);
            else
            this.router.navigate(['/doctorlogin']);



          },
          (err) =>{
            this.loader_visibility = false;

            this.toaster.toaster_show('Server error.', 'error', 'white');
        } 
        );
    }

  }
}
