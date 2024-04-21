import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class ModalPopupService {
  constructor(private dialog: MatDialog) { }

  openPopup<T>(component: any, data: any): MatDialogRef<any> {
    return this.dialog.open(component, {
      width: '600px',
      data: data,
      disableClose: true
    });
  }

  closePopup(dialogRef: MatDialogRef<any>) {
    dialogRef.close('closed forcefully');
  }
}