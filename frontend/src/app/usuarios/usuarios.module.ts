import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';

@NgModule({
  declarations: [EditarUsuarioComponent, NuevoUsuarioComponent],
  imports: [CommonModule, UsuariosRoutingModule , FormsModule, ReactiveFormsModule],
})
export class UsuariosModule {}
