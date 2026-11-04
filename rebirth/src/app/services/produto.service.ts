import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:3000/produto';
  private produtoHTTP = inject(HttpClient);


  constructor() { }

    listar(): Observable<Produto[]>{
      return this.produtoHTTP.get<Produto[]>(this.API);
    }
  
    incluir(cliente:Produto): Observable<Produto> {
      return this.produtoHTTP.post<Produto>(this.API, cliente);
    }
  
    excluir(id:string): Observable<void> {
      return this.produtoHTTP.delete<void>(`${this.API}/${id}`);
    }
  
    buscarPorId(id: string): Observable<Produto> {
    return this.produtoHTTP.get<Produto>(`${this.API}/${id}`);
    }
    
    editar(produto: Produto): Observable<Produto> {
    return this.produtoHTTP.put<Produto>(`${this.API}/${produto.idProduto}`, produto);
    }

}
