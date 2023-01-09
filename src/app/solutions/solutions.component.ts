import { Component } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.sass']
})
export class SolutionsComponent {
  constructor(public contactService: ContactService ) {
  }
 

  entreprisetype: any;
  public contact = {email: '', message: ''}
  public entreprise: any = {name: '', description: ''}
  public entreprises: any =  [{name: 'création', description: "Spécialiste dans la création d'entreprises nous vous accompagnons lors de chacune des étapes de la création de votre entreprise, nous choisissons ensemble la forme juridique la plus adaptée"},
                            {name: 'auto-entreprise', description: "Ne perdez plus de temps à faire votre comptabilité mais exercez votre passion !"},
                            {name: 'petite entreprise', description: "Les PME , principaux acteurs de l'économie sont au coeur de nos préoccupations"},
                            {name: "entreprise moyennne", description: "Quand la quantité de comptabilité atteint un seuil critique nous sommes la pour vous"}]
  public recaptcha: any 

  choose(entreprise: any) {
    this.entreprise = entreprise
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
