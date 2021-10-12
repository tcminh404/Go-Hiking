import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from 'src/models/location';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  @Input() locations: Location[]

  map: any

  private platform: any;

  @ViewChild("map")
  public mapElement: ElementRef;

  public constructor() {
    this.platform = new H.service.Platform({
      "apikey": environment.here_map
    });
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    let lat = 0, lng = 0;
    this.locations.map(data => {
      lat += data.lat
      lng += data.lng
    })
    lat = (lat / this.locations.length)
    lng = (lng / this.locations.length)
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 8,
        center: { lat: lat, lng: lng }
      }
    );
    let mapEvents = new H.mapevents.MapEvents(this.map);
    new H.mapevents.Behavior(mapEvents);
    let ui = H.ui.UI.createDefault(this.map, defaultLayers);
    this.addMarkersToMap(this.map)
  }

  ngOnChanges(): void {
    if (this.map) {
      this.map.removeObjects(this.map.getObjects())
      this.addMarkersToMap(this.map)
      let lat = 0, lng = 0;
      this.locations.map(data => {
        lat += data.lat
        lng += data.lng
      })
      this.map.setCenter({ lat: lat, lng: lng })
    }
  }

  addMarkersToMap(map) {
    this.locations.map(data => {
      let marker = new H.map.Marker({ lat: data.lat, lng: data.lng });
      //marker.setTitle(data.address);
      map.addObject(marker)
    })
  }
}
