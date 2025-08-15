import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router'; //se agrega routerlink
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paginaWeb';
  isHomeRoute: boolean = true;
  cargando: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isHomeRoute = this.router.url === '/' || this.router.url === '/home';
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = false;
    }, 4000);
  }
}
//este modificque