import { Component, OnInit } from '@angular/core';
import { FormioResourceIndexComponent } from 'angular-formio/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ViewChild } from '@angular/core';
import { type } from 'os';
import { Observable } from 'rxjs';
import { FormioAuthService } from 'angular-formio/auth';
import { ActivatedRoute } from '@angular/router';
type TabType = 'all' | 'myListing'

@Component({
  selector: 'app-residential-contact',
  templateUrl: './residential-contact.component.html',
  styleUrls: ['./residential-contact.component.scss']
})
export class ResidentialContactComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: 'Agent Name ', width: 270, field: 'agentName', filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'notEqual', 'contains',],
        suppressAndOrCondition: true
      },
      sortable: true
    },
    {
      headerName: 'Mandate ', width: 270, field: 'mandate', filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'notEqual', 'contains',],
        suppressAndOrCondition: true
      },
      sortable: true
    },
    {
      headerName: ' Lead Source ', width: 200, field: 'leadSource', filter: 'agTextColumnFilter', filterParams: {
        filterOptions: ['equals', 'notEqual', 'contains',],
        suppressAndOrCondition: true
      }, sortable: true
    },
    {
      headerName: 'Name', width: 200, field: 'fullName', filter: 'agTextColumnFilter', filterParams: {
        filterOptions: ['equals', 'notEqual', 'contains',],
        suppressAndOrCondition: true
      }, sortable: true
    },
    {
      headerName: 'Email', width: 262, field: 'email', filter: 'agTextColumnFilter', filterParams: {
        filterOptions: ['equals', 'notEqual', 'contains',],
        suppressAndOrCondition: true
      }, sortable: true
    },
    {
      headerName: 'Mobile', width: 170, field: 'mobile', filter: 'agNumberColumnFilter', filterParams: {
        filterOptions: ['equals', 'notEqual', 'contains',],
        suppressAndOrCondition: true
      }, sortable: true
    },
  ];
  public rowData: any[];
  public gridOptions: any;
  gridParams: any;
  email;
  public tabType: TabType = 'myListing';
  public firstName: any;
  public lastName: any;
  public  admin: boolean = false;
  constructor(private http: HttpClient, private router: Router,public auth: FormioAuthService) {
  }
  ngOnInit() {
    let a = this.auth.user.roles.find(a => a == "5de422739499161d8586f42f");
    
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

    this.gridOptions = {
      rowSelection: 'single',
      cacheBlockSize: 17,
      maxBlocksInCache: 5,
      enableServerSideFilter: true,
      enableServerSideSorting: true,
      rowModelType: 'infinite',
      pagination: true,
      paginationAutoPageSize: true,
      animateRows: true
    };
  
    let userData = JSON.parse(localStorage.getItem('formioAppUser'));

        if(a == '5de422739499161d8586f42f'){
      this.email = '';
      this.tabType = "all";
      this.admin = true;
    }else{
      this.email = userData.data.email;
      this.tabType = "myListing";
      this.admin = false;

      }
  
  }


  getRowData(startRow: number, endRow: number, sort, filter): Observable<any[]> {
    this.gridParams.api.showLoadingOverlay()
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6').set('content-type', 'application/json');
    let searchData:any = 'data.assignedPractitioner.data.office._id=60105dec311325c21d5c0799';
    let sortData = '-modified';
    let selectFields = 'data.residentials1.data,data.fullName,data.email,data.mobile,data.message,data.source,_id,data.assignedPractitioner.data.office._id';
    let limit = 17;
    if (sort.length) {
      let sortField = sort[0].colId;
      let sortType = sort[0].sort;
      if (sortField == 'mandate') {
        sortData = 'data.residentials1.data.address.formatted_address'
      } else if (sortField == 'leadSource') {
        sortData = 'data.source'
      } else if (sortField == 'fullName') {
        sortData = 'data.fullName'
      } else if (sortField == 'email') {
        sortData = 'data.email'
      } else if (sortField == 'monile') {
        sortData = 'data.mobile'
      }
      if (sortType == 'desc') {
        sortData = '-' + sortData
      }
    } else {
      sortData = '-modified';
    }
    if (Object.keys(filter).length) {
      for(let key in filter){
        searchData = searchData.length 
            ? searchData + ','+ this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type,filter[key].filter) 
            : searchData + this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type,filter[key].filter)
      }
    }

    //console.log("searchstring  ",searchData)
    if (this.tabType == 'myListing') {
      searchData = searchData + '&data.residentials1.data.user.data.email=' + this.email
      let url = 'https://whitefang-digitaloffice.form.io/contact/submission?sort=' + sortData + '&skip=' + startRow + '&limit=' + limit + '&select=' + selectFields + '&' + searchData;
      return this.http.get<any[]>(url, {headers})
    }

    if (this.tabType == 'all') {
      let url = 'https://whitefang-digitaloffice.form.io/contact/submission?sort=' + sortData + '&skip=' + startRow + '&limit=' + limit + '&select=' + selectFields + '&' + searchData ;
      return this.http.get<any[]>(url, {headers})
    }
   
  }

  getFieldName(name){
    if (name == 'mandate') {
      return 'data.residentials1.data.address.formatted_address'
    } else if (name == 'leadSource') {
      return 'data.source'
    } else if (name == 'fullName') {
      return 'data.fullName'
    } else if (name == 'email') {
      return 'data.email'
    } else if (name == 'monile') {
      return 'data.mobile'
    }
  }

  getFilterTypeAndValue(type,key){
    if(type == 'equals'){
      return "=" + key
    } else if(type == 'notEqual'){
      return "__ne=" + key
    } else if (type =="contains"){
      return "__regex="+ key
    }
  }


  async onGridReady(params: any) {
    this.gridParams = params;
    let totalRows:any = await this.getTotalRows();
    var datasource = {
      getRows: (params: IGetRowsParams) => {
        this.getRowData(params.startRow, params.endRow, params.sortModel, params.filterModel)
          .subscribe(data => {
            let parSedData = [];
            for (let i = 0; i < data.length; i++) {
              let element = data[i];
              parSedData.push({
                "agentName":`${element.data.residentials1.data.user.data.firstName+' '+element.data.residentials1.data.user.data.lastName}`,
                "mandate": element.data.residentials1.data ? element.data.residentials1.data.address.formatted_address : '-',
                "fullName": element.data.fullName,
                "email": element.data.email,
                "mobile": element.data.mobile != '' ? element.data.mobile : '-',
                "message": element.data.message,
                "leadSource": element.data.source,
                "id": element._id,
              });
            }
            this.gridParams.api.hideOverlay();
            if (!parSedData.length) {
              this.gridParams.api.showNoRowsOverlay()
              return params.successCallback([], 0)
            } else {
              return params.successCallback(parSedData, totalRows)
            }
          });
      }
    };
    params.api.setDatasource(datasource);
  }

  getTotalRows() {
    if (this.tabType == 'myListing') {
      var searchData = 'data.assignedPractitioner.data.office._id=60105dec311325c21d5c0799&data.residentials1.data.user.data.email=' + this.email
    }

    if (this.tabType == 'all') {
      var searchData = 'data.assignedPractitioner.data.office._id=60105dec311325c21d5c0799';
    }
    

    
    return new Promise(resolve => {
      let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6').set('content-type', 'application/json');
      this.http.get<any[]>('https://whitefang-digitaloffice.form.io/contact/submission?skip=0&limit=100000&select=_id,data.assignedPractitioner.data.office._id'+'&'+ searchData, { headers }).subscribe(resp => {
        resolve(resp.length)
      })
    })
  }


  onRowClicked(event) {
    const url = window.location.href;
    window.open(`/#/contact/${event.data.id}/view`, '_blank');
  }

  newListing() {
    this.router.navigate([`/residential/new`]);
  }

  // allListing() {
  //   this.tabType = 'all'
  //   this.gridData();
  // }

  // myListing() {
  //   this.tabType = 'myListing'
  //   this.gridData();
  // }

}


