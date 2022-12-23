import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string):any[] {

    const resultArray = [];
  
      if (value.length===0 || filterString === '' || propName === '') {
        return value;
      }
      value.forEach(e=>{
        if(e[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
          resultArray.push(e);
        }
      });
      return resultArray;
    
  }

}
