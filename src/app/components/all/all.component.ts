import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ListOutput, Result } from '../../interfaces/api';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    MatListModule,
    MatProgressSpinnerModule,
    CommonModule,
    DetailComponent,
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit, OnDestroy {
  items: Result[] = [];
  loading = false;
  inc = 20;
  private threshold = 50; // Distance from bottom to trigger loading
  private subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData(`?limit=${this.inc}&offset=${this.items.length}`);
  }

  getData(params:string): void {
    const s = this.apiService.getData(params).subscribe({
      next: (value:ListOutput) => { this.items.push(...value.results) },
      error: (error) => { console.error(error)},
    });
    this.subscriptions.push(s);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (scrollHeight - (scrollTop + clientHeight) < this.threshold && !this.loading) {
      this.loadMoreItems();
    }
  }

  loadMoreItems(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const limit = this.items.length + this.inc;
      this.getData(`?limit=${limit}&offset=${this.items.length}`)
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
