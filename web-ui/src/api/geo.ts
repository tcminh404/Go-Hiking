import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "src/constants/api.path";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeoApi {
    private readonly BASE_PATH = API.GEO
    private readonly GEODECODER = `/geo`
    private readonly GET_ALL_PATH = `/locations`

    constructor(private http: HttpClient) { }

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