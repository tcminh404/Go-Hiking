import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
  @Output() pickLocation = new EventEmitter<any>()

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
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 0,
        center: { lat: 0, lng: 0 }
      }
    );
    let mapEvents = new H.mapevents.MapEvents(this.map);
    new H.mapevents.Behavior(mapEvents);
    let ui = H.ui.UI.createDefault(this.map, defaultLayers);
    this.setUpClickListener(this.map)
    if (this.locations && this.locations.length > 0) {
      this.addMarkersToMap(this.map)
    }
  }

  setUpClickListener(map) {
    map.addEventListener('tap', (evt) => {
      var coord = map.screenToGeo(evt.currentPointer.viewportX,
        evt.currentPointer.viewportY);
      this.pickLocation.emit({
        lat: coord.lat,
        lng: coord.lng
      })
    });
  }



  ngOnChanges(): void {
    if (this.map && this.locations && this.locations.length > 0) {
      this.map.removeObjects(this.map.getObjects())
      this.addMarkersToMap(this.map)
    }
  }

  addMarkersToMap(map) {
    let group = new H.map.Group();
    this.locations.map(data => {
      let marker = new H.map.Marker({ lat: data.lat, lng: data.lng });
      //marker.setTitle(data.address);
      group.addObject(marker)
    })
    map.addObject(group)
    map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox()
    });
  }
}
