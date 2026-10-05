import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import {AjudaComponent} from "./pages/ajuda/ajuda.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'ajuda', component: AjudaComponent }
];
