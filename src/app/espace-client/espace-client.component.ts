import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analyticsservice.service';
import { DocumentsService } from '../documents.service';
import { LoginService } from '../login.service';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver'; 
import {  WorkBook, read, utils, write, readFile } from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { FacturationService } from '../facturation.service';



@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.sass']
})
export class EspaceClientComponent implements OnInit {
  public societe = {siret: '', siren: '',denomination: '', adresse: '', email: '',Kbis: '', role: '' , isActivate: '', nom: '', prenom:'', password: '', passwordconfirm: ''}
  public eightValidate: boolean =false
  public majValidate: boolean = false
  public minValidate: boolean = false
  public specValidate: boolean = false
  private special = /[^A-z\s\d][\\\^]?/g
  private min = /[a-z]/gm
  private maj = /[A-Z]/gm
  private num = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g
  public passConfirmed = false;
  public registerReady = false;
  public transData: any = new FormData();
  public fileName:string
  public fileName2: string
  public renderDoc: any = []
  public numeroFacture = (Math.random()*10000000)
  public facture = false;
  public items: any = []
  public item = {designation: '', quantite: '', prix: '',tva: ''}
  public date = new Date(Date.now())
  public tempBill: any = {}
  public factureForm = false
  private designation = false
  private quantite = false
  private prix = false
  private tva = false
  public cart = false
  public bill = false
  public existClient = false
  public client = {nom: '', prenom: '', adresse: '', email: '', telephone: '', denomination: ''}
  
  
  constructor(public facturation: FacturationService,public logincom: LoginService, public documents: DocumentsService, private analytics: AnalyticsService, public route : Router) {
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
    console.log(this.registerReady)
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
    var row = document.createElement('tr')
    facture.appendChild(row)
    row.appendChild(document.createElement('td'))
    var designation = row.appendChild(document.createElement('td'))
    designation.innerHTML = this.item.designation
    var quantite = row.appendChild(document.createElement('td'))
    quantite.innerHTML = this.item.quantite
    var prix = row.appendChild(document.createElement('td'))
    prix.innerHTML = this.item.prix
    var prixttc = row.appendChild(document.createElement('td'))
    prixttc.innerHTML = (parseInt(this.item.prix)*(eval("1." + this.item.tva))).toFixed(2).toString()
    var tva = row.appendChild(document.createElement('td'))
    tva.innerHTML = this.item.tva
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    this.items.push(this.item)
    console.log(this.items)
    this.item = {designation: '', quantite: '', prix: '',tva: ''}
    this.cart = true
    
    

  }
  

  finishBill() {
    
    var facture = document.getElementById('facture')
    var totalTTC = 0
    var totalHT = 0
    var prixUnitaireHT
    for (var i = 0; i < this.items.length; i++) {
      totalHT +=(this.items[i].quantite*this.items[i].prix)
      totalTTC +=(this.items[i].quantite*this.items[i].prix)*(eval("1." + this.items[i].tva))
    }
    var row = document.createElement('tr')
    facture.appendChild(row)
    var numFac = row.appendChild(document.createElement('td'))
    numFac.innerHTML = this.numeroFacture.toFixed(0).toString()
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    row.appendChild(document.createElement('td'))
    var TVA = row.appendChild(document.createElement('td'))
    TVA.innerHTML = (totalTTC - totalHT).toFixed(2).toString()
    var date = row.appendChild(document.createElement('td'))
    date.innerHTML = this.date.toLocaleDateString('fr-FR')
    var totalht = row.appendChild(document.createElement('td'))
    totalht.innerHTML = totalHT.toFixed(2).toString()
    var totalttc = row.appendChild(document.createElement('td'))
    totalttc.innerHTML = totalTTC.toFixed(2).toString()
    this.bill = true
  }
  exportHtmlToPDF() {
    let data = document.getElementById('facturecontainer')
    html2canvas(data).then(canvas =>{
      let docWidth = 208
      let docHeight = canvas.height*docWidth/canvas.width
      const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
          
          doc.save('exportedPdf.pdf');
    })
    this.exportTableToXLSX()
  }

  exportTableToXLSX() {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(document.getElementById('facture'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb,'SheetJS.xlsx');
    console.log("exported");

  }

  disconnect() {
    this.logincom.token = ''
    this.route.navigateByUrl('/')
  }
  creerClient(client: any) {
    this.facturation.creerClient(client).subscribe((v: any)=> {
      console.log(v)
    })
  }

  clientForm() {
    this.existClient? this.existClient = false: this.existClient = true
  }
}
