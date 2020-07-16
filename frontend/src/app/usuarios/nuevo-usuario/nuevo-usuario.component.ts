import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';
import { ArchivosService } from '../../servicios/archivos.service';
import { Data } from '../../modelos/data';

export interface UsuarioData {
  data: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    imagen: string;
  };
}

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  crearUsuarioForm: FormGroup;
  dataUsuario: UsuarioData;
  archivo: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private archivosService: ArchivosService
  ) {}

  ngOnInit(): void {
    this._crearUsuarioForm();
    this.archivo = this.archivosService.getArchivo(
      'galeria',
      'cambio,jpg'
    );
  }

  // tslint:disable-next-line:variable-name
  _crearUsuarioForm = () => {
    this.crearUsuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    });
  }

  registrarUsuario(): void {
    this.dataUsuario = {
      data: {
        nombre: this.crearUsuarioForm.get('usuario').value,
        apellido: this.crearUsuarioForm.get('apellido').value,
        email: this.crearUsuarioForm.get('email').value,
        password: this.crearUsuarioForm.get('password').value,
        imagen: this.crearUsuarioForm.get('imagen').value,
      },
    };
  }

  enviarArchivo(event): void {
    let foto = this.crearUsuarioForm.get('imagen').value;

    if (foto !== 'cambio.jpg') {
      this.archivosService.eliminarArchivo('galeria', foto);
    }

    const file = event.target.files;


    this.archivosService.guardarArchivo(file).subscribe((res: Data) => {

      if (res.ok) {
        foto = res.data[0];
        this.archivo = this.archivosService.getArchivo('galeria', foto);
      }
    });
  }

}
