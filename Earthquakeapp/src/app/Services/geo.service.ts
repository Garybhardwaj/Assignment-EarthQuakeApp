import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {ApiPath} from '../Constants/Constants'
@Injectable({
  providedIn: 'root'
})
// This service is injected at root level so available to all components and services in app.
export class GeoService {

  constructor(private httpClient:HttpClient) { }
// This method is calling the API path given to fetch data for Dashboard
  public fetchGeoData():Observable<any>{
   return this.httpClient.get(ApiPath);
  }
}
