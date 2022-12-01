import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  public admin = {nom: "", prenom: "" , email: "", telephone:""}

  constructor() { }

  ngOnInit(): void {
  }

}
