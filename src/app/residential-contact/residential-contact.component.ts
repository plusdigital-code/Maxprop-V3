import { Component, OnInit } from '@angular/core';
import { FormioResourceIndexComponent } from 'angular-formio/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ViewChild } from '@angular/core';
import { type } from 'os';

type TabType = 'all' | 'myListing'

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
  public tabType:TabType = 'myListing';
  public firstName: any;
  public lastName: any;
  public email: any;

    
  ngOnInit() {
    let userData = JSON.parse(localStorage.getItem('formioAppUser'));
    this.email = userData.data.email;
    this.gridData();
  }


  onRowClicked(event) {
    const url = window.location.href;
    window.open(`/#/contact/${event.data.id}/view`, '_blank');
  }

  newListing() {
    this.router.navigate([`/residential/new`]);
  }

  allListing() {
    this.tabType = 'all'
    this.gridData();
  }

  myListing() {
    this.tabType = 'myListing'
    this.gridData();
  }

  gridData() {  
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');
    
    let searchFilters = ''
    if(this.tabType == 'myListing'){
      searchFilters = '&data.email=' + this.email;
    }
    

    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/contact/submission?sort=-modified&skip=0' + searchFilters +  '&limit=100&select=data.residentials1.data.address.formatted_address,data.fullName,data.email,data.mobile,data.message,data.source,_id', { headers })
      .subscribe((res) => {
        this.data = [];
        res.forEach(element => {
          if (this.tabType == 'myListing'  && this.email == element.data.email) {
            return this.data.push({
              "mandate": element.data.residentials1.data ? element.data.residentials1.data.address.formatted_address : '-',
              "fullName": element.data.fullName,
              "email": element.data.email,
              "mobile": element.data.mobile != '' ? element.data.mobile  : '-',
              "message": element.data.message,
              "leadSource": element.data.source,
              "id": element._id,
            });
          }
          if (this.tabType == 'all') {
            return this.data.push({
              "mandate": element.data.residentials1.data ? element.data.residentials1.data.address.formatted_address : '-',
              "fullName": element.data.fullName,
              "email": element.data.email,
              "mobile": element.data.mobile != '' ? element.data.mobile  : '-',
              "message": element.data.message,
              "leadSource": element.data.source,
              "id": element._id,
            });
          }
        });
        this.rowData = this.data;
      })

  }
}


