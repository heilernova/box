import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss'
})
export class MessageBoxComponent {
  private readonly _matDialogRef = inject(MatDialogRef);

  public readonly title = signal<string>('');
  public readonly message = signal<string>('');

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { message?: string, title?: string }
  ){
    if (data.message) this.message.set(data.message);
    if (data.title) this.title.set(data.title);
  }
}
