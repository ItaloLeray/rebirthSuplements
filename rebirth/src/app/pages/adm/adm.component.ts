import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { Cliente } from '../../model/cliente';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-adm',
  imports: [RouterLink, FormsModule],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.css'
})
export class AdmComponent {

  private clienteService = inject(ClienteService);
  private produtoService = inject(ProdutoService);

  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  erroClientes: boolean = false;

  produtoSelecionado: Produto = {
    nome: '',
    categoria: 'Whey Protein',
    preco: '',
    quantidade: ''
  };

  clienteSelecionado: Cliente | null = null;

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarProdutos();
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (lista) => {
        this.clientes = lista;
        this.erroClientes = false;
      },
      error: () => {
        this.clientes = [];
        this.erroClientes = true;
      }
    });
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (lista) => {
        this.produtos = lista;
      },
      error: (erro) => {
        console.log('Erro ao carregar produtos:', erro);
      }
    });
  }

  cadastrarProduto(): void {
    if (this.produtoSelecionado.id) {
      this.produtoService.editar(this.produtoSelecionado).subscribe({
        next: () => {
          alert('Produto editado com sucesso!');
          this.produtoSelecionado = {
            nome: '',
            categoria: 'Whey Protein',
            preco: '',
            quantidade: ''
          };
          this.carregarProdutos();
        },
        error: (erro) => {
          console.log(erro);
          alert('Erro ao editar produto.');
        }
      });
    } else {
      this.produtoService.incluir(this.produtoSelecionado).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.produtoSelecionado = {
            nome: '',
            categoria: 'Whey Protein',
            preco: '',
            quantidade: ''
          };
          this.carregarProdutos();
        },
        error: (erro) => {
          console.log(erro);
          alert('Erro ao cadastrar produto.');
        }
      });
    }
  }

  editarProduto(produto: Produto): void {
    this.produtoSelecionado = { ...produto };
  }

  excluirProduto(id: string): void {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.excluir(id).subscribe({
        next: () => {
          alert('Produto excluído com sucesso!');
          this.carregarProdutos();
        },
        error: (erro) => {
          console.log(erro);
          alert('Erro ao excluir produto.');
        }
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.clienteSelecionado = { ...cliente };
  }

  salvarCliente(): void {
    if (this.clienteSelecionado) {
      this.clienteService.editar(this.clienteSelecionado).subscribe({
        next: () => {
          alert('Cliente editado com sucesso!');
          this.clienteSelecionado = null;
          this.carregarClientes();
        },
        error: (erro) => {
          console.log(erro);
          alert('Erro ao editar cliente.');
        }
      });
    }
  }

  cancelarEdicaoCliente(): void {
    this.clienteSelecionado = null;
  }

  excluirCliente(id: string): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clienteService.excluir(id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso!');
          this.carregarClientes();
        },
        error: (erro) => {
          console.log(erro);
          alert('Erro ao excluir cliente.');
        }
      });
    }
  }

}