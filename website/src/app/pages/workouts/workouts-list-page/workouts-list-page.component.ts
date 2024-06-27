import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageModule } from '@app/ui/page';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DataWorkoutsService, Workout } from '@app/common/data/workouts';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutsInfoDlgComponent } from '@app/ui/workouts-info-dlg/workouts-info-dlg.component';

@Component({
  selector: 'app-workouts-list-page',
  standalone: true,
  imports: [
    FormsModule,
    PageModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './workouts-list-page.component.html',
  styleUrl: './workouts-list-page.component.scss'
})
export class WorkoutsListPageComponent {
  private readonly _dataWorkouts = inject(DataWorkoutsService);
  private readonly _matDialog = inject(MatDialog);
  private _listBase: Workout[] = [];
  private _inputSearchValue: string = '';
  public readonly list = signal<Workout[]>([]);

  constructor(){
    this._dataWorkouts.getAll().then(list => {
      this._listBase = list;
      this.list.set(list);
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

  onClickUpdateList(): void {

  }

  onClickOpenPreview(workout: Workout): void {
    this._matDialog.open(WorkoutsInfoDlgComponent, { data: workout, width: 'calc(100% - 1em)', maxWidth: '700px', autoFocus: false });
  }

}
