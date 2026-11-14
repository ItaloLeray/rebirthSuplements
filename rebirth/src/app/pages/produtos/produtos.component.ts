import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Carrinho } from '../../model/carrinho';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-produtos',
  imports: [],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  adicionarAoCarrinho(nome: string, categoria: string, preco: number, imagem: string): void {
    const idCliente = localStorage.getItem('idCliente');

    if (!idCliente) {
      alert('Faça login para adicionar produtos ao carrinho.');
      this.router.navigate(['/login']);
      return;
    }

    this.carrinhoService.listar(idCliente).subscribe({
      next: (itens) => {
        const existente = itens.find(item => item.nome === nome);

        if (existente?.id) {
          existente.quantidade += 1;
          this.carrinhoService.editar(existente).subscribe({
            next: () => alert('Quantidade atualizada no carrinho!'),
            error: () => alert('Não foi possível atualizar o carrinho.')
          });
          return;
        }

        const novoItem: Carrinho = {
          idCliente,
          nome,
          categoria,
          preco,
          imagem,
          quantidade: 1
        };

        this.carrinhoService.incluir(novoItem).subscribe({
          next: () => alert('Produto adicionado ao carrinho!'),
          error: () => alert('Não foi possível adicionar o produto.')
        });
      },
      error: () => alert('Não foi possível acessar o carrinho. Verifique se o servidor está funcionando.')
    });
  }
}