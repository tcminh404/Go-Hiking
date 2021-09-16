import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { MaterialModule } from 'src/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [DialogComponent, CommonDialogComponent],
  exports: [DialogComponent, CommonDialogComponent]
})
export class DialogModule { }
