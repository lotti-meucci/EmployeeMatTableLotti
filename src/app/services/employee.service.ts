import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerData } from '../types/server-data';

const PAGE_SIZE = 10;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  getData(url: string, page?: number, size?: number): Observable<ServerData> {
    return this.http.get<ServerData>(url, {
      params: new HttpParams()
        .set('page', page ?? 0)
        .set('size', size ?? PAGE_SIZE)
    })
  }

  deleteData(url: string, id: number): Observable<unknown> {
    return this.http.delete(url + '/' + id);
  }
}
