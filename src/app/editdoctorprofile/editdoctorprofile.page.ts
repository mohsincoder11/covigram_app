import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-editdoctorprofile',
  templateUrl: './editdoctorprofile.page.html',
  styleUrls: ['./editdoctorprofile.page.scss'],
})

export class EditdoctorprofilePage implements OnInit {

  session_data = {
    id: "",
    name: "",
    gender: "",
    email: "",
    u_type: "",
  };
  name: boolean = false;
  gender: boolean = false;
  email: boolean = false;
  loader_visibility: boolean = true;

  constructor(
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService


  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('login_details').then(res => {
      this.session_data.name = res.name;
      this.session_data.gender = res.gender;
      this.session_data.email = res.email;
      this.session_data.id = res.id;
        this.loader_visibility = false;

    })
  }

  update_profile(formdata: NgForm) {
    formdata.value.id = this.session_data.id;
    formdata.value.gender ? this.gender = false : this.gender = true;
    formdata.value.name ? this.name = false : this.name = true;
    formdata.value.email ? this.email = false : this.email = true;

    if (formdata.value.name && formdata.value.gender && formdata.value.email) {
      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}doctor_details_update`, formdata.value)
        .subscribe(
          (res:any) => {
            this.session_data['name'] = res.name;
              this.session_data['id'] = res.id;
              this.session_data['email'] = res.email;
              this.session_data['gender'] = res.gender;
              this.session_data['u_type'] = res.u_type;
              
            this.storage.set('login_details', this.session_data).then(res => {
              this.loader_visibility = false;
            })

            this.toaster.toaster_show('Profile details updated successfully.', 'success', 'white');
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          }
        );
    }

  }

}
