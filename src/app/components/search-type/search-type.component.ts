import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { allTypesPlaceholder } from '../../data/data';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ListOutput } from '../../interfaces/api';
@Component({
  selector: 'app-search-type',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CapitalizePipe,
  ],
  templateUrl: './search-type.component.html',
  styleUrl: './search-type.component.scss',
})
export class SearchTypeComponent implements OnInit, OnDestroy  {
  @Output() typeValue: EventEmitter<string> = new EventEmitter<string>();
  type = new FormControl('');
  types: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.type.setValue(allTypesPlaceholder);
    this.getTypes();
    this.type.valueChanges.subscribe(value => {
      this.typeValue.emit(String(value));
    });
  }

  getTypes(): void {
    const s = this.apiService.getData('/type').subscribe({
      next: (value:ListOutput) => {
       this.types.push(allTypesPlaceholder);
        value.results.forEach((x)=>{
          this.types.push(x.name);
        })
      },
      error: (error) => { console.error(error)},
    });
    this.subscriptions.push(s);
  }

  // function placeholder
  trackById(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el=>{el.unsubscribe()})
  }
}
