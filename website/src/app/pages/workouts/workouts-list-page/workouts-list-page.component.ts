import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageModule } from '@app/ui/page';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DataWorkoutsService, Workout } from '@app/common/data/workouts';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutsInfoDlgComponent } from '@app/ui/workouts-info-dlg/workouts-info-dlg.component';
import { SessionService } from '@app/common/session';
import { Permission } from '@app/common/session/User.model';
import { WorkoutFormDlgComponent } from '@app/ui/workout-form-dlg/workout-form-dlg.component';
import { MatMenuModule } from '@angular/material/menu';
import { MessageBoxService } from '@app/ui/message-box';

@Component({
  selector: 'app-workouts-list-page',
  standalone: true,
  imports: [
    FormsModule,
    PageModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule
  ],
  templateUrl: './workouts-list-page.component.html',
  styleUrl: './workouts-list-page.component.scss'
})
export class WorkoutsListPageComponent {
  private readonly _dataWorkouts = inject(DataWorkoutsService);
  private readonly _matDialog = inject(MatDialog);
  private readonly _session = inject(SessionService);
  private readonly _messageBox = inject(MessageBoxService)

  private _listBase: Workout[] = [];
  private _inputSearchValue: string = '';

  public readonly list = signal<Workout[]>([]);
  public readonly create = signal<boolean>(false);
  public readonly update = signal<boolean>(false);
  public readonly pdelete = signal<boolean>(false);

  constructor(){
    this._dataWorkouts.getAll().then(list => {
      this._listBase = list;
      this.list.set(list);
    });

    this._session.changeUser.subscribe(value => {
      if (value){
        this.create.set(value.checkPermissions([Permission.WORKOUT_CREATE]));
        this.update.set(value.checkPermissions([Permission.WORKOUT_UPDATE]));
        this.pdelete.set(value.checkPermissions([Permission.WORKOUT_DELETE]));
      }
    })
  }
  
  get inputValue(){
    return this._inputSearchValue;
  }
  set inputValue(value: string){
    let result = this._listBase.filter(x => x.nameInEnglish.toLowerCase().includes(value.toLocaleLowerCase()) || x.abbreviation?.toLowerCase().includes(value.toLowerCase()) || x.nameInSpanish?.toLowerCase().includes(value.toLowerCase()) )
    this.list.set(result);
    this._inputSearchValue = value;
  }

  onClickAddWorkout(): void {
    this._matDialog.open(WorkoutFormDlgComponent, { width: '100%', maxWidth: '700px'}).afterClosed().subscribe((value: Workout | undefined) => {
      if (value){
        this.list.update(list => [...list, value]);
      }
    });
  }

  onClickUpdateList(): void {

  }

  onClickEdit(workout: Workout): void {
    this._matDialog.open(WorkoutFormDlgComponent, { data: workout, width: '100%', maxWidth: '700px'});
  }

  onClickOpenPreview(workout: Workout): void {
    this._matDialog.open(WorkoutsInfoDlgComponent, { data: workout, width: 'calc(100% - 1em)', maxWidth: '700px', autoFocus: false });
  }

  onClickMenu(event: Event){
    event.stopPropagation();
  }

  onClickDelete(workoutId: string): void {
    this._messageBox.confirm({ title: '¿Desea eliminar el ejercicio?' }).then(res => {
      if (res){
        this._dataWorkouts.delete(workoutId)
        .then(() => {
          this.list.update(list => {
            let index = list.findIndex(x => x.id == workoutId);
            if (index > -1) {
              list.splice(index, 1);
            }
            return list;
          });
        })
        .catch(err => {

        })
      }
    })
  }

}
