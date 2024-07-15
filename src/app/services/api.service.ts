import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../mock/mock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = baseURL;
  constructor(private http: HttpClient) { }

  // GET request
  getData(params:string = ''): Observable<any> {
    return this.http.get<any>(`${this.url}${params}`);
  }

}
