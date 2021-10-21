import { ReactiveFormsModule } from '@angular/forms';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { FriendRequestDialogComponent } from './friend-request-dialog/friend-request-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [CommonDialogComponent, UserDialogComponent, FriendRequestDialogComponent],
  exports: [CommonDialogComponent]
})
export class DialogModule { }
