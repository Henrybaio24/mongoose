import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../servicios/crud.service';
import { WebServiceService } from '../servicios/web-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  private url: string;
  usuarioData = [];

  constructor(
    private crudService: CrudService,
    private server: WebServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.url = this.server.getUrl();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.http
      .get(`${this.url}usuarios`, this.server.getHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.usuarioData.push(element);
        });
      });
  }

  eliminarUsuario(_id): void {
    this.crudService.deleteData('usuario', _id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/usuarios']);
    });
  }

  editarUsario(usuarioData): void {
    localStorage.setItem('usuarioData', JSON.stringify(usuarioData));
    this.router.navigate(['/usuarios/editar']);
  }

  crearUsuario(): void {
    this.router.navigate(['/usuarios/crear']);
  }

}
