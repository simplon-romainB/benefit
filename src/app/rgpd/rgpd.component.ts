import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.sass']
})
export class RgpdComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  public contact = {email: '', message: ''}
  public recaptcha: any

  ngOnInit(): void {
  }
  resolved(captchaResponse: string) {  
    this.recaptcha = captchaResponse;
  } 
  contacter(contact: any, recaptcha: string) {
    this.contactService.contact(contact,recaptcha).subscribe((v)=>{
      console.log(v)
    })
  }
}
