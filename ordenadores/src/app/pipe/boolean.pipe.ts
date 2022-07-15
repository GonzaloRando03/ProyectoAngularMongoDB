import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})

/* Muestra instalado o no instalado en el sistema operativo */
export class BooleanPipe implements PipeTransform {

  transform(inp: boolean, index: number = 1) {
    let result = ""
    if (inp == false){
      result = "No instalado"
    }else {
      result = "Instalado"
    }
    return result 
  
  }

}
