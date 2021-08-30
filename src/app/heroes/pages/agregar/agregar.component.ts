import { Component, OnInit, PipeTransform } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 90%;
      border-radius: 20px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC_Comics',
      desc: 'DC Comics'
    },
    {
      id: 'Marvel_Comics',
      desc: 'Marvel Comics'
    }
  ] 
  
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private HeroesService: HeroesService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) { }

  ngOnInit(): void {
    if( !this.router.url.includes('editar') ) return;
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.HeroesService.getHeroePorId(id) )
      )
      .subscribe( heroe => this.heroe = heroe);    
  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) return;
    if(this.heroe.id){
      // Update
      this.HeroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnackBar('Registro Actualizado!'));
    } else {
      // Guardar
      this.HeroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
         this.router.navigate(['/heroes/editar', heroe.id]);
         this.mostrarSnackBar('Registro Creado!');
      })
    }
    
  }

  borrar() {

    this.dialog.open(ConfirmarComponent, {
      width: '50%'
    });

    // this.HeroesService.borrarHeroe( this.heroe.id! )
    //   .subscribe( resp => {
    //     this.router.navigate(['/heroes']);
    //     this.mostrarSnackBar('Registro Borrado!');
    //   })
  }

  mostrarSnackBar( mensaje: string ){
    this.snackBar.open(mensaje , 'Ok!', {
      duration: 2500
    });
  }

}
