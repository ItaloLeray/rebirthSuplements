import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute);

  editando: boolean = false;

  cliente: Cliente = {
    cpf: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    senha: ''
  };

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.editando = true;
          this.clienteService.buscarPorId(params['id']).subscribe({
            next: (cliente) => {
              this.cliente = cliente;
            },
            error: () => {
              alert('Não foi possível carregar os dados do cliente.');
              this.router.navigate(['/adm']);
            }
          });
        }
      }
    });
  }

  salvar(): void {
    if (this.editando) {
      this.clienteService.editar(this.cliente).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/adm']);
        },
        error: () => alert('Erro ao atualizar os dados do cliente.')
      });
    } else {
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
}