import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "../services/toaster/toaster.service";
import { Storage } from '@ionic/storage-angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-downloadfile',
  templateUrl: './downloadfile.page.html',
  styleUrls: ['./downloadfile.page.scss'],
})
export class DownloadfilePage implements OnInit {
  switchTab = 'upyou';
  test_id;
  patient_id;
  patient_name;
  loader_visibility: boolean = true;
  no_user_report: boolean = false;
  no_doctor_report: boolean = false;
  report_list;
  submit_by_user;
  submit_by_doctor;
  my_member;
  test_name;
  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
    //  console.log('Segment changed', ev);
  }

  constructor(
    private alertCtrl: AlertController,
    public router: Router,
    public url: UrlService,
    public http: HttpClient,
    public toaster: ToasterService,
    public route: ActivatedRoute,
    public storage: Storage,
    private socialSharing: SocialSharing,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.my_member = this.toaster.common_family_member_list;
    this.test_id = this.route.snapshot.paramMap.get('id');
    this.storage.get('login_details').then(res => {
      this.patient_id = res.id;
      this.patient_name = res.f_name + ' ' + res.l_name
      this.get_report_list_user(this.patient_id, 1);
    })
  }

  ionViewDidEnter() {
    let id = this.test_id;
    this.test_name = this.toaster.common_test_type_list.filter(function (e) {
      return e.id == id;
    });
    this.test_name = this.test_name[0].test_name;
  }

  get_report_list_user(evt, type) {
    this.loader_visibility = true;
    let id = this.patient_id;
    if (type == 2)
      id = evt.target.value;
    this.http
      .get(`${this.url.serverUrl}get_report_list_user?patient_id=${id}&test_type_id=${this.test_id}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          this.report_list = res;
          this.submit_by_user = this.report_list.filter(function (e) {
            return e.upload_by == '1';
          });
          this.submit_by_user.length == 0 ? this.no_user_report = true : this.no_user_report = false;
          this.submit_by_doctor = this.report_list.filter(function (e) {
            return e.upload_by == '2';
          });
          this.submit_by_doctor.length == 0 ? this.no_doctor_report = true : this.no_doctor_report = false;
          this.loader_visibility = false;
        },
        (err) => {
        }
      );
  }

  share_file(id, type) {
    let filename;
    if (type == 1) {
      filename = this.submit_by_user.filter(function (e) {
        return e.id == id;
      });
    }
    if (type == 2) {
      filename = this.submit_by_doctor.filter(function (e) {
        return e.id == id;
      });
    }
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      url: this.url.baseUrl + 'download_report_file/' + filename[0].prescription_file,
    };
    this.socialSharing.shareWithOptions(options);
  }

  download_file(id, type) {
    let filename;
    if (type == 1) {
      filename = this.submit_by_user.filter(function (e) {
        return e.id == id;
      });
    }
    if (type == 2) {
      filename = this.submit_by_doctor.filter(function (e) {
        return e.id == id;
      });
    }
    window.open(this.url.baseUrl + 'download_report_file/' + filename[0].prescription_file, "_system");
  }

  delete_report(id) {
    this.http
      .get(`${this.url.serverUrl}delete_report?id=${id}`)
      .subscribe(
        (res) => {
          var element = document.getElementById("card" + id);
          element.classList.add("delete");
          this.submit_by_user = this.submit_by_user.filter(function (e) {
            return e.id != id;
          });
          this.toaster.toaster_show('Success. Record deleted successfully.', 'success', 'white');
        },
        (err) => {
          this.toaster.toaster_show('Error. Server error.', 'error', 'white');
        }
      );
  }


}
