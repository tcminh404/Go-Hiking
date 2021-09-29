import { GeoService } from './../../../services/geo.service';
import { Component, Input, OnInit } from '@angular/core';
import { GeoData } from 'src/models/geo-data';

@Component({
  selector: 'app-geo-manager',
  templateUrl: './geo-manager.component.html',
  styleUrls: ['./geo-manager.component.scss']
})
export class GeoManagerComponent implements OnInit {
  @Input() geos: GeoData[]
  dataSource: GeoData[]
  displayedColumns: string[] = ['id', 'lat', 'lng', 'addr'];
  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.dataSource = this.geos
  }

}
