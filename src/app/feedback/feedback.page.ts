import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  category_err: boolean = false;
  feedback: boolean = false;
  loader_visibility: boolean = false;
  back_url;
  user_id;
  category:string="Select Category";

  constructor(
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public route:ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.category = "Select Category";
    this.storage.get('login_details').then(res => {
      this.user_id = res.id;
      if (res.u_type == 1)
        this.back_url = 'dashboard';
      else
        this.back_url = 'doctordash';
    })
  }

  submit_feedback(formdata: NgForm) {
    formdata.value.category ? this.category_err = false : this.category_err = true;
    formdata.value.category!='Select Category' ? this.category_err = false : this.category_err = true;
    formdata.value.feedback ? this.feedback = false : this.feedback = true;
    if (formdata.value.category && formdata.value.feedback) {
      this.loader_visibility = true;
      formdata.value.u_id = this.user_id;

      this.http
        .post(`${this.url.serverUrl}submit_app_feedback`, formdata.value)
        .subscribe(
          (res) => {
            this.toaster.toaster_show('Feedback submitted successfully.', 'success', 'white');
            this.loader_visibility = false;
            formdata.resetForm();
            this.router.navigate(['/'+this.back_url]);
          },
          (err) => console.log(err)
        );

    }

  }

}
