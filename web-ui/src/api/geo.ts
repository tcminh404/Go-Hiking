import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "src/constants/api.path";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeoApi {
    private readonly BASE_PATH = API.GEO
    private readonly GEO = `/geo`
    private readonly GET_ALL_PATH = `/locations`

    constructor(private http: HttpClient) { }

    decode(lat, lng, offset): Observable<GeoData> {
        const params = new HttpParams()
            .append('lat', lat)
            .append('lng', lng)
            .append('offset', offset)
        return this.http.get<GeoData>(`${this.BASE_PATH}${this.GEO}`, { params: params })
    }

    all(): Observable<GeoData[]> {
        return this.http.get<GeoData[]>(`${this.BASE_PATH}${this.GET_ALL_PATH}`)
    }
}
interface GeoData {
    geoId: string
    latitude: number
    longitude: number
    address: string
}