import { Component } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-fonctions',
  templateUrl: './fonctions.component.html',
  styleUrls: ['./fonctions.component.sass']
})
export class FonctionsComponent {

  constructor(public contactService: ContactService) {
    
    }
  public contact = {email: '', message: ''}
  public recaptcha: string

  resolved(captchaResponse: string) {  
    this.recaptcha = captchaResponse;
  } 
  contacter(contact: any, recaptcha: string) {
    this.contactService.contact(contact,recaptcha).subscribe((v)=>{
      console.log(v)
    })

  }
}
