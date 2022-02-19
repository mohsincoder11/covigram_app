import { Component, OnInit } from '@angular/core';
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "../services/toaster/toaster.service";
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-editdoctor',
  templateUrl: './editdoctor.page.html',
  styleUrls: ['./editdoctor.page.scss'],
})
export class EditdoctorPage implements OnInit {
  f_name: boolean = false;
  l_name: boolean = false;
  email_username: boolean = false;
  email_username_exist: boolean = false;
  mobile: boolean = false;
  mobile_length: boolean = false;
  mobile_no_exist: boolean = false;
  gender: boolean = false;
  specialization: boolean = false;
  state_licence_no: boolean = false;
  npi_no: boolean = false;
  covid_lab_reg: boolean = false;
  office_address: boolean = false;
  work_phone: boolean = false;
  fax_no: boolean = false;
  session_data = {
    'id': '',
    'f_name': '',
    'l_name': '',
    'mobile': '',
    'image': '',
    'gender': '',
    'email_username': '',
    'specialization': '',
    'state_licence_no': '',
    'work_phone': '',
    'office_address': '',
    'npi_no': '',
    'fax_no': '',
    'covid_lab_reg': '',


  };
  loader_visibility: boolean = true;
  exist_image;
  img_url;
  image = null;

  constructor(
    public url: UrlService,
    public http: HttpClient,
    public toaster: ToasterService,
    public storage: Storage,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('login_details').then(res => {
      this.session_data.id = res.id;
      this.session_data.f_name = res.f_name;
      this.session_data.l_name = res.l_name;
      this.session_data.mobile = res.mobile;
      this.session_data.image = res.image;
      this.session_data.gender = res.gender;
      this.session_data.email_username = res.email_username;
      this.session_data.specialization = res.specialization;
      this.session_data.state_licence_no = res.state_licence_no;
      this.session_data.work_phone = res.work_phone;
      this.session_data.office_address = res.office_address;
      this.session_data.npi_no = res.npi_no;
      this.session_data.fax_no = res.fax_no;
      this.session_data.covid_lab_reg = res.covid_lab_reg;
      this.exist_image = res.image;
      this.loader_visibility = false;
      this.img_url = this.url.imageurl + 'profile/' + res.image;
    })
  }

  update_profile(formdata: NgForm) {
    formdata.value.id = this.session_data.id;
    formdata.value.f_name ? this.f_name = false : this.f_name = true;
    formdata.value.l_name ? this.l_name = false : this.l_name = true;
    formdata.value.mobile.toString().length == 10 ? this.mobile_length = false : this.mobile_length = true;
    formdata.value.email_username ? this.email_username = false : this.email_username = true;
    formdata.value.gender ? this.gender = false : this.gender = true;
    formdata.value.gender != 'Select Gender' ? this.gender = false : this.gender = true;
    formdata.value.specialization ? this.specialization = false : this.specialization = true;
    formdata.value.state_licence_no ? this.state_licence_no = false : this.state_licence_no = true;
    formdata.value.npi_no ? this.npi_no = false : this.npi_no = true;
    formdata.value.covid_lab_reg ? this.covid_lab_reg = false : this.covid_lab_reg = true;
    formdata.value.office_address ? this.office_address = false : this.office_address = true;
    formdata.value.work_phone ? this.work_phone = false : this.work_phone = true;
    formdata.value.fax_no ? this.fax_no = false : this.fax_no = true;
    if (formdata.value.f_name && formdata.value.l_name && formdata.value.email_username && !this.email_username_exist && !this.mobile_no_exist &&
      formdata.value.mobile && formdata.value.mobile.toString().length == 10 && formdata.value.gender && formdata.value.gender != 'Select Gender' && formdata.value.specialization && formdata.value.state_licence_no && formdata.value.npi_no && formdata.value.covid_lab_reg && formdata.value.office_address && formdata.value.work_phone && formdata.value.fax_no) {
      this.loader_visibility = true;
      this.mobile_length = false;
      var f_data = new FormData();
      f_data.append('id', formdata.value.id);
      f_data.append('f_name', formdata.value.f_name);
      f_data.append('l_name', formdata.value.l_name);
      f_data.append('gender', formdata.value.gender);
      f_data.append('email_username', formdata.value.email_username);
      f_data.append('mobile', formdata.value.mobile);
      f_data.append('specialization', formdata.value.specialization);
      f_data.append('state_licence_no', formdata.value.state_licence_no);
      f_data.append('npi_no', formdata.value.npi_no);
      f_data.append('office_address', formdata.value.office_address);
      f_data.append('covid_lab_reg', formdata.value.covid_lab_reg);
      f_data.append('work_phone', formdata.value.work_phone);
      f_data.append('fax_no', formdata.value.fax_no);
      f_data.append('image', this.image);
      f_data.append('exist_image', this.exist_image);
       this.http
        .post(`${this.url.serverUrl}doctor_details_update`, f_data)
        .subscribe(
          (res: any) => {
          
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
            this.img_url = this.url.imageurl + 'profile/' + res.image;

            this.storage.set('login_details', this.session_data).then(res => {
              this.loader_visibility = false;
            })
            this.loader_visibility = false;
            this.toaster.toaster_show('Success. Profile updated successfully.', 'success', 'white');
          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          });
    }
  }

  check_email_username_Exist(ev) {
    this.loader_visibility = true;
    this.http.get(`${this.url.serverUrl}check_existing_email_username?email_username=${ev.target.value}&id=${this.session_data.id}`)
      .subscribe(
        (res) => {
          this.loader_visibility = false;
          if (res == 1) {
            this.email_username_exist = true;
          }
          else {
            this.email_username_exist = false;
          }
        },
        (err) => console.log(err)
      );
  }

  check_exist_mobile(event) {
    if (event.target.value.length == 10) {
      this.mobile_length = false;
      this.loader_visibility = true;
      this.http.get(`${this.url.serverUrl}check_existing_mobile_user?mobile=${event.target.value}&id=${this.session_data.id}`)
        .subscribe(
          (res) => {
            this.loader_visibility = false;
            if (res == 1) {
              this.mobile_no_exist = true;
            }
            else {
              this.mobile_no_exist = false;
            }
          },
          (err) => console.log(err)
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
      this.image = imageData;
      this.img_url = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      this.toaster.toaster_show('Error. Please try after some time.', 'error', 'white');
    });
  }
}
