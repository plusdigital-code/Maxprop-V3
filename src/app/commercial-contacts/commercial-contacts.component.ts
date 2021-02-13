import { Component, OnInit, ViewChild } from '@angular/core';
import { FormioResourceIndexComponent } from 'angular-formio/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


@Component({
  selector: 'app-commercial-contacts',
  templateUrl: './commercial-contacts.component.html',
  styleUrls: ['./commercial-contacts.component.scss']
})
export class CommercialContactsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  public data = [];
  public res: string[] = [];

  columnDefs = [
    { headerName: 'Lead Source', width: 170, field: 'leadSource', filter: 'agTextColumnFilter', sortable: true },

    { headerName: ' Status ', width: 170, field: 'status', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Full Name', width: 170, field: 'fullName', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Email', width: 170, field: 'email', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Mobile', width: 170, field: 'mobile', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Message', width: 250, field: 'message', filter: 'agTextColumnFilter', sortable: true }
  ];

  rowData: any;


  constructor(private http: HttpClient, private router: Router) {

  }

  gridOptions: {
    // enables pagination in the grid
    pagination: true,

    // sets 10 rows per page (default is 100)
    paginationPageSize: 17,

    // other options
  }
  public a = 'active';
  public firstName: any;
  public lastName: any;
  public email: any;

  onRowClicked(event) {
    const url = window.location.href;
    window.open(`/#/commercial-contact/${event.data.id}/view`, '_blank');
  }

  newListing() {
    this.router.navigate([`/residential/new`]);
  }
  allListing() {
    this.gridData('all');
  }
  myListing() {
    this.gridData(`${this.email}`);
  }
  clearFilters() {
    this.ngOnInit();
  }

  gridData(a) {
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');

    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/commercialcontact/submission?sort=-modified&skip=0&data.commercial1.data.user.data.email=' + this.email + '&limit=1000&select=data.commercial1.data.address.formatted_address,data.fullName,data.email,data.mobile,data.message,data.source,_id', { headers })
      // .get<any[]>('https://whitefang-digitaloffice.form.io/commercialcontact/submission?sort=-modified&skip=0&limit=300', { headers })
      .subscribe((res) => {
        this.data = [];
        res.forEach(element => {
          return this.data.push({
            "status": element.data.status ? element.data.fullName : '-',
            "fullName": element.data.fullName,
            "email": element.data.email,
            "mobile": element.data.mobile,
            "message": element.data.message,
            "leadSource": element.data.source,
            "id": element._id,
          });
        })
        this.rowData = this.data;
      })

  }
  ngOnInit() {
    let userData = JSON.parse(localStorage.getItem('formioAppUser'));
    this.email = userData.data.email;
    this.a = this.email;
    this.gridData(`${this.email}`);
    // this.gridData(this.a);
  }


}


