import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token:string;
  public societe = {siret: '', siren: '',denomination: '', adresse: '', email: '',Kbis: '', role: '' , isActivate: '', nom: '', prenom:''}

  constructor(private http: HttpClient) { }

  register(societe: any) {
    return this.http.post("http://localhost:3000/users", societe,{ 
      reportProgress: true,
      observe: 'events'})
  }
  login(societe: any) {
    return this.http.post("http://localhost:3000/login", societe)
  }

  updateProfile(societe: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.post("http://localhost:3000/update", societe, { 'headers': header,  withCredentials: true})
  }

  loginAdmin(societe: any) {
    return this.http.post("http://localhost:3000/admin", societe )
  }
}
