import { NgModule } from '@angular/core';
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






@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    OCRComponent,
    LoginComponent,
    SanitizerPipe,
    RgpdComponent,
    AdminComponent,
    EspaceClientComponent
    
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
    MatCheckboxModule
  ],
  providers: [AnalyticsService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
