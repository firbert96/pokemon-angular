import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { DetailLiteOutput, DetailOutput, Types } from '../../interfaces/api';
import { baseURL } from '../../mock/mock';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatIconModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input() urlParams: string = '';
  data!: DetailOutput;
  detail: DetailLiteOutput[] = [];
  detailSubTitle: DetailLiteOutput[] = [];
  name = '';
  urlSound = '';
  url = baseURL;
  private subscriptions: Subscription[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const params = this.urlParams.replace(this.url,'');
    const s = this.apiService.getData(params).subscribe({
      next: (value:DetailOutput) => {
        this.data = value;
        this.setDetail();
      },
      error: (error) => { console.error(error)},
    });
    this.subscriptions.push(s);
  }

  setDetail(): void {
    this.name = this.data.name;
    this.urlSound = this.data.cries.latest,
    this.detailSubTitle = [
      {
        key: 'ID',
        value: this.data.id,
      },
      {
        key: 'EXP',
        value: this.data.base_experience,
      },
      {
        key: 'HP',
        value: 'Unknown',
      },
    ];
    this.detail = [
      {
        key: 'type',
        value: this.data.type,
      },
      {
        key: 'Attack',
        value: 'Unknown',
      },
      {
        key: 'Defense',
        value: 'Unknown',
      },
      {
        key: 'Special Attack',
        value: 'Unknown',
      },
      {
        key: 'Special Defense',
        value: 'Unknown',
      },
      {
        key: 'Speed',
        value: 'Unknown',
      },
    ]
    this.data.stats.forEach((x)=>{
      switch (x.stat.name) {
        case 'hp':
          this.updateItemValue('HP', x.base_stat);
          break;
        case 'attack':
          this.updateItemValue('Attack', x.base_stat);
          break;
        case 'defense':
          this.updateItemValue('Defense', x.base_stat);
          break;
        case 'special-attack':
          this.updateItemValue("Special Attack", x.base_stat);
          break;
        case 'special-defense':
          this.updateItemValue("Special Defense", x.base_stat);
          break;
        case 'speed':
          this.updateItemValue("Speed", x.base_stat);
          break;
      }
    })
  }

  updateItemValue(key: string, newValue: number| string | Types[]): void {
    const index = this.detail.findIndex(item => item.key === key);
    if (index !== -1) {
      this.detail[index].value = newValue;
    }
  }

  isPlaying = false;
  @ViewChild('audio', { static: false }) audio!: ElementRef<HTMLAudioElement>;

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.audio.nativeElement.pause();

    } else {
      this.audio.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  stop(): void {
    this.audio.nativeElement.pause();
    this.audio.nativeElement.currentTime = 0;
    this.isPlaying = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
