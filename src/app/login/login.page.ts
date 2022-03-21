import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public password: boolean = false;
  email_username: boolean = false;
  doctor_id: boolean = false;
  loader_visibility = true;
  doctor_list;
  session_data =[];
  formdata = {
    mobile: "",
    password: "",
  };
  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.toaster.forgot_by = 1;
    this.get_doctor();
  }

  ionViewDidEnter() {
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

  log_in(formdata: NgForm) {
    formdata.value.doctor_id ? this.doctor_id = false : this.doctor_id = true;
    formdata.value.doctor_id != 'Select Doctor' ? this.doctor_id = false : this.doctor_id = true;
    formdata.value.password ? this.password = false : this.password = true;
    formdata.value.email_username ? this.email_username = false : this.email_username = true;
    if (formdata.value.email_username && formdata.value.doctor_id && formdata.value.password && formdata.value.doctor_id != 'Select Doctor') {
      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}user_login`, formdata.value)
        .subscribe(
          (res: any) => {
            this.loader_visibility = false;
            if (res == 0) {
              this.toaster.toaster_show('Login failed! Invalid credentials.', 'error', 'white');
            }
            else {
              formdata.resetForm();
              this.session_data['f_name'] = res['data'].f_name;
              this.session_data['l_name'] = res['data'].l_name;
              this.session_data['id'] = res['data'].id;
              this.session_data['image'] = res['data'].image;
              this.session_data['age'] = res['data'].age;
              this.session_data['state'] = res['data'].state;
              this.session_data['country'] = res['data'].country;
              this.session_data['mobile'] = res['data'].mobile;
              this.session_data['email_username'] = res['data'].email_username;
              this.session_data['gender'] = res['data'].gender;
              this.session_data['u_type'] = res['data'].u_type;
              this.session_data['doctor_id'] = res['doctor_id'];
              this.storage.set('login_details', this.session_data).then(res => {
                this.router.navigate(['/dashboard']);
              })
            }
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          }
        );
    }
  }



}
