import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  editarCursoForm: FormGroup;
  cursoData: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCursoData();
    this.editareCursoForm();
  }

  private getCursoData(): void {
    this.cursoData = JSON.parse(localStorage.getItem('cursoData'));
  }

  editareCursoForm = () => {
    this.editarCursoForm = this.formBuilder.group({
      title: [this.cursoData.nombre, [Validators.required]],
      jornada: [this.cursoData.jornada, [Validators.required]],
      descripcion: [this.cursoData.descripcion, [Validators.required]],
    });
  }

  actualizar(): void {
    const updateData = {
      data: {
        nombre: this.editarCursoForm.get('nombre').value,
        jornada: this.editarCursoForm.get('jornada').value,
        descripcion: this.editarCursoForm.get('descipcion').value
      },
    };

    const updatedCourse = this.crudService.updateData(
      updateData,
      'curso',
      this.cursoData._id
    );

    if (updatedCourse !== []) {
      this.router.navigate(['/cursos']);
      localStorage.clear();
    }
  }

}
