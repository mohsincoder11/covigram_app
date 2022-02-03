import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ToasterService } from "../services/toaster/toaster.service";
import * as $ from "jquery";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  my_doctor;
  my_member;
  my_member_show: boolean = false;
  my_doctor_show: boolean = false;
  patient_id_err: boolean = false;
  doctor_id_err: boolean = false;
  parent_id;
  user_id = null;
  public loader_visibility = true;
  img_url;
  query_description: boolean = false;
  profile_folder;
  doctor_list;
  doctor_id;
  patient_id;
  patient_name;

  constructor(
    public menuCtrl: MenuController,
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public alertController: AlertController,
    private _location: Location,
    private platform: Platform,
    public toaster: ToasterService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.doctor_id = 'Select Doctor';

    this.profile_folder = this.url.imageurl + 'profile/';
    this.menuCtrl.enable(true);
    this.storage.get('login_details').then(res => {
      this.patient_id = res.id;
      this.parent_id = res.id;
      this.patient_name = res.f_name + ' ' + res.l_name;
      this.img_url = this.url.imageurl + 'profile/' + res.image;
      this.user_id = res.id;
      this.get_mydoctor(res.doctor_id);
      this.get_member(res.id);
    })
  }

  ionViewDidEnter() {
    this.get_doctor();

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/dashboard')) {
        navigator['app'].exitApp();
      } else {
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
      })
    });
  }

  get_mydoctor(doctor_id) {
    this.http
      .get(`${this.url.serverUrl}get_my_doctor?doctor_id=${doctor_id}`)
      .subscribe(
        (res) => {
          console.log(res);
          this.my_doctor = res;
          this.my_doctor.length > 0 ? this.my_doctor_show = true : this.my_doctor_show = false;

        },
        (err) => {
        }
      );
  }

  get_member(parent_id) {
    this.loader_visibility = true;
    this.http
      .get(`${this.url.serverUrl}get_patient_member?parent_id=${parent_id}`)
      .subscribe(
        (res) => {
          this.my_member = res;
          this.toaster.common_family_member_list = res;
          this.my_member.length > 0 ? this.my_member_show = true : this.my_member_show = false;
          this.loader_visibility = false;
        },
        (err) => {
        }
      );
  }

  open_query_modal() {
    $("#query_modal").removeClass("hide");
    $("#query_modal").addClass("show");
  }

  close_modal() {
    $("#query_modal").addClass("hide");
  }

  ionViewDidLeave() {
    this.close_modal();
  }

  get_doctor() {
    this.http
      .get(`${this.url.serverUrl}get_doctor_for_login`)
      .subscribe(
        (res) => {
          this.doctor_list = res;
          this.toaster.common_doctor_list = res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          //     this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  submit_query(formdata: NgForm) {
    formdata.value.doctor_id ? this.doctor_id_err = false : this.doctor_id_err = true;
    formdata.value.doctor_id != 'Select Doctor' ? this.doctor_id_err = false : this.doctor_id_err = true;
    formdata.value.query_description ? this.query_description = false : this.query_description = true;
    if (formdata.value.query_description && formdata.value.doctor_id && formdata.value.doctor_id != 'Select Doctor') {
      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}submit_user_query`, formdata.value)
        .subscribe(
          (res) => {
            formdata.resetForm();
         
            this.close_modal();
            this.loader_visibility = false;
            this.toaster.toaster_show('Success. Query submitted successfully.', 'success', 'white');
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          }
        );
    }
  }


}
