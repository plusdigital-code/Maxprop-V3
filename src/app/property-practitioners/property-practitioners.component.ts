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

type tabTypes = 'active' | 'archived' | 'pending' | 'myListing';

@Component({
  selector: 'app-property-practitioners',
  templateUrl: './property-practitioners.component.html',
  styleUrls: ['./property-practitioners.component.scss']
})
export class PropertyPractitionersComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'my-app';
  public data = [];
  public res: string[] = [];

  columnDefs = [
    { headerName: 'Email', width: 280, field: 'email', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Mobile', width: 270, field: 'mobile', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'First Name', width: 270, field: 'firstName', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'office', width: 280, field: 'office', filter: 'agTextColumnFilter', sortable: true },
    
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
  cellClicked(event) {
debugger;
    const url = window.location.href;
    window.open(`/#/user/${event.data.id}/view`, '_blank');
  }

  newUser() {
    this.router.navigate([`/user/new`]);
  }



  ngOnInit() {
    this.columnDefs.forEach((ele: any) => {
      if (ele.filter == "agNumberColumnFilter") {
        ele.filterParams = {
          filterOptions: ['equals', 'greaterThan', 'lessThan'],
          suppressAndOrCondition: true
        }
      }
      else if (ele.filter == "agDateColumnFilter") {
        ele.filterParams = {
          filterOptions: ['equals', 'greaterThan', 'lessThan', 'inRange'],
          suppressAndOrCondition: true
        }
      }
      else {
        ele.filterParams = {
          filterOptions: ['contains', 'notEqual', 'equals'],
          suppressAndOrCondition: true
        }
      }
    })
    this.gridData();
  }
  gridData() {
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');
    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/user/submission?&sort=-modified&skip=0&limit=1000&select=_id,data.email,data.mobile,data.firstName ,data.office', { headers })
      .subscribe((res) => {
        this.data = [];
        res.forEach(element => {
          debugger;
          if(element.data.office && element.data.office._id != '60105dec311325c21d5c0799'){
            return this.data.push({
              "email": element.data.email?element.data.email:'',
              "mobile": element.data.mobile?element.data.mobile:'',
              "firstName": element.data.firstName?element.data.firstName:'',
              "office": element.data.office.data?element.data.office.data.officeName:'',
              "id": element._id,

            });
          }
        });
        this.rowData = this.data;
      })
  }


}