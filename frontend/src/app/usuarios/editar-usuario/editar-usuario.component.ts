import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';
import { ArchivosService } from '../../servicios/archivos.service';
import { Data } from '../../modelos/data';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  editarUsuarioForm: FormGroup;
  usuarioData: any;
  archivo: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private archivosService: ArchivosService
  ) {}

  ngOnInit(): void {
    this._getUsuarioData();
    this._editarUsuarioForm();
  }

  private _getUsuarioData(): void {
    this.usuarioData = JSON.parse(localStorage.getItem('usuarioData'));
  }

  // tslint:disable-next-line:variable-nombre
  _editarUsuarioForm = () => {
    this.editarUsuarioForm = this.formBuilder.group({
      nombre: [this.usuarioData.nombre, [Validators.required]],
      apellido: [this.usuarioData.apellido, [Validators.required]],
      email: [this.usuarioData.email, [Validators.required]],
      password: [this.usuarioData.password, [Validators.required]],
      imagen: [this.usuarioData.imagen, [Validators.required]],
    });
  }

  actualizar(): void {
    const updateData = {
      data: {
        nombre: this.editarUsuarioForm.get('nombre').value,
        apellido: this.editarUsuarioForm.get('apellido').value,
        email: this.editarUsuarioForm.get('email').value,
        password: this.editarUsuarioForm.get('password').value,
        imagen: this.editarUsuarioForm.get('iamgen').value,
      },
    };

    const updatedUsuario = this.crudService.updateData(
      updateData,
      'usuario',
      this.usuarioData._id
    );

    if (updatedUsuario !== []) {
      this.router.navigate(['/usuarios']);
      localStorage.clear();
    }
  }

  enviarArchivo(event): void {
    let foto = this.editarUsuarioForm.get('imagen').value;

    if (foto !== 'cambio.jpeg') {
      this.archivosService.eliminarArchivo('galeria', foto);
    }

    const file = event.target.files;
    // console.log(file);

    this.archivosService.guardarArchivo(file).subscribe((res: Data) => {
      // console.log(res);
      if (res.ok) {
        foto = res.data[0];
        this.archivo = this.archivosService.getArchivo('galeria', foto);
      }
    });
  }

}
