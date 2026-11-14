import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  login: string = '';
  senha: string = '';
  botaoDesabilitado: boolean = true;

  validarFormulario() {
    this.botaoDesabilitado =
      this.login.trim() === '' || this.senha.trim() === '';
  }

  fazerLogin() {

    this.clienteService.listar().subscribe({
      next: (clientes: Cliente[]) => {

        const cliente = clientes.find(c =>
          c.email === this.login && c.senha === this.senha
        );

        if (cliente && cliente.id) {
          localStorage.setItem('idCliente', cliente.id);
          alert('Login realizado com sucesso!');
          this.router.navigate(['/produtos']);
        } else {
          alert('E-mail ou senha inválidos.');
        }
      },
      error: () => {
        alert('Não foi possível conectar ao servidor.');
      }
    });

  }
}