import { Component, OnInit } from '@angular/core';
import { RouterModule,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterLink ,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioLogueado = false;
  nombreUsuario: string | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuarioActivo$.subscribe(user => {
      this.nombreUsuario = user;
      this.usuarioLogueado = !!user;
    });
  }
}


