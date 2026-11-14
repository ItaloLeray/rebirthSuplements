import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CarrinhoService {

  produtos: any[] = [];

  adicionar(produto: any) {
    this.produtos.push(produto);
  }

  listar() {
    return this.produtos;
  }

  remover(id: number) {
    this.produtos = this.produtos.filter(produto => produto.id !== id);
  }

}