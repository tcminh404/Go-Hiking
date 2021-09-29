import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HereMapRoutingModule } from './here-map-routing.module';
import { HereMapComponent } from './here-map.component';
import { MaterialModule } from 'src/material/material.module';


@NgModule({
  declarations: [
    HereMapComponent
  ],
  imports: [
    CommonModule,
    HereMapRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    HereMapComponent
  ]
})
export class HereMapModule { }
