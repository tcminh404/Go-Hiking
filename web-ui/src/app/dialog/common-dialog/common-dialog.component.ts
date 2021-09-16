import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent {

  constructor(public dialogRef: MatDialogRef<CommonDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}

export interface DialogData {
  title: string;
  msg: string;
}