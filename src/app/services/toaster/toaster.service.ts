import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  forgot_by=1;
  common_doctor_list;
  common_test_type_list;
  common_center_list;
  common_family_member_list;
  constructor() { }


  toaster_show(msg, type, icon_color) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'colored-toast'
      },
      iconColor: icon_color,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: type,
      title: "<span style='color:#fff;font-size:0.8em;'>" + msg + "</span> "
    })

  }



}
