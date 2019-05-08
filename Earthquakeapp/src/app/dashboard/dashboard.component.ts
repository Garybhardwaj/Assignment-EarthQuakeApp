import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GeoService } from '../Services/geo.service'
import { Observable } from 'rxjs'
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import * as Leaf from 'leafLet';
import { EQApiResponse } from '../Models/EQApiResponse'

// Dashboard component for displaying List and map view of features and properties of EarthQuake Data
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public layersControl: any;
  public leafletoptions: any;
  private streetMapLayer: any;
  private cycleMapLayer: any;
  private leafletMap: Leaf.Map;
  public noDataMessage: boolean = false;
  private GeoMarkersLayers = new Leaf.LayerGroup([]);
  onMapReady: any
  public ListofResobj: EQApiResponse[] = [];
  private geoMarkers: Leaf.Marker[] = [];
  constructor(private geoService: GeoService) {
    // This service is called to fetch Geo Data from API and below we bind the incoming data to List and Map 
    this.geoService.fetchGeoData().subscribe(res => {

      if (res && res.features) {
        this.noDataMessage = false;
        res.features.forEach(element => {
          let EQobj: EQApiResponse = {
            place: element.properties.place,
            type: element.properties.type,
            time: new Date(element.properties.time),
            magnitude: element.properties.mag,
            // Following line to bind the coordinates to Lat,Lang of the Place
            location: [Number(element.geometry.coordinates[1]), Number(element.geometry.coordinates[0])]
          }
          this.ListofResobj.push(EQobj)
          let location = EQobj.location as Leaf.LatLngExpression
          // This code is to add Marker of locations on Map
          this.GeoMarkersLayers.addLayer(Leaf.marker(location, {
            icon: Leaf.icon({
              iconSize: [20, 31],
              iconAnchor: [13, 41],
              iconUrl: 'assets/marker-icon.png'
            }), riseOnHover: true, title: EQobj.place + " , Magnitude  " + EQobj.magnitude
          }))
        }
        );

      }
      else {
        this.noDataMessage = true;
      }// Following code shows the error message if there is some error from API end
    }, (error) => {
      this.noDataMessage = true;
      console.log("Error occured while fetching data from API", error);
      ;
    })
  }
  ngOnInit() {

    this.streetMapLayer = Leaf.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      detectRetina: true
    })
    this.cycleMapLayer = Leaf.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      detectRetina: true
    })
    // Below code gives default configuration to the map
    this.leafletoptions = {
      layers: [
        this.streetMapLayer, this.cycleMapLayer

      ],

      zoom: 2,
      center: Leaf.latLng(38.954027, -88.626217)
    };
    // Below code provides the Street and cycle layers to the map
    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.streetMapLayer,
        'Open Cycle Map': this.cycleMapLayer
      }

    }
    // Below code responsible for adding markers to the map on loading of map
    this.onMapReady = (map: Leaf.Map) => {

      this.leafletMap = map;
      console.log(this.GeoMarkersLayers)
      if (this.GeoMarkersLayers)
        this.leafletMap.addLayer(this.GeoMarkersLayers);


    }
  }
  /* This method provides functionality of clicking list item from left side bar ,
  takes selected item as input and flies map to the particular marker on map*/
  selectFeature(res: EQApiResponse) {
    console.log(res);
    this.leafletMap.flyTo(res.location, 8)
  }

}
