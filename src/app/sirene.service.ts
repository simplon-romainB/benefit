import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SireneService {

  constructor(public http: HttpClient) { }

  getSiren(siret: string) {
    var header = new HttpHeaders('Authorization: Bearer 200a27c4-dc6f-3674-9048-b780b44f2d17')
    return this.http.get("https://api.insee.fr/entreprises/sirene/V3/siret/" + siret, {'headers': header})
  }


  
  
}
