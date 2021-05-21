import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Weather7Provider {

  weatherApiKey: string = "ff15d8a9ea4201a4ba978d2e14faf469";
  longitude: number;
  latitude: number;
  unitType: string;

  constructor(public http: HttpClient) {
  }

  //Function called by home.ts and sets variables for use in API request.
  setData(lon: number, lat: number, units: string) {
    this.longitude = lon;
    this.latitude = lat;
    this.unitType = units;
  }

  //A function to request data from the weatherAPI. Returns an observable.
  getWeather7Day(): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + this.latitude + "&lon=" + this.longitude + "&units=" + this.unitType + "&appid=" + this.weatherApiKey);
  }

}
