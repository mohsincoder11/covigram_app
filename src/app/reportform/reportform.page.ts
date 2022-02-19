import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlService } from "../services/url/url.service";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "../services/toaster/toaster.service";
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reportform',
  templateUrl: './reportform.page.html',
  styleUrls: ['./reportform.page.scss'],
})
export class ReportformPage implements OnInit {


  test_id;
  test_date: boolean = false;
  issue_date: boolean = false;
  test_type_id: boolean = false;
  center_id_err: boolean = false;
  other_test_name: boolean = false;

  loader_visibility: boolean = true;
  description: boolean = false;
  vaccine_detail_err: boolean = false;

  doctor_id;
  patient_id;
  center_id;
  vaccine_detail;
  isLoading = false;
  prescription_image = null;
  report_file = null;
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  prescription_image_ext;
  report_file_ext;
  prescription_camera = 'assets/c1.png';
  prescription_file = 'assets/g1.png';
  report_camera_preview = 'assets/c1.png';
  report_file_preview = 'assets/g1.png';
  doctor_backurl;
  test_type_list;
  test_type_id_err;
  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    public router: Router,
    public url: UrlService,
    public http: HttpClient,
    public toaster: ToasterService,
    public route: ActivatedRoute,
    public storage: Storage,
  ) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.doctor_backurl = this.toaster.doctor_backurl;
    this.reset_preview('prescription');
    this.reset_preview('report');
    this.vaccine_detail = 'Vaccination Details';
    this.center_id = 'Select Center';
    this.patient_id = this.route.snapshot.paramMap.get('patient_id');
    this.storage.get('login_details').then(res => {
      this.doctor_id = res.id;
      this.loader_visibility = false;
    })
  }

  ionViewDidEnter() {
    let id = this.test_id;
    this.get_test_Type();
  }
  get_test_Type() {
    this.http
      .get(`${this.url.serverUrl}get_test_Type`)
      .subscribe(
        (res) => {
          this.test_type_list = res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
          this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
        }
      );
  }

  submit_form(formdata: NgForm) {
    formdata.value.test_date ? this.test_date = false : this.test_date = true;
    formdata.value.issue_date ? this.issue_date = false : this.issue_date = true;
    formdata.value.center_id ? this.center_id_err = false : this.center_id_err = true;
    formdata.value.center_id != 'Select Center' ? this.center_id_err = false : this.center_id_err = true;
    formdata.value.test_type_id ? this.test_type_id_err = false : this.test_type_id_err = true;
    formdata.value.test_type_id != 'Select Test Type' ? this.test_type_id_err = false : this.test_type_id_err = true;
    
    if (this.test_id == 6) {
      formdata.value.other_test_name ? this.other_test_name = false : this.other_test_name = true;
    }
    if (this.test_id == 5) {
      formdata.value.vaccine_detail ? this.vaccine_detail_err = false : this.vaccine_detail_err = true;
      formdata.value.vaccine_detail != 'Vaccination Details' ? this.vaccine_detail_err = false : this.vaccine_detail_err = true;
    }
  
    if (formdata.value.test_date && formdata.value.issue_date && formdata.value.center_id && formdata.value.center_id != 'Select Center' && formdata.value.test_type_id && formdata.value.test_type_id!='Select Test Type') {
      this.loader_visibility = true;
      var f_data = new FormData();
      f_data.append('doctor_id', this.doctor_id);
      f_data.append('patient_id', this.patient_id);
      f_data.append('test_date', formdata.value.test_date);
      f_data.append('issue_date', formdata.value.issue_date);
      f_data.append('test_type_id', formdata.value.test_type_id);
      f_data.append('center_id', formdata.value.center_id);
      f_data.append('vaccine_detail', formdata.value.vaccine_detail ? formdata.value.vaccine_detail : null);
      f_data.append('description', formdata.value.description);
      f_data.append('other_test_name', formdata.value.other_test_name ? formdata.value.other_test_name : null);
      f_data.append('prescription', this.prescription_image);
      f_data.append('ext1', 'jpg');
      f_data.append('report', this.report_file);
      f_data.append('ext2', 'jpg');
      f_data.append('upload_by', '2');


      this.http
        .post(`${this.url.serverUrl}upload_report`, f_data)
        .subscribe(
          (res) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Report added successfully .', 'success', 'white');
            formdata.resetForm();
            this.router.navigate([this.doctor_backurl]);

          },
          (err) => {
            this.loader_visibility = false;
            this.toaster.toaster_show('Server Error. Please try after some time.', 'error', 'white');
          });
    }
  }


  async selectImage(type) {
    if (type == 'camera')
      this.pickImage(this.camera.PictureSourceType.CAMERA, 1);
    else
      this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, 2);
  }

  pickImage(sourceType, type) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.prescription_image = imageData;
      this.reset_preview('prescription');
      if (type == 1)
        this.prescription_camera = 'data:image/jpeg;base64,' + imageData;
      else
        this.prescription_file = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.toaster.toaster_show('Error. Please try after some time.', 'error', 'white');

    });
  }



  async selectImage2(type) {
    if (type == 'camera')
      this.pickImage2(this.camera.PictureSourceType.CAMERA, 1);
    else
      this.pickImage2(this.camera.PictureSourceType.PHOTOLIBRARY, 2);
  }

  pickImage2(sourceType, type) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.report_file = imageData;
      this.reset_preview('report');
      if (type == 1)
        this.report_camera_preview = 'data:image/jpeg;base64,' + imageData;
      else
        this.report_file_preview = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      this.toaster.toaster_show('Error. Please try after some time.', 'error', 'white');

    });
  }

  reset_preview(reset_for) {
    if (reset_for == 'report') {
      this.report_camera_preview = 'assets/c1.png';
      this.report_file_preview = 'assets/g1.png';
    }
    else {
      this.prescription_camera = 'assets/c1.png';
      this.prescription_file = 'assets/g1.png';
    }
  }
}

