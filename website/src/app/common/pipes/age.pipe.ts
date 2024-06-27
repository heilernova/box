import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): number | null {
    let day = new Date();
    let date: Date
    if (value instanceof Date){
      date = value;
      let ageInMilliseconds = day.getTime() - date.getTime();
      return Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    }
    return null;
  }

}
