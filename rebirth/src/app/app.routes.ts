import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { AjudaComponent } from './pages/ajuda/ajuda.component';
import { LoginComponent } from './pages/login/login.component';
import { AdmComponent } from './pages/adm/adm.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'ajuda', component: AjudaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'adm', component: AdmComponent },
    { path:'carrinho', component: CarrinhoComponent }
];

