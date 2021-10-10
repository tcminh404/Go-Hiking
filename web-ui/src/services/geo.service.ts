import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeoApi } from 'src/api/geo';
import { GeoData } from 'src/models/geo-data';

@Injectable({ providedIn: 'root' })
export class GeoService {
  private _geoMap: Map<string, GeoData>

  constructor(private api: GeoApi) { }

  get geoMap(): Map<string, GeoData> {
    if (!this._geoMap) {
      this._geoMap = new Map()
    }
    return this._geoMap
  }

  decode(lat, lng, offset): Observable<GeoData> {
    return this.api.decode(lat, lng, offset)
  }

  all(): Observable<GeoData[]> {
    this.geoMap.clear()
    return this.api.all().pipe(
      map((geos) => {
        for (let i = 0, n = geos.length; i < n; i++) {
          const geo = geos[i]
          this.geoMap.set(geo.geoId, geo)
        }
        return geos
      })
    )
  }
}
