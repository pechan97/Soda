import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire  } from 'angularfire2';
import { AlertController } from 'ionic-angular';


/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  users: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public database: AngularFire,
    public alertCtrl: AlertController
  ) {
    this.users = database.database.list('users/');

  }

  doAdmin(user,value){
    this.users.update(user.$key, {
      admin: value
    });
    /*
    let alert = this.alertCtrl.create({
      message: 'ITEM ' + value + 'user ' + user.$key,
      buttons: [
        {
          text: "Ok"
        }
      ]
    });
    alert.present();
    */
  }

}
