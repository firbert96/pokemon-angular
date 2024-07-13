import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { DetailOutput } from '../../interfaces/api';
import { baseURL } from '../../mock/mock';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input() urlParams: string = '';
  data!:DetailOutput;
  url = baseURL;
  private subscriptions: Subscription[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const params = this.urlParams.replace(this.url,'');
    const s = this.apiService.getData(params).subscribe({
      next: (value:DetailOutput) => { this.data = value },
      error: (error) => { console.error(error)},
    });
    this.subscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
