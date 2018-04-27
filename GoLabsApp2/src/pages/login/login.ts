import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

import firebase from 'firebase';
import { TranslateService } from 'ng2-translate';



@Component({
  selector: 'page-login-ionic',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  public fireAuth: any;
  pages: Array<{ title: string, component: any }>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService
  ) {

    this.fireAuth = firebase.auth();
  }





  loginUser(event) {
    debugger;

    if (!this.email || !this.password) {
      let alert = this.alertCtrl.create({
        message: 'Please complete all fields',
        buttons: [
          {
            text: "Ok"
          }
        ]
      });
      alert.present();

    } else {
      this.fireAuth.signInWithEmailAndPassword(this.email, this.password);
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present(loading);

      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.push(HomePage);
      }, 2000);

    }
  }

  loginGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    let navCtrl = this.navCtrl;
    let alertCtrl = this.alertCtrl;
    firebase.auth().signInWithPopup(provider).then(function(result) {

      // This gives you a Google Access Token. You can use it to access the Google API.

      //var token = result.user.providerId;

      // The signed-in user info.
      var user = result.user;

      // ...

      var email = user.email

      var userName = user.displayName;
      navCtrl.setRoot(LoginPage);
      navCtrl.setRoot(HomePage);

      let alert = alertCtrl.create({
        message: 'Welcome',
        buttons: [
          {
            text: "Ok",
          }
        ]
      });
      alert.present();


      //return resultado = user;
      //return true;
      console.log('email ' + email + 'user ' + userName);
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here. (!!!!!da error¡¡¡¡)
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      // ...
    });


    /*
  //  this.authService.goolgleLogin();
    this.authService.goolgleLogin().then(AuthService => {
      //success, redirect
      //this.navCtrl.push(HomePage);
      this.navCtrl.setRoot(LoginPage);
      this.navCtrl.setRoot(HomePage);

      let alert = this.alertCtrl.create({
        message: 'Welcome',
        buttons: [
          {
            text: "Ok",
          }
        ]
      });
      alert.present();

    }), error => {
      this.loading.dismiss().catch(() => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'Cancel'
            }
          ]
        });
        alert.present();
      });
    }
    */
  }

  openPage(page) {
    //this.menu.close();
    this.navCtrl.setRoot(page.component);
  }

  doLogin(event) {
    this.navCtrl.push(HomePage);
  }

}
