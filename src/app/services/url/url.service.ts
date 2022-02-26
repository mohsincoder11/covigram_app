import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  //online
  //  serverUrl = 'https://demo.webmediaindia.com/covigram/api/'
  //  imageurl = 'https://demo.webmediaindia.com/covigram/public/uploads/'
  //  baseUrl = 'https://demo.webmediaindia.com/covigram/'


  //local
  baseUrl = 'http://localhost/covigram/'
  serverUrl = 'http://localhost/covigram/api/'
  imageurl = 'http://localhost/covigram/public/uploads/'

  constructor() { }
}
