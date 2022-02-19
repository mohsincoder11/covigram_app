import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'createacc',
    loadChildren: () => import('./createacc/createacc.module').then(m => m.CreateaccPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotPageModule)
  },
  {
    path: 'verify/:number/:otp',
    loadChildren: () => import('./verify/verify.module').then(m => m.VerifyPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'createaccdoctor',
    loadChildren: () => import('./createaccdoctor/createaccdoctor.module').then(m => m.CreateaccdoctorPageModule)
  },
  {
    path: 'doctorlogin',
    loadChildren: () => import('./doctorlogin/doctorlogin.module').then(m => m.DoctorloginPageModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(m => m.BookPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.SchedulePageModule)
  },
  {
    path: 'submitreport',
    loadChildren: () => import('./submitreport/submitreport.module').then(m => m.SubmitreportPageModule)
  },
  {
    path: 'doctordash',
    loadChildren: () => import('./doctordash/doctordash.module').then(m => m.DoctordashPageModule)
  },
  {
    path: 'downloadreport',
    loadChildren: () => import('./downloadreport/downloadreport.module').then(m => m.DownloadreportPageModule)
  },
  {
    path: 'medicalreport',
    loadChildren: () => import('./medicalreport/medicalreport.module').then(m => m.MedicalreportPageModule)
  },
  {
    path: 'bookapp',
    loadChildren: () => import('./bookapp/bookapp.module').then(m => m.BookappPageModule)
  },
  {
    path: 'todayapp',
    loadChildren: () => import('./todayapp/todayapp.module').then(m => m.TodayappPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'totalregister',
    loadChildren: () => import('./totalregister/totalregister.module').then(m => m.TotalregisterPageModule)
  },
  {
    path: 'uploadreport/:id',
    loadChildren: () => import('./uploadreport/uploadreport.module').then(m => m.UploadreportPageModule)
  },
  {
    path: 'downloadfile/:id',
    loadChildren: () => import('./downloadfile/downloadfile.module').then(m => m.DownloadfilePageModule)
  },
  {
    path: 'doctorforgot',
    loadChildren: () => import('./doctorforgot/doctorforgot.module').then(m => m.DoctorforgotPageModule)
  },
  {
    path: 'doctorverify',
    loadChildren: () => import('./doctorverify/doctorverify.module').then(m => m.DoctorverifyPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then(m => m.PrivacypolicyPageModule)
  },
  {
    path: 'reportform/:patient_id',
    loadChildren: () => import('./reportform/reportform.module').then(m => m.ReportformPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then(m => m.CalModalPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then(m => m.OtpPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofilePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'otpdoctor',
    loadChildren: () => import('./otpdoctor/otpdoctor.module').then(m => m.OtpdoctorPageModule)
  },
  {
    path: 'familymember',
    loadChildren: () => import('./familymember/familymember.module').then(m => m.FamilymemberPageModule)
  },
  {
    path: 'query',
    loadChildren: () => import('./query/query.module').then(m => m.QueryPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then(m => m.FooterPageModule)
  },
  {
    path: 'pcrtest',
    loadChildren: () => import('./pcrtest/pcrtest.module').then(m => m.PcrtestPageModule)
  },
  {
    path: 'rapidpcrtest',
    loadChildren: () => import('./rapidpcrtest/rapidpcrtest.module').then(m => m.RapidpcrtestPageModule)
  },
  {
    path: 'antibodytest',
    loadChildren: () => import('./antibodytest/antibodytest.module').then(m => m.AntibodytestPageModule)
  },
  {
    path: 'vaccinecertificate',
    loadChildren: () => import('./vaccinecertificate/vaccinecertificate.module').then(m => m.VaccinecertificatePageModule)
  },
  {
    path: 'other',
    loadChildren: () => import('./other/other.module').then(m => m.OtherPageModule)
  },
  {
    path: 'editmemberprofile/:id',
    loadChildren: () => import('./editmemberprofile/editmemberprofile.module').then(m => m.EditmemberprofilePageModule)
  },
  {
    path: 'addfamilymemeber',
    loadChildren: () => import('./addfamilymemeber/addfamilymemeber.module').then( m => m.AddfamilymemeberPageModule)
  },
  {
    path: 'newpassword',
    loadChildren: () => import('./newpassword/newpassword.module').then( m => m.NewpasswordPageModule)
  },
  {
    path: 'resetpassword/:number',
    loadChildren: () => import('./resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'footerdoctor',
    loadChildren: () => import('./footerdoctor/footerdoctor.module').then( m => m.FooterdoctorPageModule)
  },
  {
    path: 'editdoctor',
    loadChildren: () => import('./editdoctor/editdoctor.module').then( m => m.EditdoctorPageModule)
  },
  {
    path: 'viewtodayreport/:patient_id',
    loadChildren: () => import('./viewtodayreport/viewtodayreport.module').then( m => m.ViewtodayreportPageModule)
  },
  {
    path: 'viewreport/:patient_id',
    loadChildren: () => import('./viewreport/viewreport.module').then( m => m.ViewreportPageModule)
  },
  {
    path: 'viewtotalregister/:patient_id',
    loadChildren: () => import('./viewtotalregister/viewtotalregister.module').then( m => m.ViewtotalregisterPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
