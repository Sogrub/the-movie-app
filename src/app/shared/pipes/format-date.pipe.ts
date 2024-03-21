import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, format: string = 'MMM, DD yyyy'): string {
    const dateWithFormat = moment(value).format(format);
    return dateWithFormat;
  }

}
