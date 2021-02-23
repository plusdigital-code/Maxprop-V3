import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SuburbService {

  headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6').set('content-type', 'application/json');
  url__suburb = 'https://whitefang-digitaloffice.form.io/form/5e32e215c8fecf479808d32c/submission?limit=100000&skip=0&sort=-created&select=_id,data.suburb,created,modified,data.city.data.city';

  constructor(private http: HttpClient) {
  }

  getGridData(){
    return this.http.get<any[]>(this.url__suburb , {headers:this.headers})
  }
  
}
