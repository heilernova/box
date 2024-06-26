import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  constructor() { }

  success(message: string){
    return this._snackBar.open(message, undefined, {  duration: 2000, verticalPosition: 'top' });
  }

  show(message: string){
    return this._snackBar.open(message, undefined, {  duration: 2000, verticalPosition: 'top' });
  }

  error(message: string){
    return this._snackBar.open(message, undefined, {  duration: 2000, verticalPosition: 'top' });
  }

  warning(message: string){
    return this._snackBar.open(message, undefined, {  duration: 2000, verticalPosition: 'top' });
  }
}
