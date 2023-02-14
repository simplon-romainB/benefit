import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  public token: string

  constructor(public http: HttpClient) { }
  uploadFile(formData: any) {
     return this.http.post("/api/thumbnail-upload", formData);
  }

  downloadFile(formaData: any) {
    return this.http.get("")
  }
  getClients() {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/adminclients", { 'headers': header,  withCredentials: true})
  }

  updateAdmin(admin: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.put("http://localhost:3000/admin", admin, { 'headers': header,  withCredentials: true})
  }
  
}
