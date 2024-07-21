import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ListDataFilter, ListOutput } from '../../interfaces/api';
import { DetailComponent } from '../detail/detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { GeneralService } from '../../services/general.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    DetailComponent,
    MatGridListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CapitalizePipe,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() favoritesOnly: boolean = false;
  items: ListDataFilter[] = [];
  loading = false;
  inc = 12;
  types: string[] = [];
  allTypesPlaceholder = 'All Types';
  type = new FormControl(this.allTypesPlaceholder);
  limit = this.items.length + this.inc;
  oldTypeValue = '';
  typeValue = '';
  filteredData: ListDataFilter[] = [];
  private threshold = 50; // Distance from bottom to trigger loading
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    this.toggleScrollPosition();
    this.getTypes();
    this.type.valueChanges.subscribe(value => {
      this.typeValue = String(value);
      this.loading = true;
      this.getData();
    });
    this.generalService.listDataFilter$.subscribe(value => {
      this.items = value
    });
  }

  setScrollPosition(y: number) {
    window.scrollTo({
      top: y,
      behavior: 'smooth' // Optional: for smooth scrolling
    });
  }

  getTypes(): void {
    const s = this.apiService.getData('/type').subscribe({
      next: (value:ListOutput) => {
        this.types.push(this.allTypesPlaceholder);
        value.results.forEach((x)=>{
          this.types.push(x.name);
        })
      },
      error: (error) => { console.error(error)},
    });
    this.subscriptions.push(s);
  }

  getData(): void {
    const s = this.apiService.getData(`/pokemon?limit=${this.limit}&offset=${this.items.length}`).subscribe({
      next: (value:ListOutput) => {
        this.filteredData = [];
        this.items = [];
        value.results.forEach((x)=>{
          const item: ListDataFilter = {
            name: x.name,
            url: x.url,
            favorite: false,
            types: '',
          };
          this.generalService.setListDataFilter(item);
        })
        if(this.typeValue !== this.allTypesPlaceholder) {
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
      },
      error: () => {
        this.loading = false;
      },
    });
    this.subscriptions.push(s);

  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight - (scrollTop + clientHeight) < this.threshold && !this.loading && (this.oldTypeValue === '' || this.typeValue === '' || this.typeValue !== this.oldTypeValue)) {
      this.loadMoreItems();
    }
  }

  loadMoreItems(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.limit = this.items.length + this.inc;
      this.getData();
      this.oldTypeValue = this.typeValue;
    }, 1000);
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

  // function placeholder
  trackById(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
