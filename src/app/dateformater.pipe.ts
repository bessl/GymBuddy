import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'dateformater'
})
export class DateformaterPipe implements PipeTransform {

  transform(timestamp: number, ...args: any[]): any {
    return formatDistanceToNow(
      new Date(timestamp), { addSuffix: false }
    );
  }

}
