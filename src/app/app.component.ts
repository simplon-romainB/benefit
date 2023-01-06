import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AnalyticsService } from './analyticsservice.service';
import { DocumentsService } from './documents.service';
import { FacturationService } from './facturation.service';
import { LoginService } from './login.service';
import { Meta, Title } from '@angular/platform-browser';
import { SwPush } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public cookie = false
  public choice: boolean
  private societe = {email: '', password: ''}
  public analytics2: boolean
  public connexion: boolean

constructor(private _swPush: SwPush, private meta: Meta, private title: Title,public facturation: FacturationService ,public logincom: LoginService, private analytics: AnalyticsService, private cookieService:CookieService, private login: LoginService, public router: Router, public documents: DocumentsService) {
  this.meta.addTags([
    {name: 'description', content: "site web de la société Benefit cabinet d'expertise comptable situé à Venissieux dans la banlieue de Lyon"},
    {name: 'author', content: 'Barry Romain'},
    {name: 'keywords', content: "comptabilité juridique social fiche de paie entreprise autoentrepreneur création d'entreprise"},
    {name: 'robots', content: 'index, follow'}
  ]);
  this.title.setTitle('Benefit');
  this.requestSubscription();
  if (this.analytics.cookie === true) {
    var x = setTimeout(()=>this.cookie = true, 1000)
  }
  
  if ((this.cookieService.get('login') !== '')&&(this.cookieService.get('login') !== undefined)) {
    
    this.societe.email = this.cookieService.get('login')
    this.societe.password = this.cookieService.get('password')
    this.login.login(this.societe).subscribe((v: any) => {
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
    })
  }
}

cookieToggle() {
  this.cookie ? this.cookie = false : this.cookie = true
  this.choice = false
}
ngOnInit() {
  
}
acceptAll() {
  this.analytics.startTracking()
  this.analytics.cookieSet = true
  this.cookie = false
}

refuseAll() {
  this.analytics.cookieSet = false
  this.cookie = false
  this.cookieService.delete('login')
  this.cookieService.delete('password')
}

choose() {
  this.choice = true
  
}
changeCookies() {
  this.analytics2? this.analytics.startTracking : console.log('ok')
  if (this.connexion) {
    this.analytics.cookieSet = true
    
  }  
  else {
    this.analytics.cookieSet = false
    this.cookieService.delete('login')
    this.cookieService.delete('password')
  }
  this.cookie = false
} 
requestSubscription()  {
  console.log("ok")
  this._swPush.requestSubscription({
    serverPublicKey: 'BByYFQkifIAHNj4V4kmemHPU7RLW7YjSbYim1Rowy4cL_GWin9HdTYISCPLpIIClstAxrjUZkh6TQz9O4OX2u-8'
  }).then((_) => {
    console.log("notif ok")
    console.log(JSON.stringify(_));
  }).catch((_) => console.log);
  if (!this._swPush.isEnabled) {
    console.log("Notification is not enabled.");
    return;
  }
};

}
