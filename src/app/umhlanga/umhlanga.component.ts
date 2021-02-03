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


@Component({
  selector: 'app-umhlanga',
  templateUrl: './umhlanga.component.html',
  styleUrls: ['./umhlanga.component.scss']
})
export class UmhlangaComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'my-app';
  public data = [];
  public res: string[] = [];

  columnDefs = [
    { headerName: 'Status',width: 80, field: 'listingStatus',filter: 'agTextColumnFilter', sortable: true },

    { headerName: 'Type', width: 80 ,field: 'listingType', filter: 'agTextColumnFilter',sortable: true  },
    { headerName: 'Created', width: 100, field: 'createdTime', filter: 'agDateColumnFilter', sortable: true,   cellRenderer: (params) => {
      return  this.datepipe.transform(params.value, 'dd/MM/yyyy');
    } },
    { headerName: 'Updated', width: 100, field: 'lastUpdated', filter: 'agDateColumnFilter', sortable: true,   cellRenderer: (params) => {
      return  this.datepipe.transform(params.value, 'dd/MM/yyyy');
    } },
    { headerName: 'Primary Property Practitioner',width: 160, field: 'primaryProperty',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Property Type', width: 120, field: 'propertyType',filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Price', width: 120, field: 'price',filter: 'agNumberColumnFilter',sortable: true  },
    { headerName: 'Suburb', width: 140, field: 'suburb',filter: 'agTextColumnFilter',sortable: true  },
    { headerName: 'Address', width: 180, field: 'address',filter: 'agTextColumnFilter',sortable: true  },
    { headerName: 'No. Of Bedrooms', width: 80, field: 'bedrooms',filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Unit Number', width: 80, field: 'unitNumber' ,sortable: true },
    { headerName: 'Scheme Name', width: 120, field: 'sectionalSchemeName', filter: 'agTextColumnFilter',sortable: true  },
    { headerName: 'Code', width: 80, field: 'code',filter: 'agTextColumnFilter',sortable: true }
  ];



  rowData: any;
  

  constructor(private http: HttpClient, private router: Router,public datepipe: DatePipe) {

  }

  gridOptions: {
    // enables pagination in the grid
    pagination: true,

    // sets 10 rows per page (default is 100)
    paginationPageSize: 17,

    // other options
}
public a = 'active';
public firstName :any;
public lastName :any;

onRowClicked(event) {
  const url = window.location.href;
  window.open(`/#/residential/${event.data.id}/view`, '_blank');
  }

  myListing(){
    this.gridData(`${this.firstName+this.lastName}`);
  }

  newListing(){
    this.router.navigate([`/residential/new`]);
  }
  clearFilters() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.gridData(this.a);
  }
  gridData(a){
  let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
  .set('content-type', 'application/json');

this.http
  .get<any[]>('https://whitefang-digitaloffice.form.io/residentials1/submission?data.user.data.office._id=5f91347285576a8dfa04e3ae&sort=-created&skip=0&limit=1000', { headers })
  .subscribe((res) => {
    this.data = [];
    res.forEach(element => {
     let userName = `${element.data.user.data.firstName+element.data.user.data.lastName?element.data.user.data.firstName+element.data.user.data.lastName:''}`;
          if(a == element.data.listingStatus || a == userName){
      return this.data.push({
        "address": element.data.address.formatted_address,
        "listingType": element.data.listingType,
        "propertyType": element.data.propertyType.data.label,
        "primaryProperty": element.data.user.data?element.data.user.data.firstName+" "+element.data.user.data.lastName:'',
        "price": element.data.price,
        "suburb": element.data.suburbRef.data.suburb,
        "bedrooms": element.data.bedrooms,
        "unitNumber": element.data.unitNumber ? element.data.unitNumber : '',
        "sectionalSchemeName": element.data.sectionalSchemeName,
        "code": element.data.mandateMetaData.code,
        "id": element._id,
        "listingStatus": element.data.listingStatus,
        "createdTime": new Date(element.created),
        "lastUpdated": new Date(element.created)
      });
    }
    });
    this.rowData = this.data;
  })
}

}

