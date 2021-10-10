import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeoRoutingModule } from './geo-routing.module';
import { GeoComponent } from './geo.component';
import { MaterialModule } from 'src/material/material.module';


@NgModule({
  declarations: [
    GeoComponent
  ],
  imports: [
    CommonModule,
    GeoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class GeoModule { }
