import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Carrinho } from '../../model/carrinho';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  private carrinhoService = inject(CarrinhoService);

  produtos: Carrinho[] = [];
  erro: string = '';

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    const idCliente = localStorage.getItem('idCliente');

    if (!idCliente) {
      this.produtos = [];
      this.erro = 'Faça login para visualizar seu carrinho.';
      return;
    }

    this.carrinhoService.listar(idCliente).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.erro = '';
      },
      error: () => {
        this.erro = 'Não foi possível carregar o carrinho. Verifique se o servidor está funcionando.';
      }
    });
  }

  alterarQuantidade(produto: Carrinho, quantidade: number): void {
    if (!produto.id || quantidade < 1) {
      return;
    }

    produto.quantidade = quantidade;
    this.carrinhoService.editar(produto).subscribe({
      error: () => {
        alert('Não foi possível atualizar a quantidade.');
        this.carregarProdutos();
      }
    });
  }

  remover(id: string): void {
    this.carrinhoService.excluir(id).subscribe({
      next: () => this.carregarProdutos(),
      error: () => alert('Não foi possível remover o produto.')
    });
  }

  get subtotal(): number {
    return this.produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  }
}