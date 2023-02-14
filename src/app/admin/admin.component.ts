import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserprofileService } from '../userprofile.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  public admin = {nom: "", prenom: "" , email: "", telephone:"", password: ""}

  constructor(public loginService: LoginService, public login: LoginService, private router: Router, private userProfile: UserprofileService) { }

  ngOnInit(): void {
  }

loginAdmin(admin: any) {
  this.login.loginAdmin(admin).subscribe((v: any)=> {
    this.login.admin.nom = v[1][0].nom
    this.login.admin.prenom = v[1][0].prenom
    this.login.admin.email = v[1][0].email 
    this.login.admin.telephone = v[1][0].telephone
    this.loginService.token = v[0]
    this.userProfile.token = v[0]
    this.router.navigateByUrl("/admindetails")
  })
}
}
