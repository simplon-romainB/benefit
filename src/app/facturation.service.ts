import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturationService {

  constructor(public http: HttpClient) { }
  public token: string

  creerClient(client: any) {
    var header = new HttpHeaders('Authorization:' + this.token)
    return this.http.post("http://localhost:3000/client", client)
  }
}
