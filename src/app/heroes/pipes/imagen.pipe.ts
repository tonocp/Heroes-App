import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  ruta: string = 'assets/heroes/';
  undefined: string = 'assets/no-image.png';

  transform( heroe: Heroe ): string {
    if( heroe.id === undefined && heroe.alt_img === '' ) return this.undefined;
    if( heroe.alt_img ) return heroe.alt_img;
    return `${this.ruta}${heroe.id}.jpg`;
  }

}
