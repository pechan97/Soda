import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';
/* ng2-translate */
import { TranslateService } from 'ng2-translate';
/* pages */
import { LoginPage } from '../login/login';
import { CompanyValuesPage } from '../company-values/company-values';
import { TeamPage } from '../team/team';
import { ProductsPage } from '../products/products';
import { AdminPage } from '../admin/admin';
import { PeriodCrudPage } from '../period-crud/period-crud';

import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { FirebaseListObservable, AngularFire  } from 'angularfire2';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home-ionic',
  templateUrl: 'home.html'
})

export class HomePage {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = CompanyValuesPage;
  public fireAuth: any;
  users: FirebaseListObservable<any>;
  //users: any;
	pages: Array<{title: string, component: any}>;
  //datos: Array<{name: string, email: any}>;;
  //user:any;
  //agencyID: any[] = [];

  	constructor(
  		public menu: MenuController,
      public translate: TranslateService,
      public navCtrl: NavController,
      public database: AngularFire,
      public alertm: AlertController
  	) {
          this.fireAuth = firebase.auth();
  /*
  		this.pages = [
      		{ title: this.translate.get('menu.company-values')['value'], component: CompanyValuesPage },
          { title: this.translate.get('menu.team')['value'], component: TeamPage },
          { title: this.translate.get('menu.logout')['value'], component: LoginPage },
      		{ title: this.translate.get('Products')['value'], component: ProductsPage }
    	];
*/
      firebase.auth().onAuthStateChanged(function(user) {
      //if (!user) {
        console.log('Hello AuthService Provider FIREBASE', user);


        //navCtrl.setRoot(LoginPage);


        //Para obtener los datos de usuario
        /*
          var user = firebase.auth().currentUser;
          var name, email, photoUrl, uid;

          if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
          }
        */

      //}
    });

/*
    this.users = database.database.list('users/');

    //this.datos = this.users.forEach.length;

    this.users.subscribe(items => {
    // items is an array
    items.forEach(item => {
        console.log('Item:', item.email);
        this.agencyID.push(item.email);
        if(this.agencyID.indexOf("salasch97@gmail.com") != -1){
          console.log("FOR ESTA" );
        } else {
          console.log("FOR NO ESTA" );
        }
    });
});


    console.log("users: " + this.users);
    alert(firebase.auth().currentUser.providerData[0].displayName);
*/
/*
    this.users.push({
      email: firebase.auth().currentUser.email,
      name: 'Juan'
    });*/
/*
    var datos;
    var starCountRef = firebase.database().ref('users/');
     starCountRef.on('value', function(snapshot) {
      datos = snapshot.val();
      //return datos;
    //  debugger;

        for (let dato of datos) {
            console.log(dato.email);
        }

      let alert = alertm.create({
        message: 'USERS ' + 'DATOS:'+ datos + "?"+ datos.name + " " + datos.email,
        buttons: [
          {
            text: "Ok"
          }
        ]
      });
      alert.present();
});*/


var ref = firebase.database().ref("users");

/*ref.orderByChild("email").equalTo(firebase.auth().currentUser.email).once('value').then(function (snapshot) {*/
/*Para registrar usuarios*/
ref.orderByChild("email").equalTo(firebase.auth().currentUser.email).once('value').then(function (snapshot) {

  //console.log(snapshot.key + 'd '+ d.name);
  if (!snapshot.val()) {
    console.log('NO ESTAAAAA');

    ref.push({
      email: firebase.auth().currentUser.email,
      name: firebase.auth().currentUser.providerData[0].displayName,
      admin: false
    });
  } else {
    console.log('ESTA');
  }
});

/*Para ver si el usuaro es admmin*/

this.users = database.database.list('users/');
var found = false;
this.users.subscribe(items => {
    items.forEach(item => {
      if (!found) {
        if (item.email == firebase.auth().currentUser.email && item.admin) {
            this.pages = [
                { title: this.translate.get('menu.company-values')['value'], component: CompanyValuesPage },
                { title: this.translate.get('menu.team')['value'], component: TeamPage },
                { title: this.translate.get('menu.logout')['value'], component: LoginPage },
                { title: this.translate.get('Products')['value'], component: ProductsPage },
                { title: this.translate.get('Admin')['value'], component: AdminPage },
                { title: this.translate.get('PeriodCrud')['value'], component: PeriodCrudPage }
            ];
            found = true;
        } else {
            this.pages = [
                { title: this.translate.get('menu.company-values')['value'], component: CompanyValuesPage },
                { title: this.translate.get('menu.team')['value'], component: TeamPage },
                { title: this.translate.get('menu.logout')['value'], component: LoginPage }
            ];
        }
      }
    });
});

  	}



  	openPage(page) {
    	this.menu.close();
    	this.nav.setRoot(page.component);
  	}

    logout() {
      this.fireAuth.signOut();
      //this.authService.doLogout();
      this.navCtrl.setRoot(LoginPage);
    }
}
