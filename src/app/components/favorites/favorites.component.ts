import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListDataFilter } from '../../interfaces/api';
import { allTypesPlaceholder, inc, threshold } from '../../mock/mock';
import { GeneralService } from '../../services/general.service';
import { LoadingComponent } from '../loading/loading.component';
import { SearchTypeComponent } from '../search-type/search-type.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { DetailComponent } from '../detail/detail.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { InfiniteLoadService } from '../../services/infinite-load.service';
@Component({
  selector: 'app-favorites',
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
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  items: ListDataFilter[] = [];
  limit = this.items.length + inc;
  typeValue = '';
  favoritedData: ListDataFilter[] = [];
  load = {
    part: false,
    full: false,
  }
  private subscriptions: Subscription[] = [];

  constructor(
    private generalService: GeneralService,
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
      this.items.forEach(x=>{
        if(x.favorite) {
          this.favoritedData.push(x);
        }
      })
    }
    this.load.full = false;
    this.load.part = false;
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight - (scrollTop + clientHeight) < threshold) {
      this.loadMoreFavoriteData();
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
