import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommercialService {

    headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6').set('content-type', 'application/json');
    url__Commercial = 'https://whitefang-digitaloffice.form.io/commercial1/submission';

    constructor(private http: HttpClient) { }

    getGridData(params) {
        return this.http.get<any[]>(this.url__Commercial + params, { headers: this.headers });
    }
}
