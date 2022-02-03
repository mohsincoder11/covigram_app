import { Component, OnInit } from '@angular/core';
import { ToasterService } from "../services/toaster/toaster.service";
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-downloadreport',
  templateUrl: './downloadreport.page.html',
  styleUrls: ['./downloadreport.page.scss'],
})
export class DownloadreportPage implements OnInit {

  loader_visibility:boolean=true;
  test_type_list;
  constructor(
    public toaster:ToasterService,
    public url:UrlService,
    public http:HttpClient
  ) { }



  ngOnInit() {
    this.get_test_Type();
  }

  get_test_Type(){
    this.http
    .get(`${this.url.serverUrl}get_test_Type`)
    .subscribe(
      (res) => {
        this.test_type_list=res;
        this.toaster.common_test_type_list = res;
        this.loader_visibility = false;

      },
      (err) => {
        this.loader_visibility = false;
        this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
      }
    );
  }
}
