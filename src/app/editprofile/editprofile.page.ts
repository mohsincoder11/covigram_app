import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../services/url/url.service";
import { ToasterService } from "../services/toaster/toaster.service";
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  session_data = {
    id: "",
    f_name: "",
    l_name: "",
    mobile: "",
    age: "",
    email_username: "",
    doctor_id: "",
    image: "",
    gender: "",
    state: "",
    country: "",

  };
  f_name: boolean = false;
  l_name: boolean = false;
  email_username: boolean = false;
  email_username_exist: boolean = false;
  age: boolean = false;
  gender: boolean = false;
  mobile: boolean = false;
  mobile_length: boolean = false;
  mobile_no_exist: boolean = false;
  password: boolean = false;
  state: boolean = false;
  country: boolean = false;
  loader_visibility: boolean = false;
  img_url;
  image = null;
  exist_image;

  constructor(
    public storage: Storage,
    public http: HttpClient,
    public url: UrlService,
    public toaster: ToasterService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('login_details').then(res => {
      this.session_data.f_name = res.f_name;
      this.session_data.l_name = res.l_name;
      this.session_data.mobile = res.mobile;
      this.session_data.image = res.image;
      this.session_data.gender = res.gender;
      this.session_data.age = res.age;
      this.session_data.email_username = res.email_username;
      this.session_data.state = res.state;
      this.session_data.country = res.country;
      this.session_data.id = res.id;
      this.session_data.doctor_id = res.doctor_id;
      this.loader_visibility = false;
      this.exist_image = res.image;
      this.img_url = this.url.imageurl + 'profile/' + res.image;

    })
  }

  update_profile(formdata: NgForm) {
    formdata.value.id = this.session_data.id;
    formdata.value.f_name ? this.f_name = false : this.f_name = true;
    formdata.value.l_name ? this.l_name = false : this.l_name = true;
    formdata.value.email_username ? this.email_username = false : this.email_username = true;
    formdata.value.age ? this.age = false : this.age = true;
    formdata.value.gender ? this.gender = false : this.gender = true;
    formdata.value.gender != 'Select Gender' ? this.gender = false : this.gender = true;
    String(formdata.value.mobile).length == 10 ? this.mobile_length = false : this.mobile_length = true;
    formdata.value.state ? this.state = false : this.state = true;
    formdata.value.country ? this.country = false : this.country = true;
    if (formdata.value.f_name && formdata.value.l_name && formdata.value.age && formdata.value.gender && formdata.value.gender != 'Select Gender' && formdata.value.email_username && !this.email_username_exist && formdata.value.state && formdata.value.country && !this.mobile_no_exist &&
      formdata.value.mobile && formdata.value.mobile.toString().length == 10) {
      var f_data = new FormData();
      f_data.append('id', formdata.value.id);
      f_data.append('f_name', formdata.value.f_name);
      f_data.append('l_name', formdata.value.l_name);
      f_data.append('gender', formdata.value.gender);
      f_data.append('age', formdata.value.age);
      f_data.append('email_username', formdata.value.email_username);
      f_data.append('state', formdata.value.state);
      f_data.append('country', formdata.value.country);
      f_data.append('mobile', formdata.value.mobile);
      f_data.append('image', this.image);
      f_data.append('exist_image', this.exist_image);

      this.loader_visibility = true;
      this.http
        .post(`${this.url.serverUrl}user_details_update`, f_data)
        .subscribe(
          (res) => {
            this.session_data['f_name'] = res['data'].f_name;
            this.session_data['l_name'] = res['data'].l_name;
            this.session_data['image'] = res['data'].image;
            this.session_data['email_username'] = res['data'].email_username;
            this.session_data['age'] = res['data'].age;
            this.session_data['gender'] = res['data'].gender;
            this.session_data['state'] = res['data'].state;
            this.session_data['country'] = res['data'].country;
            this.session_data['u_type'] = 1;

            this.img_url = this.url.imageurl + 'profile/' + res['data'].image;
            this.storage.set('login_details', this.session_data).then(res => {
              this.loader_visibility = false;
            })

            this.toaster.toaster_show('Profile details updated successfully.', 'success', 'white');
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
      this.image = imageData;
      this.img_url = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      this.toaster.toaster_show('Error. Please try after some time.', 'error', 'white');
    });
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

}
