import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../servicios/crud.service';
import { WebServiceService } from '../servicios/web-service.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  private url: string;
  cursoData = [];

  constructor(
    private crudService: CrudService,
    private server: WebServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.url = this.server.getUrl();
  }

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos(): void {
    this.http
      .get(`${this.url}cursos`, this.server.getHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.cursoData.push(element);
        });
      });
  }

  deleteCurso(_id): void {
    this.crudService.deleteData('curso', _id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cursos']);
    });
  }

  editCurso(cursoData): void {
    localStorage.setItem('cursoData', JSON.stringify(cursoData));
    this.router.navigate(['/cursos/editar']);
  }

  createCurso(): void {
    this.router.navigate(['/cursos/crear']);
  }

}

