import { Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';

export const routes: Routes = [
  { path: '', component: BodyComponent, title: 'Inicio' },
  { path: 'home', component: BodyComponent, title: 'Inicio' },
  { path: 'productos', component: ProductosComponent, title: 'Productos' },
  { path: 'contacto', component: ContactosComponent, title: 'Contacto' },
  { path: 'iniciar-sesion', component: InicioSesionComponent, title: 'Iniciar Sesión' },
  { path: 'registrarse', component: RegistrarseComponent, title: 'Registrarse' },
  { path: 'cerrar-sesion', component: CerrarSesionComponent, title: 'Cerrar Sesión' },
  { path: '**', redirectTo: '' } // Redirige cualquier ruta no válida a la página de inicio
];

//este modificado