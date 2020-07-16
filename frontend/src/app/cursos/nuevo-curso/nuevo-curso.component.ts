import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';

export interface CursoData {
  data: {
    nombre: string;
    jornada: string;
    descripcion: string;
  };
}

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css']
})
export class NuevoCursoComponent implements OnInit {
  crearCursoForm: FormGroup;
  dataCurso: CursoData;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._crearCursoForm();
  }

  // tslint:disable-next-line:variable-name
  _crearCursoForm = () => {
    this.crearCursoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      jornada: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  registrarCurso(): void {
    this.dataCurso = {
      data: {
        nombre: this.crearCursoForm.get('nombre').value,
        jornada: this.crearCursoForm.get('jornada').value,
        descripcion: this.crearCursoForm.get('descripcion').value,
      },
    };

    const guardarCurso = this.crudService.postData(this.dataCurso, 'curso');
    if (guardarCurso !== []) {
      this.router.navigate(['/cursos']);
    }
  }

}
