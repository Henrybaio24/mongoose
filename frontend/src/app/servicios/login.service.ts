import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermisosService } from './permisos.service';
import { Data } from '../modelos/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permisos: PermisosService
  ) {
    this.url = server.getUrl();
  }

  logIn(dataLogin): Observable<Data> {
    return this.http.post<Data>(`${this.url}login`, dataLogin);
  }
}
