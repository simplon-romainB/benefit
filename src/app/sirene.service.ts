import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SireneService {

  constructor(public http: HttpClient) { }

  getSiren(siret: string) {
    var header = new HttpHeaders('Authorization: Bearer 61e4e737-e427-32ba-be69-6be68ea88e78')
    return this.http.get("https://api.insee.fr/entreprises/sirene/V3/siret/" + siret, {'headers': header})
  }


  
  
}
