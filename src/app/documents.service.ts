import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  public token: string

  constructor(public http: HttpClient) { }

  updateKbis(societe: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.post("http://localhost:3000/updatekbis", societe ,{'headers': header, withCredentials: true})
  }
   
  updateDoc(societe: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.post("http://localhost:3000/updatedoc", societe ,{'headers': header, withCredentials: true})
  }

  getDoc(email: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/getdoc?email=" + email,{'headers': header, withCredentials: true})
  }

  uploadBill(bill: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.post("http://localhost:3000/uploadbill" , bill ,{'headers': header, withCredentials: true})
  }

  getBill(email: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/getbill?email=" + email ,{'headers': header, withCredentials: true})
  }
  
  updateLogo(societe: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.post("http://localhost:3000/logo" , societe ,{'headers': header, withCredentials: true})
  }

  downloadLogo(email: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/logo?email=" + email, {'headers': header, withCredentials: true})
  }

  downloadfile(path: string) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/dlfiles?path=" + path, {'headers': header, withCredentials: true})
  }

}
