import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  imports: [CommonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  categoriaSelecionada: string = 'todos';

  filtrar(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

}