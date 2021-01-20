import { Component, OnInit } from '@angular/core';
import { FormioResourceIndexComponent } from 'angular-formio/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-residential-contact',
  templateUrl: './residential-contact.component.html',
  styleUrls: ['./residential-contact.component.scss']
})
export class ResidentialContactComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  public data = [];
  public res: string[] = [];

  columnDefs = [
    { headerName: 'Mandate ', width: 270, field: 'mandate', filter: 'agTextColumnFilter',sortable: true  },

    { headerName: ' Lead Source ', width: 200, field: 'leadSource', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Name', width: 200, field: 'fullName', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Email', width: 262, field: 'email', filter: 'agTextColumnFilter',sortable: true  },
    { headerName: 'Mobile', width: 170, field: 'mobile', filter: 'agNumberColumnFilter',sortable: true  },
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
  public a = '';
  public firstName: any;
  public lastName: any;
  public email: any;


  onRowClicked(event) {
    const url = window.location.href;
    window.open(`/#/contact/${event.data.id}/view`, '_blank');
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
  gridData(a) {
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');

    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/contact/submission?sort=-modified&skip=0&limit=1000', { headers })
      .subscribe((res) => {
        this.data = [];
        res.forEach(element => {
          if (a == element.data.email) {
            return this.data.push({
              "mandate": element.data.residentials1.data ? element.data.residentials1.data.address.formatted_address : '-',
              "fullName": element.data.fullName,
              "email": element.data.email,
              "mobile": element.data.mobile,
              "message": element.data.message,
              "leadSource": element.data.source,
              "id": element._id,
            });
          }
          if (a == 'all') {
            return this.data.push({
              "mandate": element.data.residentials1.data ? element.data.residentials1.data.address.formatted_address : '-',
              "fullName": element.data.fullName,
              "email": element.data.email,
              "mobile": element.data.mobile,
              "message": element.data.message,
              "leadSource": element.data.source,
              "id": element._id,
            });
          }
        });
        this.rowData = this.data;
      })

  }
  ngOnInit() {
    let userData = JSON.parse(localStorage.getItem('formioAppUser'));
    this.email = userData.data.email;
    this.gridData(this.a);
  }


}


