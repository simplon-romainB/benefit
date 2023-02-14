import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SireneService {

  constructor(public http: HttpClient) { }

  getSiren(siret: string) {
    var header = new HttpHeaders('Authorization: Bearer 61fdeb80-72a5-3a41-aea9-e1cab7afb1c2')
    return this.http.get("https://api.insee.fr/entreprises/sirene/V3/siret/" + siret, {'headers': header})
  }


  
  
}
