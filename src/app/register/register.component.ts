import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SireneService } from '../sirene.service';
import { UserprofileService } from '../userprofile.service';
import { finalize, Subscription } from 'rxjs'
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(public siren: SireneService, public user: UserprofileService, public http: HttpClient) { }
  public siret: string = ''
  public societe = {SIRET: '',SIREN: '', nom: '', adresse: '', capital: '', dirigeant:''}
  public fichier: any
  public fileName: any = ''
  public uploadProgress:number;
  private  uploadSub: Subscription;

  ngOnInit(): void {
  }

  getSiren(siret: string) {
    this.siren.getSiren(siret).subscribe((v: any) => {
      this.societe.SIREN = v.etablissement.siren
      this.societe.nom = v.etablissement.uniteLegale.denominationUniteLegale
      this.societe.adresse = v.etablissement.adresseEtablissement.numeroVoieEtablissement + " "
       + v.etablissement.adresseEtablissement.typeVoieEtablissement + " "
       + v.etablissement.adresseEtablissement.libelleVoieEtablissement + " "
       + v.etablissement.adresseEtablissement.libelleCommuneEtablissement
      this.societe.dirigeant = v.etablissement.uniteLegale.prenom1UniteLegale + " " + v.etablissement.uniteLegale.nomUniteLegale
      
    })
  }
  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;
        const formData: any = new FormData();
        formData.append("thumbnail", file);
      this.postDatas(formData)
      this.uploadSub = this.postDatas(formData).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event?.total));
        }
      })
    }
}
postDatas(formData: any) {
  return this.http.post("http://localhost:3000/fileUpload", formData, {
    reportProgress: true,
    observe: 'events'
    
})
.pipe(
    finalize(() => this.reset())
);
}
cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = 0;
  
}
  

}
