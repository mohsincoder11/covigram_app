import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-viewtotalregister',
  templateUrl: './viewtotalregister.page.html',
  styleUrls: ['./viewtotalregister.page.scss'],
})
export class ViewtotalregisterPage implements OnInit {

  loader_visibility: boolean = true;
  all_report;
  no_report;
  description;
  prescription_file;
  report_file;
  current_id = null;
  search_report: string;
  patient_name;
  patient_id;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public storage: Storage,
    public platform:Platform,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
  ) { }

  ionViewWillEnter() {
   this.patient_id = this.route.snapshot.paramMap.get('patient_id');
   this.toaster.doctor_backurl = 'viewtotalregister/'+this.patient_id;
   this.storage.get('login_details').then(res => {
      this.get_total_patient_api(this.patient_id, res.id);
    })
  }

  ionViewDidLeave() {
    this.close_modal();
  }

  ngOnInit() {
  }

  Descriptionpage_modal(id, description) {
    this.description = null;
    this.description = description;
    this.close_modal();
    $("#descriptionpage_modal1").removeClass("hide");
    $("#descriptionpage_modal1").addClass("show");
  }


  Prescriptionpage_modal(id, prescription_file) {
    this.current_id = id;
    this.prescription_file = null;
    this.prescription_file = this.url.imageurl + 'reports/' + prescription_file;
    $(".custom_modal").addClass("hide");
    console.log('prescriptionpage_modal1');
    $("#prescriptionpage_modal1").removeClass("hide");
    $("#prescriptionpage_modal1").addClass("show");
  }

  close_modal() {
    $(".custom_modal").addClass("hide");
  }

  Reportpage_modal(id, report_file) {
    this.current_id = id;
    this.report_file = null;
    this.report_file = this.url.imageurl + 'reports/' + report_file;
    $(".custom_modal").addClass("hide");
    $("#reportpage_modal1").removeClass("hide");
    $("#reportpage_modal1").addClass("show");
  }

  downloadfile(type) {
    let current_id = this.current_id;
    let filename = this.all_report.filter(function (e) {
      return e.id == current_id;
    });
    this.close_modal();
    if (type == "prescription") {
      filename = filename[0]['prescription_file'];
    }
    else {
      filename = filename[0]['report_file'];
    }
    if(this.platform.is('ios')){
      
    }
   window.open(this.url.baseUrl + 'download_report_file/' + filename, "_system");

  }

  get_total_patient_api(patient_id, doctor_id) {
    this.loader_visibility = true;
    this.http
      .get(`${this.url.serverUrl}get_total_reg_patient_report_api?patient_id=${patient_id}&doctor_id=${doctor_id}`)
      .subscribe(
        (res) => {
          this.patient_name=res[0].f_name+' '+res[0].l_name;
         this.patient_id=res[0].patient_id;
          this.all_report = res;
          this.all_report.length == 0 ? this.no_report = true : this.no_report = false;
          this.loader_visibility = false;
        },
        (err) => {
        }
      );
  }

  delete_report(id,prescription,report)
  {
    this.loader_visibility = true;
    this.http
      .get(`${this.url.serverUrl}delete_report?id=${id}&prescription=${prescription}&report=${report}`)
      .subscribe(
        (res) => {
          this.all_report = this.all_report.filter(function (e) {
            return e.id != id;
          });
          this.loader_visibility = false;
          this.toaster.toaster_show('Success. Report deleted successfully.', 'success', 'white');
        },
        (err) => {
        }
      );

  }

}
