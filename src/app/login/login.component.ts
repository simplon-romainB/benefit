import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  constructor(private logincom: LoginService, private router: Router) { }

  public siret = ''
  public invalid: boolean
  public societe = {siret: '', password: ''}

  login(societe: any) {
    this.logincom.login(this.societe).subscribe((v: any)=>{
      if ((v === "numero de siret invalide")||(v === 'mot de passe éronné')) {
        this.invalid = true
        var x = setTimeout(()=>this.invalid = false, 5000)
        console.log(v)
      }
      else {
        this.logincom.token = v
        this.router.navigateByUrl('/')
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
