import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: 'app-totalregister',
  templateUrl: './totalregister.page.html',
  styleUrls: ['./totalregister.page.scss'],
})
export class TotalregisterPage implements OnInit {

  loader_visibility: boolean = true;
  all_report;
  no_report;
  description;
  prescription_file;
  report_file;
  current_id=null;
  search_report: string;

  constructor(
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
  ) { }

  ionViewWillEnter() {
    this.toaster.doctor_backurl = 'totalregister';
        this.storage.get('login_details').then(res => {
      this.get_total_patient_api(res.id);
    })
  }



  ngOnInit() {
  }

  get_total_patient_api(id) {
    this.loader_visibility = true;
    this.http
      .get(`${this.url.serverUrl}get_total_reg_patient_api?doctor_id=${id}`)
      .subscribe(
        (res) => {
          this.all_report = res;
          this.all_report.length == 0 ? this.no_report = true : this.no_report = false;
          this.loader_visibility = false;
        },
        (err) => {
        }
      );
  }

}