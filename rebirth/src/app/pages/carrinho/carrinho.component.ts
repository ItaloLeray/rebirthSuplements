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
  imports: [  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
}