import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { MyApp } from './app.component';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


import firebase from 'firebase';

/* pages */
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CompanyValuesPage } from '../pages/company-values/company-values';
import { TeamPage } from '../pages/team/team';
import { ProductsPage } from '../pages/products/products';
import { AdminPage } from '../pages/admin/admin';
import { PeriodCrudPage } from '../pages/period-crud/period-crud';


export const firebaseConfig = {
  apiKey: "AIzaSyD20dibw14K2EWAky3Gcs_YuYawH8kFejI",
  authDomain: "golabsapp.firebaseapp.com",
  databaseURL: "https://golabsapp.firebaseio.com",
  storageBucket: "golabsapp.appspot.com",
  messagingSenderId: "774717930050"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

firebase.initializeApp(firebaseConfig);

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    CompanyValuesPage,
    TeamPage,
    ProductsPage,
    AdminPage,
    PeriodCrudPage
  ],
  imports:[
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    CompanyValuesPage,
    TeamPage,
    ProductsPage,
    AdminPage,
    PeriodCrudPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
