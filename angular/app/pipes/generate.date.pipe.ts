import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({name: 'generateDate'})
export class GenerateDatePipe implements PipeTransform{
  transform(value): string{
      let date = new Date(value * 1000);

      let day = date.getDate();
      let finalDay = day.toString();
      if(day <= 9){
        finalDay = "0" + day;
      }

      let month = date.getMonth() + 1;
      let finalMonth = day.toString();
      if(day <= 9){
        finalMonth = "0" + month;
      }

      return finalDay + "/" + finalMonth + "/" + date.getFullYear();
  }
}
