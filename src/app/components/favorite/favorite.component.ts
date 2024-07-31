import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListDataFilter } from '../../interfaces/api';
import { allTypesPlaceholder, inc } from '../../mock/mock';
import { GeneralService } from '../../services/general.service';
import { LoadingComponent } from '../loading/loading.component';
import { SearchTypeComponent } from '../search-type/search-type.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { DetailComponent } from '../detail/detail.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    CommonModule,
    DetailComponent,
    MatGridListModule,
    MatIconModule,
    EmptyStateComponent,
    LoadingComponent,
    SearchTypeComponent,
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit, OnDestroy {
  items: ListDataFilter[] = [];
  limit = this.items.length + inc;
  typeValue = '';
  favoritedData: ListDataFilter[] = [];
  load = {
    part: false,
    full: false,
  }
  private threshold = 50; // Distance from bottom to trigger loading
  private subscriptions: Subscription[] = [];

  constructor(
    private generalService: GeneralService,
  ) {}

  get allTypesPlaceholder() {
    return allTypesPlaceholder;
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.toggleScrollPosition();
    this.generalService.favorite$.subscribe(() => {
      this.load.full = true;
      this.loadMoreFavoriteData();
    });
    this.generalService.listDataFilter$.subscribe(value => {
      this.items = value;
    });
  }

  setTypeValue(event: string): void {
    this.typeValue = event;
    this.load.full = true;
    this.loadMoreFavoriteData();
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

  setFavoriteData(): void {
    this.favoritedData = [];
    if(this.typeValue !== allTypesPlaceholder && this.typeValue !== '') {
      this.items.forEach(x=>{
        if(x.types.includes(this.typeValue) && x.favorite) {
          this.favoritedData.push(x);
        }
      })
    }
    else {
      console.log('else', this.items);

      this.items.forEach(x=>{
        if(x.favorite) {
          this.favoritedData.push(x);
        }
      })
      console.log('else 1', this.favoritedData);
    }
    this.load.full = false;
    this.load.part = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight - (scrollTop + clientHeight) < this.threshold) {
      this.loadMoreFavoriteData();
    }
  }

  loadMoreFavoriteData(): void {
    if (this.load.part) {
      return;
    }
    this.load.part = true;
    setTimeout(() => {
      this.setFavoriteData();
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
