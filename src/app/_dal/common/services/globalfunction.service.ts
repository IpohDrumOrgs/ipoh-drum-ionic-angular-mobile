import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class GlobalfunctionService {

  constructor(public toastController: ToastController) { }

  async simpleToast(header, msg, color) {
    const toast = await this.toastController.create({
      header,
      message: msg,
      duration: 3000,
      color,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }

  async optionToast(header , msg , color) {
    const toast = await this.toastController.create({
      header,
      message: msg,
      color,
      position: 'top',
      showCloseButton : true
    });
    toast.present();
  }
}
