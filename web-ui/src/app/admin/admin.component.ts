import { Component, OnInit } from '@angular/core';
import { GeoData } from 'src/models/geo-data';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';
import { GeoService } from 'src/services/geo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  geos: GeoData[]
  users: User[]

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private geoService: GeoService
  ) { }

  ngOnInit() {
    this.geoService.all().subscribe(geos => this.geos = geos)
    this.userService.all().subscribe(users => this.users = users)
  }

}
