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
import { FormioAuthService } from 'angular-formio/auth';


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
    { headerName: 'Updated', width: 100, field: 'lastUpdated', filter: 'agDateColumnFilter', sortable: true,   cellRenderer: (params) => {
      return  this.datepipe.transform(params.value, 'dd/MM/yyyy');
    } },
    { headerName: 'Primary Property Practitioner', width: 120, field: 'primaryProperty', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Commercial Type', width: 120, field: 'commercialType', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'City', width: 70, field: 'cityRef', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Suburb', width: 80, field: 'suburbRef', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Address', width: 220, field: 'address', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Listing Type', width: 100, field: 'listingType', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Price', width: 80, field: 'price', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'F Size', width: 90, field: 'floorSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Off.Size', width: 90, field: 'officeSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'F/WH Size', width: 90, field: 'factoryWarehouseSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'R Size', width: 90, field: 'retailSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Y Size', width: 90, field: 'yardSpace', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'L Size', width: 90, field: 'landSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Seller Name', width: 150, field: 'sellerName',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Mobile', width: 150, field: 'sellerMobile',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Work Number', width: 150, field: 'sellerWorkNumber',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Email', width: 150, field: 'sellerEmail',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Code', width: 120, field: 'code', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Status', width: 80, field: 'listingStatus', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Created', width: 100, field: 'createdTime', filter: 'agDateColumnFilter', sortable: true,   cellRenderer: (params) => {
      return  this.datepipe.transform(params.value, 'dd/MM/yyyy');
    } },
    { headerName: 'Mandate Status', width: 120, field: 'mandateStatus', filter: 'agTextColumnFilter', sortable: true }, 
    { headerName: 'PPID', width: 100, field: 'privateProperty', filter: 'agTextColumnFilter', cellRenderer: (data) => {
      if(data.value == 1 || data.value == ''){
        return "-";
       }else{
        return `${data.value}`
       }
      },
        sortable: true },
    {
      headerName: 'PP', width: 100, field: 'ppLink', cellRenderer: (data) => {
        if (!data.value) {
          return
        }
        if(data.value == 1 || data.value == ''){
          return "-"
        }else{
        return `<a href= ${data.value}
      target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
      }
    }, sortable: true
    },
    { headerName: 'P24ID', width: 100, field: 'property24', filter: 'agTextColumnFilter', cellRenderer: (data) => {
      if (!data.value) {
        return
      }
      if(data.value == 1 || data.value == ''){
        return "-";
       }else{
        return `${data.value}`
       }
      }, sortable: true },
    {
      headerName: 'P24', width: 100, field: 'p24Link', cellRenderer: (data) => {
        if (!data.value) {
          return
        }
        if(data.value == 1 || data.value == ''){
          return "-"
        }else{
        return `<a href= ${data.value}
      target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
      }
    },
      sortable: true
    },
    {
      headerName: 'Listing Brochure', width: 100, field: 'houseBrochure', cellRenderer: (data) => {
      //   return `<a href= https://properties-digital-office.s3-us-west-2.amazonaws.com/brochures/detail/${data.value}.pdf
      // target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
      return `<a href= ${data.value}
      target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
    },
      sortable: true
    },
    {
      headerName: 'House Brochure', width: 100, field: 'houseBrochure', cellRenderer: (data) => {
       
        return `<a href= ${data.value}
      target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
    },
      sortable: true
    },

  ];


  rowData: any;


  constructor(private http: HttpClient, private router: Router, public datepipe: DatePipe,public auth: FormioAuthService) {

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
  cellClicked(event) {
    let value = event.colDef.headerName;
    if (value == 'PP' || value == 'P24' || value == 'Listing Brochure' || value == 'House Brochure') {
      return;
    }

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
    if(!this.auth.authenticated){
			this.router.navigate(['/auth/login']);
    }
    this.gridData(this.a);
  }
  gridData(a) {
    this.a = a;
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');
    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/commercial1/submission?sort=-modified&skip=0&limit=1000', { headers })
      .subscribe((res) => {
        this.data = [];
        res.forEach(element => {
          let userName = `${element.data.user.data.firstName + element.data.user.data.lastName ? element.data.user.data.firstName + element.data.user.data.lastName : ''}`;
          if (a == element.data.listingStatus || a == userName) {
            return this.data.push({
              "address": element.data.address.formatted_address,
              "listingType": element.data.listingType,
              "suburbRef": element.data.suburbRef.data?element.data.suburbRef.data.suburb:'-',
              "cityRef": element.data.cityRef.data?element.data.cityRef.data.city:'-',
              "commercialType": element.data.commercialType.data ? element.data.commercialType.data.commercialType : '-',
              "mandateStatus": element.data.mandateStatus,
              "floorSize": element.data.floorSizeInfo.floorSize?Number(element.data.floorSizeInfo.floorSize).toLocaleString('en-GB'):'-',
              "landSize": element.data.sizeLandSizeInfo.landSize?Number(element.data.sizeLandSizeInfo.landSize).toLocaleString('en-GB'):'-',
              "factoryWarehouseSize": element.data.factoryWarehouseSize?Number(element.data.factoryWarehouseSize).toLocaleString('en-GB'):'-',
              "officeSize": element.data.officeSize?Number(element.data.officeSize).toLocaleString('en-GB'):'-',
              "retailSize": element.data.retailSize?Number(element.data.retailSize).toLocaleString('en-GB'):'-',
              "yardSpace": element.data.yardSpace?Number(element.data.yardSpace).toLocaleString('en-GB'):'-',
              "listingStatus": element.data.listingStatus,
              "code": element.data.mandateMetaData.code,
              "primaryProperty": element.data.user.data ? element.data.user.data.firstName + " " + element.data.user.data.lastName : '-',
              "price": element.data.price?Number(element.data.price).toLocaleString('en-GB'):'-',
              "id": element._id,
              "createdTime": new Date(element.created),
              "lastUpdated": new Date(element.created),
              "sellerName": element.data.sellerName?element.data.sellerName:'-',
              "sellerMobile": element.data.sellerMobile?element.data.sellerMobile:'-',
              "sellerWorkNumber": element.data.sellerWorkNumber?element.data.sellerWorkNumber:'-',
              "sellerEmail": element.data.sellerEmail?element.data.sellerEmail:'-',
              "property24": element.data.property24.p24ID?element.data.property24.p24ID:'-',
              "privateProperty": element.data.privateProperty.ppID?element.data.privateProperty.ppID:'-',
              "p24Link": element.data.property24.p24ID ? element.data.property24.p24Link:1,
              "ppLink": element.data.privateProperty.ppID?element.data.privateProperty.ppLink:1,
              "listingBrochure":element.data.codeDisplay,
              "houseBrochure":element.data.brochures.showHouseBrochure
            });
          }
        });
        this.rowData = this.data;
      })
  }


}