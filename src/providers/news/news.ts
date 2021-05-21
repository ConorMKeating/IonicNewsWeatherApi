import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NewsProvider {

  countryID: string;
  newsApiKey: string = "94f46612d7d54fd1a01ad3b22676f1a3";

  constructor(public http: HttpClient) {
  }

  //Function called by home.ts and sets variables for use in API request.
  setData(countryID: string) {
    this.countryID = countryID;
  }

  //A function to request data from the weatherAPI. Returns an observable.
  getNews(): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?country=" + this.countryID + "&pageSize=5&apiKey=" + this.newsApiKey);
  }
}
