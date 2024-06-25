import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ApiAuthService } from '@app/common/api/auth';
import { SessionService } from '@app/common/session';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private readonly _apiAuth = inject(ApiAuthService);
  private readonly _router = inject(Router);
  private readonly _session = inject(SessionService);
  public readonly loading = signal<boolean>(false);
  public readonly credentials = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  constructor(){}

  onClickSend(): void {
    if (this.credentials.invalid){
      this.credentials.markAllAsTouched();
      return;
    }

    let credentials = this.credentials.getRawValue();
    this._session.signIn(credentials)
    .then(() => {
      this._router.navigate(['/']);
    })
    .catch(() => {

    })
  }
}
