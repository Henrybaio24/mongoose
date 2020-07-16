import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { NuevoCursoComponent } from './nuevo-curso/nuevo-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent,
  },
  {
    path: 'crear',
    component: NuevoCursoComponent,
  },
  {
    path: 'editar',
    component: EditarCursoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
