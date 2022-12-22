import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AnalyticsService } from '../analyticsservice.service';
import { DocumentsService } from '../documents.service';
import { FacturationService } from '../facturation.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  constructor(public facturation: FacturationService,public cookieService: CookieService, private logincom: LoginService, private router: Router, public documents: DocumentsService, private analytics: AnalyticsService ) {
    this.analytics.trackVirtualPageview("login")
   }

  public siret = ''
  public invalid: boolean
  public societe = {email: '', password: ''}
  public admins = ['romain.barry69@gmail.com']

  login(societe: any) {
    if (this.admins.indexOf(this.societe.email) !== -1 ) {
      this.logincom.loginAdmin(this.societe).subscribe((v: any) => console.log(v))
    }
    this.logincom.login(this.societe).subscribe((v: any)=>{
      if ((v === "numero de siret invalide")||(v === 'mot de passe éronné')) {
        this.invalid = true
        var x = setTimeout(()=>this.invalid = false, 5000)
        
      }
      else {
        this.documents.token = v[0]
        this.facturation.token = v[0]
        this.logincom.token = v[0]
        this.router.navigateByUrl('/')
        this.logincom.societe.siret = v[1][0].SIRET
        this.logincom.societe.siren = v[1][0].SIREN
        this.logincom.societe.Kbis = v[1][0].Kbis
        this.logincom.societe.denomination = v[1][0].denomination
        this.logincom.societe.adresse = v[1][0].adresse
        this.logincom.societe.email = v[1][0].email
        this.logincom.societe.role = v[1][0].role
        this.logincom.societe.isActivate = v[1][0].activate
        this.logincom.societe.nom = v[1][0].Nom
        this.logincom.societe.prenom = v[1][0].Prenom
        if (this.analytics.cookieSet) {
          this.cookieService.set('login', this.societe.email )
          this.cookieService.set("password", this.societe.password )
          console.log(this.cookieService.get('login'))
        }
      }
      
    }, (err) => {
        console.log(err)
        this.invalid = true
        var x = setTimeout(()=>this.invalid = false, 5000)
    });
  }

  
  ngOnInit(): void {
  }

}
