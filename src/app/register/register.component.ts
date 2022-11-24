import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SireneService } from '../sirene.service';
import { UserprofileService } from '../userprofile.service';
import { finalize, Subscription, pipe } from 'rxjs'
import * as Tesseract from 'tesseract.js';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(public siren: SireneService, public user: UserprofileService, public http: HttpClient, public login: LoginService) { }
  public siret: string = ''
  public societe = {SIRET: '',SIREN: '', nom: '', adresse: '', capital: '', password: '', passwordconfirm: '', email: '', nomdirigeant: '', prenomdirigeant: ''}
  public fichier: any
  public fileName: any = ''
  public uploadProgress:number;
  public siretok = false;
  public invalid = false;
  public numbersOnly = false
  public inputNull = false;
  public eightValidate: boolean =false
  public majValidate: boolean = false
  public minValidate: boolean = false
  public specValidate: boolean = false
  private special = /[^A-z\s\d][\\\^]?/g
  private min = /[a-z]/gm
  private maj = /[A-Z]/gm
  public passConfirmed = false;
  public registerReady = false;
  public transData: any = new FormData();

  ngOnInit(): void {
  }

  getSiren(siret: string) {
    if ((this.siret).length === 14) {
      this.siren.getSiren(siret).subscribe((v: any) => {
        this.societe.SIRET = this.siret
        this.societe.SIREN = v.etablissement.siren
        this.societe.nom = v.etablissement.uniteLegale.denominationUniteLegale
        this.societe.adresse = v.etablissement.adresseEtablissement.numeroVoieEtablissement + " "
        + v.etablissement.adresseEtablissement.typeVoieEtablissement + " "
        + v.etablissement.adresseEtablissement.libelleVoieEtablissement + " "
        + v.etablissement.adresseEtablissement.libelleCommuneEtablissement
        this.siretok = true
      },(err) => {
        this.invalid = true
        var x = setTimeout(()=>{this.invalid = false}, 5000)
      }
      
      )
    } 
    else {
      
      this.numbersOnly = true
      var z = setTimeout(()=>{this.numbersOnly = false}, 5000)
    }
  }
  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;
        const formData: any = new FormData();
        formData.append("thumbnail", file);
        formData.append("siret", this.societe.SIRET);
        formData.append("siren", this.societe.SIREN);
        formData.append("nom", this.societe.nom);
        formData.append("adresse", this.societe.adresse);
        formData.append("password", this.societe.password);
        formData.append("email", this.societe.email);
        formData.append("nomdirigeant", this.societe.nomdirigeant);
        formData.append("prenomdirigeant", this.societe.prenomdirigeant);
        this.postDatas(formData)
      
    }
}
postDatas(formData: any) {
  this.transData = formData

 
    
}



passValidation() {

  if ((this.societe.password).length >= 8) {
    this.eightValidate = true
  }
  else {
    this.eightValidate = false;
  }

  if (this.special.test(this.societe.password)) {
    this.specValidate = true;
  }
  else if(!this.special.test(this.societe.password)){
    this.specValidate = false;
  }

  if (this.min.test(this.societe.password)) {
    this.minValidate = true
  }
  else if(!this.min.test(this.societe.password)){
    this.minValidate = false
  }

  if (this.maj.test(this.societe.password)) {
    this.majValidate = true
  }
  else if(!this.maj.test(this.societe.password)){
    this.majValidate = false
  }

  if((this.passConfirmed)&&(this.majValidate)&&(this.minValidate)&&(this.specValidate)) {
    this.registerReady = true;
  }
  else {
    this.registerReady = false;
  }
}

confirmPassword() {
if(this.societe.password === this.societe.passwordconfirm) {
  this.passConfirmed = true
}
else {
  this.passConfirmed = false
}
}
register(societe: any) {
  this.login.register(societe).subscribe((v)=> {
    console.log(v)
  })
} 

}
