import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;
  units: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  //This runs each time the page is about to enter. Gets City and Units from storage.
  ionViewWillEnter() {
    this.storage.get("City")
      .then((data) => {
        this.city = data;
      })
      .catch((err) => {
        alert("Error accessing local storage!");
      });
    this.storage.get("Units")
      .then((data) => {
        this.units = data;
        if (this.units == null) {
          this.units = "metric";
          this.storage.set("Units", "metric");
        }
      })
      .catch((err) => {
        alert("Error accessing local storage!");
      });
  }

  //This function sets storage variables when save button is pressed, then pops Settings page off the stack.
  onSaveClick() {
    if ((this.city == null) || (this.city == "")) {
      this.city = "Galway";
      this.storage.set("City", this.city);
    }

    this.storage.set("City", this.city);
    this.storage.set("Units", this.units);
    this.navCtrl.pop();
  }
}
