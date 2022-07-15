import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  /* separa los valores de los array por espacios. */

  transform(inp: string[], index: number = 1) {
    let text : string = ""
    for (let i in inp) {
      text = text + " " + inp[i]
    }
    return text 
  
  }
}
