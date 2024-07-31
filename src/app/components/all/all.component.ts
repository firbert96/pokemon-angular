import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListDataFilter, ListOutput } from '../../interfaces/api';
import { allTypesPlaceholder, inc } from '../../mock/mock';
import { GeneralService } from '../../services/general.service';
import { LoadingComponent } from '../loading/loading.component';
import { SearchTypeComponent } from '../search-type/search-type.component';
import { ApiService } from '../../services/api.service';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { DetailComponent } from '../detail/detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
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
  loading = false;
  private threshold = 50; // Distance from bottom to trigger loading
  private subscriptions: Subscription[] = [];

  constructor(
    private generalService: GeneralService,
    private apiService: ApiService,
  ) {}

  get allTypesPlaceholder() {
    return allTypesPlaceholder;
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.toggleScrollPosition();
    this.getList();
    this.generalService.type$.subscribe((value) => {
      this.typeValue = String(value);
      this.loadMoreFilteredData();
    });
    this.generalService.listDataFilter$.subscribe(value => {
      this.items = value;
    });
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

  setScrollPosition(y: number) {
    window.scrollTo({
      top: y,
      behavior: 'smooth' // Optional: for smooth scrolling
    });
  }

  // Optional: Method to listen to key events if needed
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') { // Or any key of your choice
      this.toggleScrollPosition();
    }
  }

  // Method to toggle scroll position
  toggleScrollPosition() {
    const currentScroll = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (currentScroll === 0) {
      // If at the top, scroll to the bottom
      this.setScrollPosition(maxScroll);
    } else {
      // If not at the top, scroll to the top
      this.setScrollPosition(0);
    }
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
    this.loading = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight - (scrollTop + clientHeight) < this.threshold) {
      this.loadMoreFilteredData();
    }
  }

  loadMoreFilteredData(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.getList();
      this.setFilteredData();
    }, 2000);
  }

  // function placeholder
  trackById(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
