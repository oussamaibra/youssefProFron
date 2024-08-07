import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { BodyComponent } from './modules/employee/components/body/body.component';
import { SidenavComponent } from './modules/employee/components/sidenav/sidenav.component';
import { EmployeeModule } from './modules/employee/employee.module';
import { HeaderComponent } from './modules/employee/components/header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ProfileComponent } from './profile/profile.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    EmployeeModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables()),
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     lang: 'en',
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '392241960634-ujof3ugg5kqkugqequdmec4ke67fdme3.apps.googleusercontent.com'
    //         ),
    //       },
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     },
    //   } as SocialAuthServiceConfig,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
