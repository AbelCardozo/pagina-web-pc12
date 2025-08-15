import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  user: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Ahora apunta a tu Netlify Function
  private apiUrl = '/.netlify/functions/api';

  constructor(private http: HttpClient) { }

  registrarUsuario(nuevo: Usuario): Observable<any> {
    const data = {
      action: 'register',
      user: nuevo.user,
      password: nuevo.password,
      email: nuevo.email
    };
    return this.http.post(this.apiUrl, data);
  }

  validarUsuario(user: string, password: string): Observable<any> {
    const data = {
      action: 'login',
      user: user,
      password: password
    };
    return this.http.post(this.apiUrl, data);
  }
}
//este modificque