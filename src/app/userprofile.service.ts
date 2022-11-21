import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(public http: HttpClient) { }
  uploadFile(formData: any) {
     return this.http.post("/api/thumbnail-upload", formData);
  }

  
}
