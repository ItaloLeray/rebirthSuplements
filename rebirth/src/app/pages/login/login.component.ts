import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private clienteService = inject(ClienteService);

  constructor(private router: Router) {}

  login: string = '';
  senha: string = '';
  botaoDesabilitado: boolean = true;

  validarFormulario(): void {
    this.botaoDesabilitado = this.login.trim() === '' || this.senha.trim() === '';
  }

  fazerLogin(): void {
    if (this.login === 'admin@rebirth.com' && this.senha === 'Admin@123') {
      alert('Bem-vindo Administrador!');
      this.router.navigate(['/adm']);
      return;
    }

    this.clienteService.listar().subscribe({
      next: (clientes) => {
        const cliente = clientes.find(c =>
          c.email.toLowerCase() === this.login.trim().toLowerCase() &&
          c.senha === this.senha
        );

        if (!cliente || !cliente.id) {
          alert('E-mail ou senha inválidos.');
          return;
        }

        localStorage.setItem('idCliente', cliente.id);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: () => alert('Não foi possível realizar o login. Verifique se o servidor está funcionando.')
    });
  }
}