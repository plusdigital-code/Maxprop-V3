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
  selector: 'app-commercial-index',
  templateUrl: './commercial-index.component.html',
  styleUrls: ['./commercial-index.component.scss']
})
export class CommercialIndexComponent  implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'my-app';
  public data = [];
  public res: string[] = [];

  columnDefs = [
    { headerName: 'Status',width: 80, field: 'listingStatus',filter: 'agTextColumnFilter', },
    { headerName: 'Created', width: 100 ,field: 'createdTime', filter: 'agDateColumnFilter', cellRenderer: (data) => {
      return data.value ? (new Date(data.value)).toLocaleDateString() : '';
  }, sortable: true },
  { headerName: 'Updated', width: 100 ,field: 'lastUpdated', filter: 'agDateColumnFilter', cellRenderer: (data) => {
    return data.value ? (new Date(data.value)).toLocaleDateString() : '';
}, sortable: true },
    { headerName: 'Type', width: 120, field: 'listingType',filter: 'agTextColumnFilter', },
    { headerName: 'Mandate Status', width: 120, field: 'mandateStatus',filter: 'agTextColumnFilter', },
    { headerName: 'Code', width: 120, field: 'code',filter: 'agTextColumnFilter', },
    { headerName: 'Primary Property Practitioner',width: 120, field: 'primaryProperty',filter: 'agTextColumnFilter', },
    { headerName: 'Price', width: 120, field: 'price',filter: 'agNumberColumnFilter', },
    { headerName: 'Address', width: 240, field: 'address',filter: 'agTextColumnFilter', },
    { headerName: 'Floor Size', width: 120, field: 'floorSize',filter: 'agNumberColumnFilter', },
    { headerName: 'Office Size', width: 120, field: 'officeSize',filter: 'agNumberColumnFilter', },
    { headerName: 'Factory/Warehouse Size', width: 120, field: 'factoryWarehouseSize',filter: 'agNumberColumnFilter', },
    { headerName: 'Retail Size', width: 120, field: 'retailSize',filter: 'agNumberColumnFilter', },
    { headerName: 'Yard Size', width: 120, field: 'yardSpace',filter: 'agNumberColumnFilter', },
    { headerName: 'Land Size', width: 120, field: 'landSize',filter: 'agNumberColumnFilter', },
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

onRowClicked(event) {
  const url = window.location.href;
  window.open(`/#/commercial/${event.data.id}/view`, '_blank');
  }

  newListing(){
    this.router.navigate([`/commercial/new`]);
  }
  ngOnInit() {
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');

    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/commercial1/submission?sort=-modified&skip=0&limit=1000', { headers })
      .subscribe((res) => {
        res.forEach(element => {
          return this.data.push({
            "address": element.data.address.formatted_address,
            "listingType": element.data.listingType,
            "mandateStatus": element.data.mandateStatus,
            "floorSize": element.data.floorSizeInfo.floorSize,
            "landSize": element.data.sizeLandSizeInfo.landSize,
            "factoryWarehouseSize": element.data.factoryWarehouseSize,
            "officeSize": element.data.officeSize,
            "retailSize": element.data.retailSize,
            "yardSpace": element.data.yardSpace,
            "listingStatus": element.data.listingStatus,
            "code": element.data.mandateMetaData.code,
            "primaryProperty": element.data.user.data?element.data.user.data.firstName+" "+element.data.user.data.lastName:'',
            "price": element.data.price,
            "id": element._id,
            "createdTime": element.data.createdTime,
            "lastUpdated": element.data.lastUpdated
          });
        });
        this.rowData = this.data;
      })
  }


}