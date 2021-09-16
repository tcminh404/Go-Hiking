import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { MaterialModule } from 'src/material/material.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ComponentsComponent, HomeComponent],
  exports: [HomeComponent]
})
export class ComponentsModule { }
