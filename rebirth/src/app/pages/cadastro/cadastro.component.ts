import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  cliente: Cliente = {
    cpf: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    senha: ''
  };

  cadastrar(): void {
    this.clienteService.listar().subscribe({
      next: (lista) => {
        if (lista.some(c => c.email.toLowerCase() === this.cliente.email.toLowerCase())) {
          alert('Este e-mail já está cadastrado.');
          return;
        }

        this.clienteService.incluir(this.cliente).subscribe({
          next: () => {
            alert('Cadastro realizado com sucesso!');
            this.router.navigate(['/login']);
          },
          error: () => alert('Erro ao cadastrar. Verifique se o servidor está funcionando.')
        });
      },
      error: () => alert('Não foi possível verificar os cadastros. Verifique se o servidor está funcionando.')
    });
  }
}