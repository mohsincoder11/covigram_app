import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.page.html',
  styleUrls: ['./doctorlogin.page.scss'],
})
export class DoctorloginPage implements OnInit {
  public password: boolean = false;
  email_username: boolean = false;
  public loader_visibility = false;

  session_data =[];
  constructor(
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    public router: Router
  ) { }

  ngOnInit() {
  }

ionViewWillEnter() {
  this.toaster.forgot_by = 2;
}

  log_in(formdata: NgForm) {
    formdata.value.password ? this.password = false : this.password = true;
    formdata.value.email_username ? this.email_username = false : this.email_username = true;
    if (formdata.value.email_username && formdata.value.password) {
      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}doctor_login`, formdata.value)
        .subscribe(
          (res: any) => {
            this.loader_visibility = false;
            if (res == false) {
              this.toaster.toaster_show('Login failed! Invalid credentials.', 'error', 'white');
            }
            else if (res == 1) {
              this.toaster.toaster_show('Login failed! Your account is not approved by admin yet.', 'error', 'white');
            }
           else if (res ==-1) {
              this.toaster.toaster_show('Login failed! Your account is rejected by admin.', 'error', 'white');
            }
            else {
              formdata.resetForm();
              this.session_data['id'] = res.id;
              this.session_data['image'] = res.image;
              this.session_data['f_name'] = res.f_name;
              this.session_data['l_name'] = res.l_name;
              this.session_data['email_username'] = res.email_username;
              this.session_data['mobile'] = res.mobile;
              this.session_data['gender'] = res.gender;
              this.session_data['specialization'] = res.specialization;
              this.session_data['state_licence_no'] = res.state_licence_no;
              this.session_data['npi_no'] = res.npi_no;
              this.session_data['covid_lab_reg'] = res.covid_lab_reg;
              this.session_data['office_address'] = res.office_address;
              this.session_data['work_phone'] = res.work_phone;
              this.session_data['fax_no'] = res.fax_no;
              this.session_data['u_type'] = res.u_type;
            
              this.storage.set('login_details', this.session_data).then(res => {
                this.router.navigate(['/doctordash']);
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
