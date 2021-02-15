import { Component, OnInit, ViewChild } from '@angular/core';
import { FormioResourceIndexComponent } from 'angular-formio/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { DatePipe } from '@angular/common';



import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { InstantiateExpr } from '@angular/compiler';


@Component({
  selector: 'app-commercial-index',
  templateUrl: './commercial-index.component.html',
  styleUrls: ['./commercial-index.component.scss']
})
export class CommercialIndexComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'my-app';
  public data = [];
  public res: string[] = [];

  columnDefs = [
    { headerName: 'Status', width: 80, field: 'listingStatus', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Created', width: 100, field: 'createdTime', filter: 'agDateColumnFilter', sortable: true,   cellRenderer: (params) => {
      return  this.datepipe.transform(params.value, 'dd/MM/yyyy');
    } },
    { headerName: 'Updated', width: 100, field: 'lastUpdated', filter: 'agDateColumnFilter', sortable: true,   cellRenderer: (params) => {
      return  this.datepipe.transform(params.value, 'dd/MM/yyyy');
    } },
    { headerName: 'Listing Type', width: 120, field: 'listingType', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'City', width: 120, field: 'cityRef', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Suburb', width: 120, field: 'suburbRef', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Commercial Type', width: 120, field: 'commercialType', filter: 'agTextColumnFilter', sortable: true },

    { headerName: 'Mandate Status', width: 120, field: 'mandateStatus', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Code', width: 120, field: 'code', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Primary Property Practitioner', width: 120, field: 'primaryProperty', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Price', width: 120, field: 'price', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Address', width: 240, field: 'address', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Floor Size', width: 120, field: 'floorSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Office Size', width: 120, field: 'officeSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Factory/Warehouse Size', width: 120, field: 'factoryWarehouseSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Retail Size', width: 120, field: 'retailSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Yard Size', width: 120, field: 'yardSpace', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Land Size', width: 120, field: 'landSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Seller Name', width: 150, field: 'sellerName',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Mobile', width: 150, field: 'sellerMobile',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Work Number', width: 150, field: 'sellerWorkNumber',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Email', width: 150, field: 'sellerEmail',filter: 'agTextColumnFilter', sortable: true }
  ];


  rowData: any;


  constructor(private http: HttpClient, private router: Router, public datepipe: DatePipe) {

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
  onRowClicked(event) {
    const url = window.location.href;
    window.open(`/#/commercial/${event.data.id}/view`, '_blank');
  }

  newListing() {
    this.router.navigate([`/commercial/new`]);
  }
  myListing() {
    let head = this.firstName + this.lastName;
    if(isNaN(head)){
      head = 'myListing'
    }
    this.gridData(head);
  }

  clearFilters() {
    this.a = 'active';
    this.ngOnInit();
  }

  ngOnInit() {
    this.gridData(this.a);
  }
  gridData(a) {
    this.a = a;
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');
    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/commercial1/submission?data.user.data.office._id=60105dec311325c21d5c0799&sort=-modified&skip=0&limit=1000', { headers })
      .subscribe((res) => {
        this.data = [];
        res.forEach(element => {
          let userName = `${element.data.user.data.firstName + element.data.user.data.lastName ? element.data.user.data.firstName + element.data.user.data.lastName : ''}`;
          if (a == element.data.listingStatus || a == userName) {
            return this.data.push({
              "address": element.data.address.formatted_address,
              "listingType": element.data.listingType,
              "suburbRef": element.data.suburbRef.data?element.data.suburbRef.data.suburb:'',
              "cityRef": element.data.cityRef.data?element.data.cityRef.data.city:'',
              "commercialType": element.data.commercialType.data ? element.data.commercialType.data.commercialType : '',
              "mandateStatus": element.data.mandateStatus,
              "floorSize": element.data.floorSizeInfo.floorSize,
              "landSize": element.data.sizeLandSizeInfo.landSize,
              "factoryWarehouseSize": element.data.factoryWarehouseSize,
              "officeSize": element.data.officeSize,
              "retailSize": element.data.retailSize,
              "yardSpace": element.data.yardSpace,
              "listingStatus": element.data.listingStatus,
              "code": element.data.mandateMetaData.code,
              "primaryProperty": element.data.user.data ? element.data.user.data.firstName + " " + element.data.user.data.lastName : '',
              "price": element.data.price,
              "id": element._id,
              "createdTime": new Date(element.created),
              "lastUpdated": new Date(element.created),
              "sellerName": element.data.sellerName?element.data.sellerName:'-',
              "sellerMobile": element.data.sellerMobile?element.data.sellerMobile:'-',
              "sellerWorkNumber": element.data.sellerWorkNumber?element.data.sellerWorkNumber:'-',
              "sellerEmail": element.data.sellerEmail?element.data.sellerEmail:'-',
            });
          }
        });
        this.rowData = this.data;
      })
  }


}