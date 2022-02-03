import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";


@Component({
  selector: 'app-familymember',
  templateUrl: './familymember.page.html',
  styleUrls: ['./familymember.page.scss'],
})
export class FamilymemberPage implements OnInit {
  loader_visibility: boolean = false;
  no_member: boolean = false;
  my_member;
  constructor(
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('login_details').then(res => {
      this.get_member();
    })
  }

  get_member() {
    this.my_member = this.toaster.common_family_member_list;
    this.my_member.length == 0 ? this.no_member = true : this.no_member = false;
  }

  delete_member(id) {
    this.loader_visibility = true;
    this.http
      .get(`${this.url.serverUrl}delete_patient_member?id=${id}`)
      .subscribe(
        (res) => {
          this.my_member = this.my_member.filter(function (e) {
            return e.id != id;
          });
          this.toaster.common_family_member_list = this.my_member;
          this.loader_visibility = false;
          this.toaster.toaster_show('Success! Member deleted successfully.', 'success', 'white');
        },
        (err) => {
        }
      );
  }

}
