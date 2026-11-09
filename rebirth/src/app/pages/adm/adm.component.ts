import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-adm',
  imports: [RouterLink],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.css'
})
export class AdmComponent {
    
  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  erroClientes: boolean = false;

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (lista) => {
        this.clientes = lista;
        this.erroClientes = false;
      },
      error: () => {
        this.clientes = [];
        this.erroClientes = true;
      }
    });
  }

}
