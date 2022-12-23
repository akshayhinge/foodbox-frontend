import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  
   sortDescending=false;
  transform(value: any[],  propName:string,reverseOrder:boolean): any[] {
    

    if (value.length===0 || propName === '') {
      return value;
    }
    let multi=-1;
    if(reverseOrder){
      multi=1;
    }
    value.sort((p1, p2) => {
      return p1[propName] > p2[propName] ? 1 * multi : p1[propName] < p2[propName] ? -1 * multi : 0;
    });

    return value;
  }

}
