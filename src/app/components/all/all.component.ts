import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.apiService.getData('?offset=20&limit=20').subscribe({
      next: (value) => { console.log(value) },
      error: (error) => { console.error(error)},
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
