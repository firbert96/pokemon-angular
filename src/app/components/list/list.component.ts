import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListDataFilter } from '../../interfaces/api';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { CardComponent } from '../card/card.component';
import { allTypesPlaceholder } from '../../mock/mock';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GeneralService } from '../../services/general.service';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CapitalizePipe,
    CardComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() favoritesOnly!: boolean;
  @Input() types!: string[];
  @Input() items!: ListDataFilter[];
  @Input() filteredData: ListDataFilter[] = [];
  @Output() getListEvent = new EventEmitter<void>();

  type = new FormControl('');
  typeValue = '';
  favoritedData: ListDataFilter[] = [];
  loading = {
    filter: false,
    favorite: false,
  }
  private threshold = 50; // Distance from bottom to trigger loading
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.initialize();
  }

  constructor(private generalService: GeneralService) {}

  initialize(): void {
    this.toggleScrollPosition();
    this.type.setValue(allTypesPlaceholder);
    // this.type.valueChanges.subscribe(value => {
    //   this.typeValue = String(value);
    //   this.loadMoreFilteredData();
    //   this.loadMoreFavoriteData();
    // });
    // this.generalService.favorite$.subscribe(() => {
    //   this.loadMoreFilteredData();
    //   this.loadMoreFavoriteData();
    // });
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
    this.loading.filter = false;
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
    this.loading.favorite = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight - (scrollTop + clientHeight) < this.threshold) {
      if(this.favoritesOnly) {
        this.loadMoreFavoriteData();
      }
      else {
        this.loadMoreFilteredData();
      }
    }
  }

  loadMoreFilteredData(): void {
    if (this.loading.filter) {
      return;
    }
    this.loading.filter = true;
    setTimeout(() => {
      this.getListEvent.emit();
      this.setFilteredData();
    }, 2000);
  }

  loadMoreFavoriteData(): void {
    if (this.loading.favorite) {
      return;
    }
    this.loading.favorite = true;
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
