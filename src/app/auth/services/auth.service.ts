import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { asapScheduler, Observable, scheduled } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;
  
  get auth(): Auth {
    return { ...this._auth! };
  }

  borraAuth() {
    this._auth = undefined;
    sessionStorage.removeItem('token');
  }

  constructor( private http: HttpClient ) { }

  checkAuth(): Observable<boolean> {
    if( !sessionStorage.getItem('token') ) return scheduled( [false], asapScheduler );
    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1` )
              .pipe(
                map( auth => {
                  this._auth = auth;
                  return true;
                })
              )
  }

  login() {
    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1` )
        .pipe(
          tap( auth => this._auth = auth ),
          tap( auth => sessionStorage.setItem('token', auth.id) )
        );
  }

  logout() {
    this._auth = undefined;
  }

}
