import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class GlobalfunctionService {

  constructor(public toastController: ToastController) { }

  async simpleToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color : 'dark',
      position: 'top',
    });
    toast.present();
  }

  async optionToast(header , msg , color) {
    const toast = await this.toastController.create({
      header,
      message: msg,
      color,
      position: 'top',
      showCloseButton : true,
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      header : 'Error 404',
      message: 'Something Went Wrong ! Please Try Again Later !',
      position : 'top',
      color : 'warning',
      duration: 3000
    });
    toast.present();
  }
}
