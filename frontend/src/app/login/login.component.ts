import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from '../modelos/data';
import { LoginService } from '../servicios/login.service';
import { PermisosService } from '../servicios/permisos.service';

export interface DataLogin {
  data: {
    email: string;
    password: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataLogin: DataLogin;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private permisos: PermisosService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this._loginForm();
    this.dataLogin = {
      data: {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      },
    };
  }

  // tslint:disable-next-line:variable-name
  _loginForm = () => {
    this.loginForm = this.formBuilder.group({
      email: ['henry@gmail.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  login(): void {
    this.loginService.logIn(this.dataLogin).subscribe(
      (res: Data) => {
        if (res.ok) {
          if (this.permisos.decodeToken(res.token)) {
            this.router.navigate(['/home']);
          }
        } else {
          this.dataLogin.data.email = '';
          this.dataLogin.data.password = '';
        }
      },
      (error) => {
        this.dataLogin.data.email = '';
        this.dataLogin.data.password = '';
        console.log(error);
      }
    );
  }

}
