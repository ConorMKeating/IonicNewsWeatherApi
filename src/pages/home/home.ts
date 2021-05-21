import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';
import { NewsProvider } from '../../providers/news/news';
import { Weather7Provider } from '../../providers/weather7/weather7';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hidden: boolean;
  newsHid: boolean = true;
  weather7Hid: boolean = true;
  disabled: boolean = true;
  currentCity: string;
  currentUnits: string;
  cName: string;
  wMain: string;
  wDesc: string;
  countryID: string;
  icon: string;
  iconAddress: string;
  realTemp: number;
  feelsLike: number;
  newsNum: number;
  latitude: number;
  longitude: number;
  newsArr: any = [];
  day: any = [];

  constructor(public navCtrl: NavController, public storage: Storage, public wp: WeatherProvider, private np: NewsProvider, private wp7: Weather7Provider) {
  }

  //This lifecycle hook resets necessary variables, then fetches City and Units from memory.
  ionViewWillEnter() {
    this.cName = null;
    this.wMain = null;
    this.wDesc = null;
    this.realTemp = null;
    this.feelsLike = null;
    this.countryID = null;
    this.newsNum = null;
    this.disabled = true;
    this.hidden = false;
    this.newsHid = true;
    this.newsArr = null;
    this.icon = null;
    this.iconAddress = null;
    this.weather7Hid = true;
    this.day = null;

    this.storage.get("City")
      .then((data) => {
        if (data != null) {
          this.currentCity = data;
          this.hidden = true;
        }
      })
      .catch((err) => {
        alert("Error accessing local storage!");
      });

    this.storage.get("Units")
      .then((data) => {
        this.currentUnits = data;
      })
      .catch((err) => {
        alert("Error accessing local storage!");
      });
  }

  //This hook runs after ionViewWillEnter(), then calls weather data from api, and enables buttons if valid.
  ionViewDidEnter() {
    try {
      if (this.currentCity != null) {
        this.wp.setData(this.currentCity, this.currentUnits);
        this.wp.getWeather().subscribe(data => {
          this.cName = data.name;
          this.feelsLike = data.main.feels_like;
          this.realTemp = data.main.temp;
          this.icon = data.weather[0].icon;
          this.wMain = data.weather[0].main;              //weather is an array, so needs to be accessed like this
          this.wDesc = data.weather[0].description;
          this.countryID = data.sys.country;
          this.latitude = data.coord.lat;
          this.longitude = data.coord.lon;
          this.iconAddress = "http://openweathermap.org/img/wn/" + this.icon + "@2x.png";
          this.newsHid = true;
          this.hidden = true;

          if (this.countryID == null) {
            this.disabled = true;
          } else {
            this.disabled = false;
          }
        },
          (error) => {
            console.error('****Error detected in weather service! Check "currentCity" variable validity');
            this.cName = this.currentCity;
          });
      } else {
        this.hidden = false;
      }
    } catch (e) {
      console.log("Error", e);
    }
    if (this.wMain == null) {
      this.hidden = false;
    }
  }

  //This function gets news data from newsapi.org.
  onClickNews() {
    this.np.setData(this.countryID);
    this.np.getNews().subscribe(data => {
      this.newsArr = data.articles;
      this.newsNum = data.totalResults;
    },
      (error) => {
        console.error('****Error detected in news service! Check "countryID" variable validity');
      });
    this.newsHid = false;
  }

  //This function fetches 7day weather data from the OneCallAPI of openweathermap.org.
  onClick7Day() {
    this.wp7.setData(this.longitude, this.latitude, this.currentUnits);
    this.wp7.getWeather7Day().subscribe(data => {
      this.day = data.daily;
    },
      (error) => {
        console.error('****Error detected in weather7 service! Check longitude and latitude variable validity');
      });
    this.weather7Hid = false;
  }

  //This function pushes the Settings page onto the stack.
  openSettings() {
    this.navCtrl.push(SettingsPage);
  }

  //This function opens the news articles in a new window.
  openLink(myUrl: string) {
    window.open(myUrl, "_system");
  }

  //The following function converts the unix value received from onClick7Day() into a usable date.
  unixConverter(unix: number): Date {
    let date = new Date(unix * 1000); //*1000 because unix value returned is in milliseconds.
    return date;
  }
}
