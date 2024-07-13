import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // GET request
  getData(params:string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${params}`);
  }

}
