import { Component } from '@angular/core';
import { AllComponent } from '../all/all.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    FavoritesComponent,
    AllComponent,
    CommonModule,
    MatTabsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
