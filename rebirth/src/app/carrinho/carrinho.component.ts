import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../shared/carrinho.service';
import { Carrinho } from '../model/carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})

export class CarrinhoComponent implements OnInit {

  produtos: Carrinho[] = [];

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    const idCliente = localStorage.getItem('idCliente');

    if (!idCliente) {
      alert('Faça login para visualizar seu carrinho.');
      return;
    }

    this.carrinhoService.listar(idCliente).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: () => {
        alert('Não foi possível carregar o carrinho.');
      }
    });
  }

  editar(produto: Carrinho) {
    if (!produto.id || produto.quantidade < 1) {
      alert('Informe uma quantidade válida.');
      return;
    }

    this.carrinhoService.editar(produto).subscribe({
      next: () => {
        alert('Quantidade atualizada com sucesso!');
        this.listarProdutos();
      },
      error: () => {
        alert('Não foi possível atualizar a quantidade.');
      }
    });
  }

  remover(id: string) {
    this.carrinhoService.remover(id).subscribe({
      next: () => {
        this.listarProdutos();
      },
      error: () => {
        alert('Não foi possível remover o produto.');
      }
    });
  }

}