import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermisosService } from './permisos.service';
import { Data } from '../modelos/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  private url: string;

  constructor( private http: HttpClient, private server: WebServiceService, private permisos: PermisosService )
  {
    this.url = server.getUrl();
  }
  guardarArchivo(file: File[]): Observable<Data> {
    const formData = new FormData();
    formData.append('imagen', file[0], file[0].name);
    return this.http.post<Data>(
      `${this.url}galeria`,
      formData,
      this.server.getHeaderFile()
    );
  }

  eliminarArchivo(direccion: string, fileName: string): boolean {
    let returnDta = false;
    this.http.delete<Data>(
      `${this.url}files/${direccion}/${fileName}`,
      this.server.getHeaderFile()
    )
    .subscribe((data) => {
      if (data.ok) {
        returnDta = true;
        this.permisos.decodeToken(data.token);
      } else {
        alert(data.msg);
      }
    });
    return returnDta[0];
  }

  getArchivo(direccion: string, fileName: string): any {
    return `${this.url}files/${direccion}/${fileName}`;
  }
}


