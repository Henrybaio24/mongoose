import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { Data } from '../modelos/data';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  data: Data;
  private token: string;
  private usuarioLogin: Usuario;
  private sessionID: string;

  constructor() {
    this.token = null;
    this.usuarioLogin = null;
   }

   decodeToken(token: string): boolean {
    const decoded = jwt_decode(token);
    if (decoded) {
      this.token = token || null;
      this.usuarioLogin = decoded.data || null;
      this.sessionID = this.usuarioLogin.sessionID || null;
      delete this.usuarioLogin.sessionID;
      delete this.usuarioLogin.password;
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    return this.token;
  }

  destroyToken(): void {
    this.token = null;
  }

  getUserLogin(): object {
    return this.usuarioLogin;
  }

  getSessionID(): string {
    return this.sessionID;
  }
}
