import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DataWorkoutsService, Workout } from '@app/common/data/workouts';
import { SessionService } from '@app/common/session';
import { PageModule } from '@app/ui/page';

@Component({
  selector: 'app-workouts-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    PageModule
  ],
  templateUrl: './workouts-page.component.html',
  styleUrl: './workouts-page.component.scss'
})
export class WorkoutsPageComponent {
  private _dataWorkouts = inject(DataWorkoutsService);
  private _session = inject(SessionService);

  public readonly list = signal<Workout[]>([]);
  public readonly edit = signal<boolean>(false);

  constructor(){
    this._dataWorkouts.getAll().then(list => this.list.set(list));
    this._session.changeUser.subscribe(value => {
      if (value){
        if (value.role == 'admin'){
          this.edit.set(true);
        } else {
          this.edit.set(false);
        }

      } else {
        this.edit.set(false);
      }
    })
  }
}
