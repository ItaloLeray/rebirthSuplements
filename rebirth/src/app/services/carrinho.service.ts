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
  
  constructor() { }


    listar(): Observable<Carrinho[]>{
      return this.carrinhoHTTP.get<Carrinho[]>(this.API);
    }
  
    incluir(cliente:Carrinho): Observable<Carrinho> {
      return this.carrinhoHTTP.post<Carrinho>(this.API, cliente);
    }
  
    excluir(id:string): Observable<void> {
      return this.carrinhoHTTP.delete<void>(`${this.API}/${id}`);
    }
  
    buscarPorId(id: string): Observable<Carrinho> {
    return this.carrinhoHTTP.get<Carrinho>(`${this.API}/${id}`);
    }
    
    editar(carrinho: Carrinho): Observable<Carrinho> {
    return this.carrinhoHTTP.put<Carrinho>(`${this.API}/${carrinho.idCarrinho}`, carrinho);
    }
}
