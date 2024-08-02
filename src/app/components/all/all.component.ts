import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListDataFilter, ListOutput } from '../../interfaces/api';
import { allTypesPlaceholder, inc, threshold } from '../../mock/mock';
import { GeneralService } from '../../services/general.service';
import { LoadingComponent } from '../loading/loading.component';
import { SearchTypeComponent } from '../search-type/search-type.component';
import { ApiService } from '../../services/api.service';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { DetailComponent } from '../detail/detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteLoadService } from '../../services/infinite-load.service';
@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    SearchTypeComponent,
    DetailComponent,
    MatGridListModule,
    MatIconModule,
    EmptyStateComponent,
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit, OnDestroy {
  filteredData: ListDataFilter[] = [];
  items: ListDataFilter[] = [];
  limit = this.items.length + inc;
  typeValue = '';
  load = {
    part: false,
    full: false,
  }
  private subscriptions: Subscription[] = [];

  constructor(
    private generalService: GeneralService,
    private apiService: ApiService,
    private infiniteLoadService: InfiniteLoadService,
  ) {}

  get allTypesPlaceholder() {
    return allTypesPlaceholder;
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.infiniteLoadService.toggleScrollPosition();
    this.load.full = true;
    this.getList();
    this.generalService.listDataFilter$.subscribe(value => {
      this.items = value;
    });
  }

  setTypeValue(event: string): void {
    this.typeValue = event;
    this.load.full = true;
    this.loadMoreFilteredData();
  }

  getList(): void {
    const s = this.apiService.getData(`/pokemon?limit=${this.limit}&offset=${this.items.length}`).subscribe({
      next: (value:ListOutput) => {
        value.results.forEach((x)=>{
          const item: ListDataFilter = {
            name: x.name,
            url: x.url,
            favorite: false,
            types: '',
          };
          this.generalService.setListDataFilter(item);
        })
        if(this.items.length === 12) {
          this.filteredData = this.items;
        }
      },
    });
    this.subscriptions.push(s);
  }

  setFilteredData(): void {
    this.filteredData = [];
    if(this.typeValue !== allTypesPlaceholder && this.typeValue !== '') {
      this.items.forEach(x=>{
        if(x.types.includes(this.typeValue)) {
          this.filteredData.push(x);
        }
      })
    }
    else {
      this.filteredData = this.items;
    }
    this.load.full = false;
    this.load.part = false;
  }

  loadMoreFilteredData(): void {
    if (this.load.part) {
      return;
    }
    this.load.part = true;
    setTimeout(() => {
      this.getList();
      this.setFilteredData();
    }, 2000);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight - (scrollTop + clientHeight) < threshold) {
      this.loadMoreFilteredData();
    }
  }

  // function placeholder
  trackById(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
