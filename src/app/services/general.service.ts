import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListDataFilter } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private _listDataFilter = new BehaviorSubject<ListDataFilter[]>([]);
  listDataFilter$ = this._listDataFilter.asObservable();
  private _favorite = new BehaviorSubject<string[]>([]);
  favorite$ = this._favorite.asObservable();

  setListDataFilter(item:ListDataFilter): void {
    const currentItems = this._listDataFilter.getValue();
    const updatedItems = [...currentItems, item];
    this._listDataFilter.next(updatedItems);
  }

  setTypesStr(url: string, typesStr:string ): void {
    let list = this._listDataFilter.getValue();
    const idx = list.findIndex(x=>x.url===url);
    list[idx].types = typesStr;
    this._listDataFilter.next(list);
  }

  setFavoritesFlag(url: string, flag:boolean ): void {
    const currentItems = this._favorite.getValue();
    const updatedItems = [...currentItems, url];
    this._favorite.next(updatedItems);

    let list = this._listDataFilter.getValue();
    const idx = list.findIndex(x=>x.url===url);
    list[idx].favorite = flag;
    this._listDataFilter.next(list);
  }
}
