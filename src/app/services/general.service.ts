import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListDataFilter } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private _listDataFilter = new BehaviorSubject<ListDataFilter[]>([]);
  listDataFilter$ = this._listDataFilter.asObservable();

  setListDataFilter(item:ListDataFilter): void {
    const currentItems = this._listDataFilter.getValue();
    const updatedItems = [...currentItems, item];
    this._listDataFilter.next(updatedItems);
  }
}
