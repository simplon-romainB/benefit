import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analyticsservice.service';
import { DocumentsService } from '../documents.service';
import { LoginService } from '../login.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { FacturationService } from '../facturation.service';
import { Profil } from '../profil.model';
import { ContactService } from '../contact.service';



@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.sass']
})
export class EspaceClientComponent implements OnInit {
  public societe = {siret: '', siren: '',denomination: '', adresse: '', email: '',Kbis: '', role: '' , isActivate: '', nom: '', prenom:'', password: '', passwordconfirm: '', rcs: ''}
  public eightValidate: boolean =false
  public majValidate: boolean = false
  public minValidate: boolean = false
  public specValidate: boolean = false
  private special = /[^A-z\s\d][\\\^]?/g
  private min = /[a-z]/gm
  private maj = /[A-Z]/gm
  public passConfirmed = false;
  public registerReady = false;
  public transData: any = new FormData();
  public fileName:string
  public fileName2: string
  public fileName3: string
  public renderDoc: any = []
  public facture = false;
  public items: any = []
  public item = {designation: '', quantite: '',unite: '',prix: '',tva: ''}
  public date = new Date(Date.now())
  public tempBill: any = {}
  public factureForm = false
  public cart = false
  public bill = false
  public existClient = false
  public client = {nom: '', prenom: '', adresse: '', email: '', telephone: '', denomination: '', delaipaiement: ''}
  public clients: any = []
  public numeroFinal = 0;
  public factures: any = []
  public erase: any
  public selected: string
  public profile: Profil = {nom: '',
                            ville: '',
                            capital: 0,
                            numeroRM: '',
                            numeroTva: '',
                            formeJuridique: '',
                            delaiPaiement: 0,
                            societe: false,
                            conformite: false,
                            association: false,
                            TVA: false,
                            assurance: false,
                            informations: '',
                            societeOrComm: '',
                            TVAna: ''}
  public profiles: Profil[] = []
  public pageCount = 1
  public add = 0
  public pageSize = 2
  public facturesecond = 0
  public multiFacture = false
  public billPageNumber = 1
  public articlesNumber = 0
  public page = 1
  public doc: any
  public totalTTC = 0
  public totalHT = 0
  public logo: string
  public expanded: boolean
  public tva21: number = 0
  public tva20: number = 0
  public tva55: number = 0
  public tva10: number = 0
  public renseignements: boolean
  public numerofacture: number
  public recaptcha: string
  public contact = {email: '', message: ''}
  
  
  
  constructor( private contactService: ContactService, private router: Router,  public facturation: FacturationService,public logincom: LoginService, public documents: DocumentsService, private analytics: AnalyticsService, public route : Router) {
    this.societe.siret = this.logincom.societe.siret
    this.societe.siren = this.logincom.societe.siren
    this.societe.denomination = this.logincom.societe.denomination
    this.societe.adresse = this.logincom.societe.adresse
    this.societe.email = this.logincom.societe.email
    this.societe.Kbis = this.logincom.societe.Kbis
    this.societe.role = this.logincom.societe.role
    this.societe.isActivate = this.logincom.societe.isActivate
    this.societe.nom = this.logincom.societe.nom
    this.societe.prenom = this.logincom.societe.prenom
    this.getDoc(this.societe.email)
    this.analytics.trackVirtualPageview("espaceClient")
    this.getClient()
    this.documents.getBill(this.societe.email).subscribe((v: any) =>{
      for (var i = 0;i <v.length; i++) {
        this.factures.push(v[i])
      } 
    })
    this.facturation.getProfile(this.societe.email).subscribe((v: any)=>{
      for (var i = 0; i< v.length; i ++) {
        this.profiles.push(v[i])
        
      }
      
    })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.documents.downloadLogo(this.societe.email).subscribe((v: any)=> {
      this.logo = v[0].path
    })
   }

   

  ngOnInit(): void {
    
  }


  passValidation() {

    if ((this.societe.password).length >= 8) {
      this.eightValidate = true
    }
    else {
      this.eightValidate = false;
    }
  
    if (this.special.test(this.societe.password)) {
      this.specValidate = true;
    }
    else if(!this.special.test(this.societe.password)){
      this.specValidate = false;
    }
  
    if (this.min.test(this.societe.password)) {
      this.minValidate = true
    }
    else if(!this.min.test(this.societe.password)){
      this.minValidate = false
    }
  
    if (this.maj.test(this.societe.password)) {
      this.majValidate = true
    }
    else if(!this.maj.test(this.societe.password)){
      this.majValidate = false
    }
  
    if((this.passConfirmed)&&(this.majValidate)&&(this.minValidate)&&(this.specValidate)) {
      this.registerReady = true;
    }
    else {
      this.registerReady = false;
    }
  }
  
  confirmPassword() {
  if(this.societe.password === this.societe.passwordconfirm) {
    this.passConfirmed = true
  }
  else {
    this.passConfirmed = false
  }
  }
  
  onFileSelected(event: any) {

    const file:File = event.target.files[0];
    
    if (file) {
        const formData: any = new FormData();
        this.fileName = file.name;
        formData.append("thumbnail", file);
        formData.append("siret", this.societe.siret);
        formData.append("siren", this.societe.siren);
        formData.append("nom", this.societe.denomination);
        formData.append("adresse", this.societe.adresse);
        formData.append("password", this.societe.password);
        formData.append("email", this.societe.email);
        formData.append("nomdirigeant", this.societe.nom);
        formData.append("prenomdirigeant", this.societe.prenom);
        this.postDatas(formData)
        this.documents.updateDoc(this.transData).subscribe((v)=>{
          this.getDoc(this.societe.email)
        })
      
    }
}

onLogoSelected(event: any) {

  const file:File = event.target.files[0];
  
  if (file) {
      const formData: any = new FormData();
      this.fileName3 = file.name;
      formData.append("logo", file);
      formData.append("siret", this.societe.siret);
      formData.append("siren", this.societe.siren);
      formData.append("nom", this.societe.denomination);
      formData.append("adresse", this.societe.adresse);
      formData.append("password", this.societe.password);
      formData.append("email", this.societe.email);
      formData.append("nomdirigeant", this.societe.nom);
      formData.append("prenomdirigeant", this.societe.prenom);
      this.postDatas(formData)
      this.documents.updateLogo(this.transData).subscribe((v)=>{
        
      })
      this.documents.downloadLogo(this.societe.email).subscribe((v: any)=> {
        console.log(v)
        this.logo = v.path
      })
    
  }
}
postDatas(formData: any) {
  this.transData = formData 
}

updateProfil(societe: any) {
  this.logincom.updateProfile(this.societe).subscribe((v: any)=>{
    console.log(v)
  })
}



onKbisSelected(event: any) {

  const file:File = event.target.files[0];

  if (file) {

      
      const formData: any = new FormData();
      this.fileName2 = file.name;
      formData.append("kbis", file);
      formData.append("siret", this.societe.siret);
      formData.append("siren", this.societe.siren);
      formData.append("nom", this.societe.denomination);
      formData.append("adresse", this.societe.adresse);
      formData.append("password", this.societe.password);
      formData.append("email", this.societe.email);
      formData.append("nomdirigeant", this.societe.nom);
      formData.append("prenomdirigeant", this.societe.prenom);
      this.postDatas(formData)
      this.documents.updateKbis(this.transData).subscribe((v)=>{
        this.societe.Kbis = this.logincom.societe.Kbis
      })
      
      
    
  }
}
getDoc(siret: string) {
  this.renderDoc = []
  this.documents.getDoc(siret).subscribe((v: any)=>{
    for (var i = 0; i< v.length;i++) {
      this.renderDoc.push(v[i]);
    }
    
  })
  }

  createFacture() {
    this.facture? this.facture = false: this.facture = true
  }

  confirmArticle() {
    var facture = document.getElementById('facture')
    var facturecontainer = document.getElementById('facturecontainer')
    for (var i = 0; i< this.items.length; i ++) {
      if (facture.childElementCount >1 ){
        facture.removeChild(facture.lastChild)
      }
      if (facturecontainer.childElementCount > 8) {
        
        facturecontainer.removeChild(facturecontainer.lastChild)
      }
    }
    this.items.push(this.item)
    this.item = {designation: '', quantite: '',unite: '', prix: '',tva: ''}
    this.cart = true
    for (var i = 0; i< this.items.length; i++) {
      var row = document.createElement('tr')
    facture.appendChild(row)
    var designation = row.appendChild(document.createElement('td'))
    designation.innerHTML = this.items[i].designation
    var quantite = row.appendChild(document.createElement('td'))
    quantite.innerHTML = this.items[i].quantite
    var unite = row.appendChild(document.createElement('td'))
    unite.innerHTML = this.items[i].unite
    var prix = row.appendChild(document.createElement('td'))
    prix.innerHTML = this.items[i].prix
    var prixttc = row.appendChild(document.createElement('td'))
    prixttc.innerHTML = (parseInt(this.items[i].prix)+parseInt((this.items[i].prix))*parseInt((this.items[i].tva))/100).toString()
    var tva = row.appendChild(document.createElement('td'))
    if ((this.items[i].tva === 0)&&(this.profile.TVAna === "NA")){
      tva.innerHTML = "N.A"
    }
    else if((this.items[i].tva === 0)&&(this.profile.TVAna === "autoliquid")) {
      tva.innerHTML = "autoliquidation"
    }
    else if (this.items[i].tva !== 0){
      tva.innerHTML = this.items[i].tva
    }
    }
    this.erase = true
    this.articlesNumber ++
    if (this.articlesNumber > 19) {this.multiFacture = true}
  }
  deleteItem(article: any) {
    for (var i = 0; i< this.items.length; i++) {
      if (article.designation === this.items[i].designation) {
        this.items.splice(i,1)
      }
    }
    var facture = document.getElementById('facture')
    this.articlesNumber --
    for (var i = 0; i< (this.items.length+1); i ++) {
      facture.removeChild(facture.lastChild)
    }
    this.item = {designation: '', quantite: '', unite: '', prix: '',tva: ''}
    this.cart = true
    for (var i = 0; i< this.items.length; i++) {
      var row = document.createElement('tr')
    facture.appendChild(row)
    row.appendChild(document.createElement('td'))
    var designation = row.appendChild(document.createElement('td'))
    designation.innerHTML = this.items[i].designation
    var quantite = row.appendChild(document.createElement('td'))
    quantite.innerHTML = this.items[i].quantite
    var prix = row.appendChild(document.createElement('td'))
    prix.innerHTML = this.items[i].prix
    var prixttc = row.appendChild(document.createElement('td'))
    prixttc.innerHTML = (parseInt(this.items[i].prix)+parseInt((this.items[i].prix))*parseInt((this.items[i].tva))/100).toString()
    var tva = row.appendChild(document.createElement('td'))
    tva.innerHTML = this.items[i].tva
    }
  }
  addPage() {
    this.facturation.getBillToNumber(this.societe.email).subscribe((v: any)=> {
    var facture = document.getElementById('total')
    for (var i = 0; i < this.items.length; i++) {
      this.totalHT +=(this.items[i].quantite*this.items[i].prix)
      this.totalTTC +=(this.items[i].quantite*this.items[i].prix)+(((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite))
      switch(this.items[i].tva.toString()) {
        case  "2.1":
          this.tva21+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)
          break
        case "5.5":
          this.tva55+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)
          break
        case "10":
          this.tva10+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)
          break
        case "20":
          this.tva20+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)

      }
    }
    var row = document.createElement('tr')
    facture.appendChild(row)
    var numFac = row.appendChild(document.createElement('td'))
    this.facturation.checkFacture(this.numerofacture).subscribe((v:any)=> {
    if (v === null) {numFac.innerHTML = this.numerofacture.toString()
    this.page ++
    this.page === 2?this.exportHtmlToPDF(false,true) : this.exportHtmlToPDF(false, false)
    var facture = document.getElementById('facture')
    for (var i = 0; i< (this.items.length); i ++) {
      facture.removeChild(facture.lastChild)
    }
      this.items = []
      }
      else {alert("numero de facture invalide")}
    })
  })
  }
  finishBill() {
    this.renseignements = true
    this.facturation.getBillToNumber(this.societe.email).subscribe((v: any)=> {
      
    var facture = document.getElementById('total')
    var prixUnitaireHT
    for (var i = 0; i < this.items.length; i++) {
      this.totalHT +=(this.items[i].quantite*this.items[i].prix)
      this.totalTTC +=(this.items[i].quantite*this.items[i].prix)+(((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite))
      switch(this.items[i].tva.toString()) {
        case  "2.1":
          this.tva21+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)
          break
        case "5.5":
          this.tva55+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)
          break
        case "10":
          this.tva10+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)
          break
        case "20":
          this.tva20+= ((this.items[i].prix)*(this.items[i].tva)/100)*(this.items[i].quantite)

      }
    }
    if (facture.childElementCount >9 ) {
      facture.removeChild(facture.lastChild)
    }
    var row = document.createElement('tr')
    facture.appendChild(row)
    var numFac = row.appendChild(document.createElement('td'))
    this.facturation.checkFacture(this.numerofacture).subscribe((v:any)=> { 
      if (v[0] === undefined) {numFac.innerHTML = this.numerofacture.toString() 
    
    
    this.numeroFinal = parseInt(numFac.innerHTML)
    var TVA = row.appendChild(document.createElement('td'))
    TVA.innerHTML = (this.totalTTC - this.totalHT).toFixed(2).toString()
    var date = row.appendChild(document.createElement('td'))
    date.innerHTML = this.date.toLocaleDateString('fr-FR')
    var totalht = row.appendChild(document.createElement('td'))
    totalht.innerHTML = this.totalHT.toFixed(2).toString()
    var totalttc = row.appendChild(document.createElement('td'))
    totalttc.innerHTML = this.totalTTC.toFixed(2).toString()
    var tva55 = row.appendChild(document.createElement('td'))
    tva55.innerHTML = this.tva55.toFixed(2).toString()
    var tva10 = row.appendChild(document.createElement('td'))
    tva10.innerHTML = this.tva10.toFixed(2).toString()
    var tva20 = row.appendChild(document.createElement('td'))
    tva20.innerHTML = this.tva20.toFixed(2).toString()
    var tva21 = row.appendChild(document.createElement('td'))
    tva21.innerHTML = this.tva21.toFixed(2).toString()
    this.bill = true
    this.erase = false
    this.selected === "option1" ? this.profile.societeOrComm = 'B': this.profile.societeOrComm = 'A'
    if (this.profile.ville !== undefined){
      this.societe.rcs = 'RCS' + " " + this.profile.ville + " " + this.profile.societeOrComm + " " + this.societe.siren

    }
    this.articlesNumber = 0
    
    this.page !== 1?this.exportHtmlToPDF(true, false): this.exportHtmlToPDF(true, true)
    this.page = 1
      }
      else {
        alert("numero de facture invalide")
        console.log(v)
      }
    })
  })
  }
  
  exportHtmlToPDF(finish: boolean, firstPage: any) {
    let data = document.getElementById('facturecontainer')
    html2canvas(data).then(canvas =>{
      let docWidth = 208
      let docHeight = canvas.height*docWidth/canvas.width
      const contentDataURL = canvas.toDataURL('image/png')
          if (firstPage === true) {
            this.doc = new jsPDF('p', 'mm', 'a4')
            
          }
          let position = 0;
          this.doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          if (!finish) {
            this.doc.addPage()
          }
          
          if (finish) {
            
            this.doc.save('facture.pdf');
            var blob = this.doc.output('blob')
            var formData = new FormData();
            formData.append('pdf', blob);
            formData.append('siret', this.societe.siret)
            formData.append('email', this.societe.email)
            formData.append('numero', (this.numeroFinal).toString())
            this.documents.uploadBill(formData).subscribe((v: any)=> {
              this.documents.getBill(this.societe.email).subscribe((v: any) =>{
                this.bill = false
                this.factures = []
                for (var i = 0;i <v.length; i++) {
                  this.factures.push(v[i])
                } 
              })
            }) 
          }
        this.facture = false
    })
    //this.exportTableToXLSX()
    
  
  }

  /*exportTableToXLSX() {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(document.getElementById('facture'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    
    XLSX.writeFile(wb,'SheetJS.xlsx');
    this.router.navigateByUrl('/espace')
    
    

  }*/

  disconnect() {
    this.logincom.token = ''
    this.route.navigateByUrl('/')
  }
  creerClient(client: any, factureSiret: any) {
    this.facturation.creerClient(client,factureSiret).subscribe((v: any)=> {
      this.getClient()
      this.clientForm()

    })
  }

  clientForm() {
    this.existClient? this.existClient = false: this.existClient = true
  }
  getClient() {
    this.facturation.getClient(this.societe.email).subscribe((v: any)=>{
      this.clients = []
      for (var i = 0;i < v.length; i++) {
        this.clients.push(v[i])
      }
      console.log(v)
    })
  }
  chooseClient(client: any) {
    this.client = client
  }
  reorderDoc() {
    this.renderDoc.sort((a: any, b: any) => {
      return a.nom < b.nom;
  });
  }
  reorderFac() {
    this.factures.sort((a: any, b: any) => {
      return a.numero > b.numero;
  });
}
  saveProfile() {
    this.profile.nom = prompt('enter your profile name')
    this.facturation.saveProfil(this.profile, this.societe.email).subscribe((v:any)=>{
      
    })

  }
  chooseProfile(profile: Profil) {
    this.profile = profile
  }

  addBillPage() {
    this.billPageNumber ++
  }
  advancedMenu() {
    document.getElementsByClassName('avancemenutoggle')[0] !== undefined ? document.getElementsByClassName('avancemenutoggle')[0].classList.remove('avancemenutoggle'): document.getElementById('toggle').classList.add('avancemenutoggle')
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
