import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

/* ng2-translate */
import { TranslateService } from 'ng2-translate';
/* pages */
import { LoginPage } from '../pages/login/login';




@Component({
  //templateUrl: 'app.html'
  template: '<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;
  
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.setUpTranslate();
    });
  }

  setUpTranslate() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

}
