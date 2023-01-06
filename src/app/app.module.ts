import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { RegisterComponent } from './register/register.component'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { OCRComponent } from './ocr/ocr.component';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { EspaceClientComponent } from './espace-client/espace-client.component'; 
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizerPipe } from './sanitizer.pipe';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { AnalyticsService } from './analyticsservice.service';
import { RgpdComponent } from './rgpd/rgpd.component';
import { CookieService } from 'ngx-cookie-service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AdminComponent } from './admin/admin.component';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { SwiperModule } from 'swiper/angular';
import {MatCardModule} from '@angular/material/card';
import { TarifsComponent } from './tarifs/tarifs.component';
import { CarouselModule } from 'ngx-acuw';
import { ImageTransitionModule } from 'ngx-acuw';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceWorkerModule } from '@angular/service-worker';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    OCRComponent,
    LoginComponent,
    SanitizerPipe,
    RgpdComponent,
    AdminComponent,
    EspaceClientComponent,
    AdmindetailsComponent,
    HomeComponent,
    TarifsComponent,
    FonctionsComponent,
    ContactComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatProgressBarModule,
    MatMenuModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    NgxGoogleAnalyticsModule.forRoot('MEASUREMENT-ID'),
    NgxGoogleAnalyticsRouterModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatExpansionModule,
    MatSidenavModule,
    SwiperModule,
    MatCardModule,
    CarouselModule,
    ImageTransitionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    
  ],
  providers: [AnalyticsService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
