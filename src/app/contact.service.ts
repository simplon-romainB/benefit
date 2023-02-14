import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public token: string

  constructor(private http: HttpClient) { }


contact(contact: any, recaptcha: string) {
  return this.http.post("http://localhost:3000/contact?recaptcha=" + recaptcha, contact)
  }

sendMail(body: any) {
  var header = new HttpHeaders('Authorization:' + this.token)
  return this.http.post("http://localhost:3000/sendmail", body, {'headers': header, withCredentials: true})
  }
}