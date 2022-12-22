import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public login: LoginService, public route: Router, public userProfile: UserprofileService) { 
    this.admin.nom = this.login.admin.nom
    this.admin.prenom = this.login.admin.prenom
    this.admin.email = this.login.admin.email
    this.admin.telephone = this.login.admin.telephone
    this.userProfile.getClients().subscribe((v: any) =>{
      for (var i = 0;i < v.length; i++) {
        this.clients.push(v[i])
      }
    })
    
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
}
