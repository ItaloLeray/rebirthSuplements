import { Routes } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import {AjudaComponent} from "./pages/ajuda/ajuda.component";

export const routes: Routes = [

    { path: '', component: MenuComponent },

    { path: 'sobre', component: SobreComponent },

    { path: 'ajuda', component: AjudaComponent }
];
