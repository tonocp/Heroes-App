import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes/listado`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`, {
      headers: { id: id },
    });
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes/buscar/${termino}`, {
      headers: { termino: termino },
    });
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    if (heroe.alt_img === '') heroe.alt_img = 'assets/no-image.png';
    return this.http.post<Heroe>(`${this.baseUrl}/heroes/agregar`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(
      `${this.baseUrl}/heroes/editar/${heroe.id}`,
      heroe
    );
  }

  borrarHeroe(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${_id}`, {
      headers: { _id: _id },
    });
  }
}
