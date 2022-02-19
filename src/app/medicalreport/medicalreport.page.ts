import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToasterService } from "../services/toaster/toaster.service";
import { UrlService } from "../services/url/url.service";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-medicalreport',
  templateUrl: './medicalreport.page.html',
  styleUrls: ['./medicalreport.page.scss'],
})
export class MedicalreportPage implements OnInit {
  loader_visibility: boolean = true;

  my_member;
  test_name;
  patient_id;
  patient_name;
  report_list;
  no_report:boolean=false;
  constructor(
    public toaster: ToasterService,
    public storage: Storage,
    public url: UrlService,
    public http: HttpClient
  ) { }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.my_member = this.toaster.common_family_member_list;
    this.storage.get('login_details').then(res => {
      this.patient_id = res.id;
      this.patient_name = res.f_name + ' ' + res.l_name;
      this.loader_visibility = false;
      this.get_medical_report(this.patient_id,1);
    })
  }

  get_medical_report(evt,type) {
    this.loader_visibility = true;
    let id = this.patient_id;
    if (type == 2)
      id = evt.target.value;
    this.http
      .get(`${this.url.serverUrl}get_medical_report?patient_id=${id}`)
      .subscribe(
        (res) => {
        console.log(res);
          this.report_list=res;
          this.report_list.length == 0 ? this.no_report = true : this.no_report = false;
          this.loader_visibility = false;
        },
        (err) => {
        }
      );
  }


  download_file(id) {
    let filename;
    filename = this.report_list.filter(function (e) {
      return e.id == id;
    });
    window.open(this.url.baseUrl + 'download_report_file/' + filename[0].prescription_file, "_system");
  }

}
