import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFire  } from 'angularfire2';

/*
  Generated class for the PeriodCrud page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-period-crud-ionic',
  templateUrl: 'period-crud.html'
})
export class PeriodCrudPage {
public userData: any;
testRadioOpen: boolean;
//products: Array<{default_product: string,description: string,id: string,price: string}>;
//products: any;
  start_date: string;
  end_date: string;
  public fireAuth: any;
  pages: Array<{ title: string, component: any }>;
  periods: FirebaseListObservable<any>;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public alertCtrl: AlertController,
  	public database: AngularFire
  	) {
  	this.periods = database.database.list('period/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeriodCrudPage');
  }

  addPeriod(event){      
        if (!this.start_date || !this.end_date) {
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
    this.periods.push({
      active:false,
    	end_date: this.end_date,
    	start_date: this.start_date
    })
    let alert = this.alertCtrl.create({
        message: 'Successfully Created',
        buttons: [
          {
            text: "Ok",
          }
        ]
      });
      alert.present();
}
this.start_date="";
  this.end_date="";
}
editPeriod(period){
    let promp = this.alertCtrl.create({
    title: 'Edit Period',
    message: 'Enter the information',
    inputs: [
      {
        name: 'End_Date',
        value: period.end_date
      },
      {
        name: 'Start_Date',
        value: period.start_date
      }
      ],
      buttons: [
      {
          text: 'Cancel'
      },
      {
        text: 'Edit Period',
        handler: data => {
          let newEnd_date:string = data.End_Date;
          let newStart_date:string =data.Start_Date;
          if (data.End_Date != '' && data.Start_Date != '') {
            this.periods.update(period.$key,
            {
              end_date: newEnd_date,
              start_date: newStart_date
            })
          } else {
            let alert = this.alertCtrl.create({
              message: 'Please complete all fields',
              buttons: [
                {
                  text: "Ok"
                }
              ]
            });

            alert.present();          
    }
      }
    }
    ]
  });
  promp.present();
}

deletePeriod(periodId){
this.periods.remove(periodId);
}
  doActive(periodos,value){    
      this.periods.update(periodos.$key, {
      active:value
    });    
        this.periods.subscribe(items=>{
      items.forEach(item =>{
        if(item.$key !=periodos.$key) {
          this.periods.update( item.$key,
        {
         active:false
        })
        }     
      })
    })
 }

}