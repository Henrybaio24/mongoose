import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CursosRoutingModule } from './cursos.routing.module';
import { NuevoCursoComponent } from './nuevo-curso/nuevo-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';

@NgModule({
  declarations: [NuevoCursoComponent, EditarCursoComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CursosModule { }
