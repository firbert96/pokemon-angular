import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { DetailLiteOutput, DetailOutput, Types } from '../../interfaces/api';
import { baseURL } from '../../mock/mock';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GeneralService } from '../../services/general.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatChipsModule,
    NgxSkeletonLoaderModule,
    MatTooltipModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input() urlParams: string = '';
  @Input() favorite: boolean = false;
  data!: DetailOutput;
  detail: DetailLiteOutput[] = [];
  name = '';
  urlSound = '';
  types: Types[] = [];
  url = baseURL;
  private subscriptions: Subscription[] = [];
  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
  ) { }

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
    this.urlSound = this.data.cries.latest;
    this.types = this.data.types;
    this.setTypesForListDataFilter()
    this.detail = [
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

  setTypesForListDataFilter(): void {
    let res = '';
    this.types.forEach(x=>{
      res += x.type.name+'|';
    })
    this.generalService.setTypesStr(this.urlParams,res);
  }

  updateItemValue(key: string, newValue: number| string): void {
    const index = this.detail.findIndex(item => item.key === key);
    if (index !== -1) {
      this.detail[index].value = newValue;
    }
  }

  isPlaying = false;
  isDisabled = false;
  @ViewChild('audio', { static: false }) audio!: ElementRef<HTMLAudioElement>;

  togglePlayPause(): void {
    if (this.isDisabled) {
      return;
    }
    this.isDisabled = true;
    this.audio.nativeElement.play();
    this.isPlaying = true;
    setTimeout(()=>{
      this.isPlaying = false;
      this.audio.nativeElement.pause();
      this.isDisabled = false;
    },1000);
  }

  favoriteClick(): void {
    console.log('favoriteClick');
    this.favorite = !this.favorite;
    this.generalService.setFavoritesFlag(this.urlParams, this.favorite);
  }

  // function placeholder
  trackById(index: number): number {
    return index;
  }

  onKeyPress(event: KeyboardEvent): void {}

  onKeyDown(event: KeyboardEvent): void {}

  onKeyUp(event: KeyboardEvent): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
