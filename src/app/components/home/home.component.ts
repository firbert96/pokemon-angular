import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ListComponent } from '../list/list.component';
import { GeneralService } from '../../services/general.service';
import { ApiService } from '../../services/api.service';
import { ListDataFilter, ListOutput } from '../../interfaces/api';
import { allTypesPlaceholder, inc } from '../../mock/mock';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    ListComponent,
    CommonModule,
    MatTabsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  types: string[] = [];
  items: ListDataFilter[] = [];
  limit = this.items.length + inc;
  filteredData: ListDataFilter[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private generalService: GeneralService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getList();
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
