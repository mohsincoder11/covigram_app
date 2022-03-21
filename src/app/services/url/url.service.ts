import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  //online
   serverUrl = 'https://covigram.com/api/'
   imageurl = 'https://covigram.com/public/uploads/'
   baseUrl = 'https://covigram.com/'


  //local
  // baseUrl = 'http://localhost/covigram/'
  // serverUrl = 'http://localhost/covigram/api/'
  // imageurl = 'http://localhost/covigram/public/uploads/'

  constructor() { }
}
