import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

interface ProdutoCarrinho {
  nome: string;
  categoria: string;
  imagem: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  produtos: ProdutoCarrinho[] = [
    {
      nome: 'Camiseta Rebirth',
      categoria: 'Roupas',
      imagem: 'camisetarebirth.png',
      preco: 69.90,
      quantidade: 1
    },
    {
      nome: 'Creatina Rebirth',
      categoria: 'Suplementos',
      imagem: 'creatinarebirth.png',
      preco: 79.90,
      quantidade: 1
    },
    {
      nome: 'Garrafa Rebirth',
      categoria: 'Hidratação',
      imagem: 'garrafarebirth.png',
      preco: 39.90,
      quantidade: 1
    },
    {
      nome: 'Hipercalórico Rebirth',
      categoria: 'Suplementos',
      imagem: 'hipercaloricorebirth.png',
      preco: 99.90,
      quantidade: 1
    },
    {
      nome: 'Pré-Treino Rebirth',
      categoria: 'Suplementos',
      imagem: 'pretreinorebirth.png',
      preco: 89.90,
      quantidade: 1
    },
    {
      nome: 'Whey Rebirth',
      categoria: 'Suplementos',
      imagem: 'wheyrebirth.png',
      preco: 119.90,
      quantidade: 1
    }
  ];

  aumentarQuantidade(produto: ProdutoCarrinho): void {
    produto.quantidade++;
  }

  diminuirQuantidade(produto: ProdutoCarrinho): void {
    if (produto.quantidade > 1) {
      produto.quantidade--;
    }
  }

  removerProduto(produto: ProdutoCarrinho): void {
    this.produtos = this.produtos.filter(
      item => item !== produto
    );
  }

  calcularTotalProduto(produto: ProdutoCarrinho): number {
    return produto.preco * produto.quantidade;
  }

  calcularSubtotal(): number {
    return this.produtos.reduce(
      (total, produto) =>
        total + this.calcularTotalProduto(produto),
      0
    );
  }

  finalizarCompra(): void {
    alert('Compra finalizada com sucesso!');
  }
}