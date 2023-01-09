import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { ContactComponent } from './contact/contact.component';
import { EspaceClientComponent } from './espace-client/espace-client.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { TarifsComponent } from './tarifs/tarifs.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent },
                        { path: 'login', component: LoginComponent},
                        { path: 'espace', component: EspaceClientComponent},
                        { path: 'rgpd', component: RgpdComponent},
                        { path: 'admin', component: AdminComponent},
                        { path: 'admindetails', component: AdmindetailsComponent},
                        { path: 'home', component: HomeComponent},
                        { path: 'tarifs', component: TarifsComponent},
                        { path: '', redirectTo: 'home', pathMatch: 'full'},
                        { path: 'fonctions', component: FonctionsComponent},
                        { path: 'contact', component: ContactComponent},
                        { path: "solutions", component: SolutionsComponent}

                        


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
