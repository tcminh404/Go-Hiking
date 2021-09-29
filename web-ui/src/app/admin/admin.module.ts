import { UserManagerComponent } from './user-manager/user-manager.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/material/material.module';
import { GeoManagerComponent } from './geo-manager/geo-manager.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [AdminComponent, UserManagerComponent, GeoManagerComponent],
  exports: [AdminComponent, UserManagerComponent, GeoManagerComponent]
})
export class AdminModule { }
