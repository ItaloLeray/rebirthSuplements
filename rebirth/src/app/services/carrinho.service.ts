import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrinho } from '../model/carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly API = 'http://localhost:3000/carrinho';
  private carrinhoHTTP = inject(HttpClient);

  listar(idCliente: string): Observable<Carrinho[]> {
    return this.carrinhoHTTP.get<Carrinho[]>(this.API + '?idCliente=' + idCliente);
  }

  incluir(item: Carrinho): Observable<Carrinho> {
    return this.carrinhoHTTP.post<Carrinho>(this.API, item);
  }

  excluir(id: string): Observable<void> {
    return this.carrinhoHTTP.delete<void>(this.API + '/' + id);
  }

  editar(item: Carrinho): Observable<Carrinho> {
    return this.carrinhoHTTP.put<Carrinho>(this.API + '/' + item.id, item);
  }
}