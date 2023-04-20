import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profil } from './profil.model';

@Injectable({
  providedIn: 'root'
})
export class FacturationService {

  constructor(public http: HttpClient) { }
  public token: string

  creerClient(client: any, email: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    header.set('Content-Type', 'application/json; charset=utf-8')
    return this.http.post("http://localhost:3000/client?email=" + email, client ,{ 'headers': header,  withCredentials: true})
  }

  getClient(email: string) {
    var header = new HttpHeaders('Authorization:' + this.token)
    
    return this.http.get("http://localhost:3000/client?email=" + email,{ 'headers': header,  withCredentials: true})
  }
  getBillToNumber(email: string) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/getbillto?email=" + email,{ 'headers': header,  withCredentials: true})
  }
  saveProfil(profil: Profil, email: string) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.post("http://localhost:3000/profil?email=" + email ,profil,{ 'headers': header,  withCredentials: true})
  }
  getProfile(email: string) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/profil?email=" + email ,{ 'headers': header,  withCredentials: true})
  }
  checkFacture(numero: number) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.get("http://localhost:3000/checkfacture?numero=" + numero ,{ 'headers': header,  withCredentials: true})
  }
}
