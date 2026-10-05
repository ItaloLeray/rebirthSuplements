import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  login: string = '';
  senha: string = '';

  botaoDesabilitado: boolean = true;

  validarFormulario() {
    if (
      this.login.trim() !== '' &&
      this.senha.trim() !== ''
    ) {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  fazerLogin() {

    if (
      this.login === 'admin@rebirth.com' &&
      this.senha === 'Admin@123'
    ) {
      alert('Bem-vindo Administrador!');
      this.router.navigate(['/adm']);
      return;
    }

    if (
      this.login.trim() !== '' &&
      this.senha.trim() !== ''
    ) {
      alert('Login realizado com sucesso!');
      this.router.navigate(['/']);
      return;
    }

    alert('Preencha os campos.');
  }
}