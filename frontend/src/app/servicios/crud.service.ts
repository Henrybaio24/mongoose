import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermisosService } from './permisos.service';
import { Data } from '../modelos/data';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permisos: PermisosService
  ) {
    this.url = this.server.getUrl();
  }

  getAllData(endPoint: string): Array<any> {
    let returnData: Array<any> = [];

    this.http
      .get<Data>(`${this.url}${endPoint}`, this.server.getHeaders())
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permisos.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  postData(dataSend: object, endPoint: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .post<Data>(
        `${this.url}${endPoint}`,
        dataSend,
        this.server.getHeaders()
      )
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permisos.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  updateData(dataSend: object, endPoint: string, id: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .patch<Data>(
        `${this.url}${endPoint}/${id}`,
        dataSend,
        this.server.getHeaders()
      )
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permisos.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  deleteData(endPoint: string, id: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .delete<Data>(`${this.url}${endPoint}/${id}`, this.server.getHeaders())
      .subscribe((data) => {
        if (data.ok) {
          returnData = data.data;
          this.permisos.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }
}
