import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {

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
    // let defaultLayers = this.platform.createDefaultLayers();
    // let map = new H.Map(
    //   this.mapElement.nativeElement,
    //   defaultLayers.vector.normal.map,
    //   {
    //     zoom: 10,
    //     center: { lat: 37.7397, lng: -121.4252 }
    //   }
    // );
    // let ui = H.ui.UI.createDefault(map, defaultLayers);
  }
}
