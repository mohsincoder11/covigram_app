import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-editmemberprofile',
  templateUrl: './editmemberprofile.page.html',
  styleUrls: ['./editmemberprofile.page.scss'],
})
export class EditmemberprofilePage implements OnInit {

  public loader_visibility = false;
  doctor_list;
  f_name: boolean = false;
  l_name: boolean = false;
  gender = 'Select Gender';
  gender_err: boolean = false;
  age: boolean = false;
  doctor_id_err: boolean = false;
  doctor_id = 'Select Doctor';
  relation = 'Select Relation';
  relation_err: boolean = false;
  parent_id;
  img_url;
  image = null;
  edit_member;
  member_data = {
    id: "",
    f_name: "",
    l_name: "",
    gender: "",
    age: "",
    image: "",
    relation: "",
    doctor_id: "",
  };
  constructor(
    private router: Router,
    private storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    public route: ActivatedRoute
  ) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    let edit_id = this.route.snapshot.paramMap.get('id');
    this.edit_member = this.toaster.common_family_member_list.filter(function (e) {
      return e.id == edit_id;
    });
    this.edit_member = this.edit_member[0];
    this.member_data['f_name'] = this.edit_member['f_name'];
    this.member_data['l_name'] = this.edit_member['l_name'];
    this.member_data['age'] = this.edit_member['age'];
    this.member_data['gender'] = this.edit_member['gender'];
    this.member_data['doctor_id'] = this.edit_member['doctor_id'];
    this.member_data['relation'] = this.edit_member['relation'];

    this.doctor_list = this.toaster.common_doctor_list;
    this.storage.get('login_details').then(res => {
      this.img_url = this.url.imageurl + 'profile/noimage.png';
      this.parent_id = res.id;
    })
    this.get_doctor();
  }

  get_doctor() {
    this.http
      .get(`${this.url.serverUrl}get_doctor_for_login`)
      .subscribe(
        (res) => {
          this.doctor_list = res;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  update_member(formdata: NgForm) {

    formdata.value.doctor_id ? this.doctor_id_err = false : this.doctor_id_err = true;
    formdata.value.doctor_id != 'Select Doctor' ? this.doctor_id_err = false : this.doctor_id_err = true;
    formdata.value.f_name ? this.f_name = false : this.f_name = true;
    formdata.value.l_name ? this.l_name = false : this.l_name = true;
    formdata.value.age ? this.age = false : this.age = true;
    formdata.value.gender ? this.gender_err = false : this.gender_err = true;
    formdata.value.gender != 'Select Gender' ? this.gender_err = false : this.gender_err = true;
    formdata.value.relation ? this.relation_err = false : this.relation_err = true;
    formdata.value.relation != 'Relation With Patient' ? this.relation_err = false : this.relation_err = true;

    if (formdata.value.f_name && formdata.value.l_name && formdata.value.doctor_id && formdata.value.doctor_id != 'Select Doctor' && formdata.value.age && formdata.value.gender && formdata.value.gender != 'Select Gender' && formdata.value.relation && formdata.value.relation != 'Relation With Patient') {
      this.loader_visibility = true;
      var f_data = new FormData();
      f_data.append('doctor_id', formdata.value.doctor_id);
      f_data.append('age', formdata.value.age);
      f_data.append('f_name', formdata.value.f_name);
      f_data.append('l_name', formdata.value.l_name);
      f_data.append('image', this.image);
      f_data.append('gender', formdata.value.gender);
      f_data.append('relation', formdata.value.relation);
      f_data.append('id', this.edit_member.id);

      this.http
        .post(`${this.url.serverUrl}update_patient_member`, f_data)
        .subscribe(
          (res: any) => {
            let index = this.toaster.common_family_member_list.findIndex((obj => obj.id == res.id));
            this.toaster.common_family_member_list[index]=res;
            formdata.resetForm();
            this.router.navigate(['/familymember']);
            this.loader_visibility = false;
            this.toaster.toaster_show('Member details updated successfully.', 'success', 'white');
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          }
        );
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.image = imageData;
      //    this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  }

}
