import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../shared/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})

export class CarrinhoComponent {

  produtos: any[] = [];

  constructor(private carrinhoService: CarrinhoService) {
    this.produtos = this.carrinhoService.listar();
  }

  remover(id: number) {
    this.carrinhoService.remover(id);
    this.produtos = this.carrinhoService.listar();
  }

}