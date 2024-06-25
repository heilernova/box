import { Injectable, inject } from '@angular/core';
import { ApiAuthService } from '../api/auth';
import { User } from './User.model';
import { BehaviorSubject } from 'rxjs';
import { ApiRmsService } from '../api/rms';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly _apiAuth = inject(ApiAuthService);
  private readonly _apiRMs = inject(ApiRmsService);
  private _user: User | null = null;
  public readonly changeUser = new BehaviorSubject<User | null>(null);

  constructor() { }

  private setUser(user: User | null){
    this._user = user;
    if (user){
      localStorage.setItem('session', user.toJson());
    } else {
      localStorage.removeItem('session');
    }
    this.changeUser.next(this._user);
  }

  getUser(){
    return this._user;
  }

  get isLoggedIn(){
    return this._user ? true : false;
  }

  init(): boolean {
    if (typeof window == 'object'){
      if ( localStorage){
        let sessionJsonString: string | null = localStorage.getItem('session');
        if (sessionJsonString){
          let user = new User(JSON.parse(sessionJsonString), this._apiRMs);
          this.setUser(user);
        }
        return true;
      }
    }
    return false
  }

  signIn(credentials: { username: string, password: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      this._apiAuth.signIn(credentials).subscribe({
        next: res => {
          let user = new User({
            id: res.id,
            role: res.role,
            username: res.username,
            name: res.name,
            lastName: res.last_name,
            sex: res.sex,
            isCoach: res.is_coach,
            birthdate: res.birthdate,
            tall: res.tall,
            token: res.token,
            weight: res.weight
          }, this._apiRMs);

          this.setUser(user);
          resolve();
        },
        error: err => reject(err)
      })
    })
  }

  logout(){
    this.setUser(null);
  }
}
