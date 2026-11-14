import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrinho } from '../model/carrinho';

@Injectable({
  providedIn: 'root'
})

export class CarrinhoService {

  private API = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  adicionar(produto: Carrinho): Observable<Carrinho> {
    return this.http.post<Carrinho>(this.API, produto);
  }

  listar(idCliente: string): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(this.API + '?idCliente=' + idCliente);
  }

  editar(produto: Carrinho): Observable<Carrinho> {
    return this.http.put<Carrinho>(this.API + '/' + produto.id, produto);
  }

  remover(id: string): Observable<void> {
    return this.http.delete<void>(this.API + '/' + id);
  }

}