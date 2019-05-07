import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class GeoService {
public APIPath:string="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
  constructor(private httpClient:HttpClient) { }
// This service is calling the API path given to fetch data
  public fetchGeoData():Observable<any>{
   return this.httpClient.get(this.APIPath);
  }
}
