import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  
  headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6').set('content-type', 'application/json');
  url__suburb = 'https://whitefang-digitaloffice.form.io/form/5e32e29447be7a9c1c2bbfe2/submission?limit=100000&skip=0&sort=-created&select=_id,data.city,created,modified,data.province.data.province';

  constructor(private http: HttpClient) {
  }

  getGridData(){
    return this.http.get<any[]>(this.url__suburb , {headers:this.headers})
  }
}
