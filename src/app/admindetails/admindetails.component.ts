import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { LoginService } from '../login.service';
import { UserprofileService } from '../userprofile.service';

@Component({
  selector: 'app-admindetails',
  templateUrl: './admindetails.component.html',
  styleUrls: ['./admindetails.component.sass']
})
export class AdmindetailsComponent implements OnInit {
  public admin = {nom: "", prenom: "", email: "", telephone: "", password: "", confirmpassword: ""}
  public clients: any = []
  public client: any
  public siret: string 
  private clientSiret = { siret:'', email: ''}
  public body = {email: '', message: ''}

  

  constructor(private contact: ContactService, private loginService: LoginService, public login: LoginService, public route: Router, public userProfile: UserprofileService) { 
    this.admin.nom = this.login.admin.nom
    this.admin.prenom = this.login.admin.prenom
    this.admin.email = this.login.admin.email
    this.admin.telephone = this.login.admin.telephone
    this.initClients()
  }

  ngOnInit(): void {
  }

  deconnexion() {
    this.admin.nom = ""
    this.admin.prenom = ""
    this.admin.email = ""
    this.admin.telephone = ""
    this.admin.password = ""
    this.admin.confirmpassword = ""
    this.login.token = ""
    this.route.navigateByUrl('/')
  }
  chooseClient(client: any) {
    this.client = client
  }
  initClients() {
    this.userProfile.getClients().subscribe((v: any) =>{
      this.clients = []
      for (var i = 0;i < v.length; i++) {
        this.clients.push(v[i])
      }
    })
  }
  addSiret(siret: string) {
    if (confirm("êtes vous sur de vouloir modifier ce numero  de Siret ? un numéro de Siret invalide peut provoquer des érreurs")) {
      this.clientSiret.email = this.client.email
      this.clientSiret.siret = this.siret
      this.loginService.updateSiret(this.clientSiret).subscribe((v)=> {
        this.initClients()
      })
    }
  }
  deleteClient() {
    if (confirm("êtes vous sur de vouloir supprimer ce client ?")) {
      this.loginService.deleteClient(this.client.email).subscribe((v)=>{
        console.log(v)
        this.initClients()
      })
    }
  }
  sendMail(client) {
    this.body.email = this.client.email
    this.contact.sendMail(client).subscribe((v) => {
      console.log(v)
    })
  }

  sendNotif(email: string) {

  }

  updateProfil(admin: any) {
    this.userProfile.updateAdmin(admin).subscribe((v) =>{
      console.log(v)
    })
  }
}
