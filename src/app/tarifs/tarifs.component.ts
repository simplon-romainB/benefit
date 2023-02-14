import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-tarifs',
  templateUrl: './tarifs.component.html',
  styleUrls: ['./tarifs.component.sass']
})
export class TarifsComponent implements OnInit {
  public categories = [{titre: "Pole Social", photo:"/assets/img/logovert.png", texte:"blabla"},
                       {titre: "Pole juridique", photo:"/assets/img/logomagenta.png", texte:"blabla"},
                       {titre: "Pole expertise comptable", photo:"/assets/img/logobleu.png", texte:"blabla"}
                      ]
  public next = 0
  public previous = 0
  public recaptcha: string
  public contact = {email: '', message: ''}


  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }
  nextDesc() {
    if (this.next === 0) {
      document.getElementById("descsocial").style.display = "none"
      document.getElementById("descjuridique").style.display = "block"
      document.getElementById("desccomptable").style.display = "none"
      this.next ++
    }
    else if (this.next === 1) {
      document.getElementById("descsocial").style.display = "none"
      document.getElementById("descjuridique").style.display = "none"
      document.getElementById("desccomptable").style.display = "block"
      this.next ++
    }
    else {
      document.getElementById("descsocial").style.display = "block"
      document.getElementById("descjuridique").style.display = "none"
      document.getElementById("desccomptable").style.display = "none"
      this.next = 0
    }
    
  }

  previousDesc() {
    if (this.next === 0) {
      document.getElementById("descsocial").style.display = "none"
      document.getElementById("descjuridique").style.display = "none"
      document.getElementById("desccomptable").style.display = "block"
      this.next = 2
    }
    else if (this.next === 2) {
      document.getElementById("descsocial").style.display = "none"
      document.getElementById("descjuridique").style.display = "block"
      document.getElementById("desccomptable").style.display = "none"
      this.next --
    }
    else {
      document.getElementById("descsocial").style.display = "block"
      document.getElementById("descjuridique").style.display = "none"
      document.getElementById("desccomptable").style.display = "none"
      this.next --
    }
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
