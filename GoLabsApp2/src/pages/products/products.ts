import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFire  } from 'angularfire2';

/*
  Generated class for the Products page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-products-ionic',
  templateUrl: 'products.html'
})
export class ProductsPage {
public userData: any;
testRadioOpen: boolean;
//products: Array<{default_product: string,description: string,id: string,price: string}>;
//products: any;
products: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl: AlertController,public database: AngularFire) {
    //debugger;
    this.products = database.database.list('products/');
  }

addProduct(){
  let promp = this.alertCtrl.create({
    title: 'Add Product',
    message: 'Enter the information',
    inputs: [
      {
        name: 'Product',
        placeholder: "Product's Name"
      },
      {
        name: 'Description',
        placeholder: "Product's Description"
      },
      {
        name: 'Id',
        placeholder: "Product's Id"
      },
      {
        name: 'price',
        placeholder: "Product's Price"
      },
      {
       name: 'Product_Default',
      placeholder: "Product_Default True|False"
      }
    ],
    buttons: [
      {
          text: 'Cancel'
      },
      {
        text: 'Save Product',
        handler: data => {
          this.products.push({
            default_product: data.Product_Default,
            description: data.Description,
            id: data.Id,
            price: data.price,
            product: data.Product
          })
        }
      }
    ]
  });
  promp.present();
}

editProduct(product){
  let promp = this.alertCtrl.create({
    title: 'Edit Product',
    message: 'Enter the information',
    inputs: [
      {
        name: 'Product',
        value: product.product
      },
      {
        name: 'Description',
        value: product.description
      },
      {
        name: 'Id',
        value: product.id
      },
      {
        name: 'Price',
        value: product.price
      },
      {
        name: 'Product_Default',
      //  placeholder: product.default_product,
        value: product.default_product
      }
    ],
    buttons: [
      {
          text: 'Cancel'
      },
      {
        text: 'Edit Product',
        handler: data => {
          let newDefault:string = data.Product_Default;
          let newDescription:string = data.Description;
          let newId:string = data.Id;
          let newPrice:string = data.Price;
          let newProduct:string = data.Product;
          if (data.Product_Default != '' && data.Description != '' && data.Id != ''
          && data.Price != '' && data.Product != '') {
              this.products.update(product.$key, {
              default_product: newDefault,
              description: newDescription,
              id: newId,
              price: newPrice,
              product: newProduct
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

deleteProduct(productId){
  let promp = this.alertCtrl.create({
    title: 'Delete Product',
    buttons: [
      {
          text: 'Cancel'
      },
      {
        text: 'Delete Product',
        handler: data => {
          this.products.remove(productId);
        }
      }
    ]
  });
  promp.present();
}

updateItem(item){
  let alert = this.alertCtrl.create({
    message: 'ITEM ' + item,
    buttons: [
      {
        text: "Ok"
      }
    ]
  });
  alert.present();
}


test(){
  let promp = this.alertCtrl.create({
    title: 'Add Product',
    message: 'Enter the information',
    inputs: [
      {
        name: 'Product',
        placeholder: "Product's Name"
      },
      {
        name: 'Description',
        placeholder: "Product's Description"
      },
      {
        name: 'Id',
        placeholder: "Product's Id"
      },
      {
        name: 'price',
        placeholder: "Product's Price"
      },
      {
        name:'True',
        type: 'radio',
        label: 'True',
        value: 'true',
        checked: true
      }
    ],
    buttons: [
      {
          text: 'Cancel'
      },
      {
        text: 'Save Product',
        handler: data => {
          alert(data.True + data.Description + data.Id + data.price + data.Product);
        }
      }
    ]
  });
  promp.present();
}




}
