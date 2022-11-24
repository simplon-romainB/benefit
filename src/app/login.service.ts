import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token:string;

  constructor(private http: HttpClient) { }

  register(societe: any) {
    return this.http.post("http://localhost:3000/users", societe,{ 
      reportProgress: true,
      observe: 'events'})
  }
  login(societe: any) {
    return this.http.post("http://localhost:3000/login", societe)
  }
}
