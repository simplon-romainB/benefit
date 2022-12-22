import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { EspaceClientComponent } from './espace-client/espace-client.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { TarifsComponent } from './tarifs/tarifs.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent },
                        { path: 'login', component: LoginComponent},
                        { path: 'espace', component: EspaceClientComponent},
                        { path: 'rgpd', component: RgpdComponent},
                        { path: 'admin', component: AdminComponent},
                        { path: 'admindetails', component: AdmindetailsComponent},
                        { path: 'home', component: HomeComponent},
                        { path: 'tarifs', component: TarifsComponent},
                        { path: '', redirectTo: 'home', pathMatch: 'full'}
                        


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
