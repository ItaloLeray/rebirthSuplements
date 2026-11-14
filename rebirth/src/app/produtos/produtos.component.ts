import { Component } from '@angular/core';
import { CarrinhoService } from '../shared/carrinho.service';
import { Carrinho } from '../model/carrinho';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})

export class ProdutosComponent {

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  adicionarCarrinho(produto: any) {

    const idCliente = localStorage.getItem('idCliente');

    if (!idCliente) {
      alert('Faça login antes de adicionar produtos ao carrinho.');
      this.router.navigate(['/login']);
      return;
    }

    const item: Carrinho = {
      idCliente: idCliente,
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: produto.quantidade,
      preco: produto.preco
    };

    this.carrinhoService.adicionar(item).subscribe({
      next: () => {
        alert('Produto adicionado ao carrinho!');
      },
      error: () => {
        alert('Não foi possível adicionar o produto.');
      }
    });
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