import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';

export const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'contacto', component: ContactosComponent },
  { path: 'iniciar-sesion', component: InicioSesionComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'cerrar-sesion', component: CerrarSesionComponent }
];
