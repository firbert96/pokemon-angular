import { Component } from '@angular/core';
import { AllComponent } from '../all/all.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgbNavModule,
    RouterOutlet,
    FavoritesComponent,
    AllComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeId = 1;
}
