import { Component, Input } from '@angular/core';
import { DetailComponent } from '../detail/detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ListDataFilter } from '../../interfaces/api';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    DetailComponent,
    MatGridListModule,
    MatIconModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data!: ListDataFilter[];
  @Input() loading!:boolean;
  @Input() allTypesPlaceholder!: string;
  @Input() typeValue!: string;

  // function placeholder
  trackById(index: number): number {
    return index;
  }
}
