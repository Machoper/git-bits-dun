import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  public show(text: string, options: any = {}): void {
    this.snackBar.open(text, '', {
      duration: 3000,
      panelClass: ['text-white'],
      ... options
    });
  }

  public showError(err: any) {
    if (err && err.message) {
      this.show(err.message);
    }
  }

}
