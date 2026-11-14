
import { Component } from '@angular/core';
import { CarrinhoService } from '../shared/carrinho.service';

@Component({
  selector: 'app-produtos',
  imports: [],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})

export class ProdutosComponent {

  constructor(private carrinhoService: CarrinhoService) {}

  adicionarCarrinho(produto: any) {
    this.carrinhoService.adicionar(produto);
    alert('Produto adicionado ao carrinho!');
  }

  filtrar(categoria: string) {

    const produtos = document.querySelectorAll('.produto');
    const acessorios = document.getElementById('acessorios');
    const suplementos = document.getElementById('suplementos');

    produtos.forEach(produto => {
      (produto as HTMLElement).style.display = 'none';
    });

    if (categoria === 'todos') {

      produtos.forEach(produto => {
        (produto as HTMLElement).style.display = 'block';
      });

      if (acessorios) acessorios.style.display = 'block';
      if (suplementos) suplementos.style.display = 'block';

    } else if (categoria === 'acessorios') {

      if (acessorios) acessorios.style.display = 'block';
      if (suplementos) suplementos.style.display = 'none';

      acessorios?.querySelectorAll('.produto').forEach(produto => {
        (produto as HTMLElement).style.display = 'block';
      });

    } else {

      if (acessorios) acessorios.style.display = 'none';
      if (suplementos) suplementos.style.display = 'block';

      const produto = document.querySelector('.' + categoria);

      if (produto) {
        (produto as HTMLElement).style.display = 'block';
      }

    }

  }

}