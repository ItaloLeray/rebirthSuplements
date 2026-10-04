import { Routes } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
{ path: '', component: MenuComponent },
{ path: 'sobre', component: SobreComponent },
{ path: 'login', component: LoginComponent }
];
