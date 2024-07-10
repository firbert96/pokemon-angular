import { Component } from '@angular/core';
import { AllComponent } from '../all/all.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgbNavModule,
    RouterOutlet,
    FavoritesComponent,
    AllComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  active = 1;
}
