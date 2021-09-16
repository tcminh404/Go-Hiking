import { UserManagerComponent } from './user-manager/user-manager.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [AdminComponent, UserManagerComponent],
  exports: [AdminComponent, UserManagerComponent]
})
export class AdminModule { }
