import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../interfaces/tables';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getTables(): Observable<any> {
    // trae todos los bancos
    return this.http.get<Table>("http://localhost:3000/tables");
  }

  postTables(data: Table) {
    return this.http.post("http://localhost:3000/tables", data);
  }

  UpdateTable(id:string, data : Table) {
    return this.http.put("http://localhost:3000/tables/"+id, data);
  }

  deleteTable(id : string) {
    return this.http.delete("http://localhost:3000/tables/"+id);
  }

}
