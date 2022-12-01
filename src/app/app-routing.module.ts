import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceClientComponent } from './espace-client/espace-client.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RgpdComponent } from './rgpd/rgpd.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent },
                        { path: 'login', component: LoginComponent},
                        { path: 'espace', component: EspaceClientComponent},
                        { path: 'rgpd', component: RgpdComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
