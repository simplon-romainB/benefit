import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


contact(contact: any, recaptcha: string) {
  return this.http.post("http://localhost:3000/contact?recaptcha=" + recaptcha, contact)
  }
}