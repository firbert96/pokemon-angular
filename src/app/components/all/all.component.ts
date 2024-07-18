import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ListOutput, Result } from '../../interfaces/api';
import { DetailComponent } from '../detail/detail.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { GeneralService } from '../../services/general.service';
@Component({
  selector: 'app-all',
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
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit, OnDestroy {
  items: Result[] = [];
  loading = false;
  inc = 12;
  types: string[] = [];
  type = new FormControl('');
  limit = this.items.length + this.inc;
  private threshold = 50; // Distance from bottom to trigger loading
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    this.getData('');
    this.getTypes();
    this.type.valueChanges.subscribe(value => {
      this.items = [];
      this.getData(value?? '');
    });
  }

  getTypes(): void {
    const s = this.apiService.getData('/type').subscribe({
      next: (value:ListOutput) => {
        value.results.forEach((x)=>{
          this.types.push(x.name);
        })
      },
      error: (error) => { console.error(error)},
    });
    this.subscriptions.push(s);
  }

  getData(type: string): void {
    const s = this.apiService.getData(`/pokemon?limit=${this.limit}&offset=${this.items.length}`).subscribe({
      next: (value:ListOutput) => {
        value.results.forEach((x)=>{

          const item: Result = {
            name: x.name,
            url: x.url,
            favorite: false,
          };
          this.items.push(item);

        })
      },
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
      this.limit = this.items.length + this.inc;
      this.getData(this.type.value ?? '')
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
