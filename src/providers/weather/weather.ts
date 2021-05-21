import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherProvider {

  cityName: string;
  unitType: string;
  weatherApiKey: string = "ff15d8a9ea4201a4ba978d2e14faf469";

  constructor(public http: HttpClient) {
  }

  //Function called by home.ts and sets variables for use in API request.
  setData(cityName: string, unitType: string) {
    this.cityName = cityName;
    this.unitType = unitType;
  }

  //A function to request data from the weatherAPI. Returns an observable
  getWeather(): Observable<any> {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + this.cityName + "&units=" + this.unitType + "&appid=" + this.weatherApiKey);
  }
}
