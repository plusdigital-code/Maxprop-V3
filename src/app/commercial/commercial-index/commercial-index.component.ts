import { Component, OnInit, ViewChild } from '@angular/core';
import { FormioResourceIndexComponent } from 'angular-formio/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { CommercialService } from './commercial-service';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { InstantiateExpr } from '@angular/compiler';
import { FormioAuthService } from 'angular-formio/auth';

type tabTypes = 'active' | 'archived' | 'pending' | 'myListing' | 'all';

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
    {
      headerName: 'Updated', width: 100, field: 'lastUpdated', filter: 'agDateColumnFilter', sortable: true, cellRenderer: (params) => {
        return this.datepipe.transform(params.value, 'dd/MM/yyyy');
      }
    },
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
    { headerName: 'Seller Name', width: 150, field: 'sellerName', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Mobile', width: 150, field: 'sellerMobile', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Work Number', width: 150, field: 'sellerWorkNumber', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Seller Email', width: 150, field: 'sellerEmail', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Code', width: 120, field: 'code', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Status', width: 80, field: 'listingStatus', filter: 'agTextColumnFilter', sortable: true },
    {
      headerName: 'Created', width: 100, field: 'createdTime', filter: 'agDateColumnFilter', sortable: true, cellRenderer: (params) => {
        return this.datepipe.transform(params.value, 'dd/MM/yyyy');
      }
    },
    { headerName: 'Mandate Status', width: 120, field: 'mandateStatus', filter: 'agTextColumnFilter', sortable: true },
    {
      headerName: 'PPID', width: 100, field: 'privateProperty', filter: 'agTextColumnFilter', cellRenderer: (data) => {
        if (data.value === 1 || data.value === '') {
          return '-';
        } else {
          return `${data.value}`;
        }
      },
      sortable: true
    },
    {
      headerName: 'PP', width: 100, field: 'ppLink', cellRenderer: (data) => {
        if (!data.value) {
          return;
        }
        if (data.value === 1 || data.value === '') {
          return '-';
        } else {
          return `<a href= ${data.value}
      target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
        }
      }, sortable: true
    },
    {
      headerName: 'P24ID', width: 100, field: 'property24', filter: 'agTextColumnFilter', cellRenderer: (data) => {
        if (!data.value) {
          return;
        }
        if (data.value === 1 || data.value === '') {
          return '-';
        } else {
          return `${data.value}`;
        }
      }, sortable: true
    },
    {
      headerName: 'P24', width: 100, field: 'p24Link', cellRenderer: (data) => {
        if (!data.value) {
          return;
        }
        if (data.value === 1 || data.value === '') {
          return '-';
        } else {
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

  public rowData: any[];
  public gridOptions: any = {
    rowSelection: 'single',
    cacheBlockSize: 17,
    maxBlocksInCache: 5,
    rowModelType: 'infinite',
    pagination: true,
    animateRows: true,
    paginationPageSize: 17
  };
  gridParams: any;
  a: tabTypes = 'active';
  officeId;
  // tslint:disable-next-line:no-inferrable-types
  isGridReady: boolean = true;
  totalRows = undefined;
  urlParams = '';


  // tslint:disable-next-line:max-line-length
  constructor(private commercialService: CommercialService, private router: Router, public datepipe: DatePipe, public auth: FormioAuthService) {

  }

  public firstName: any;
  public lastName: any;
  cellClicked(event) {
    const value = event.colDef.headerName;
    if (value === 'PP' || value === 'P24' || value === 'Listing Brochure' || value === 'House Brochure') {
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
    if (isNaN(head)) {
      head = 'myListing';
    }
    // this.onGridReady('', head);
  }

  clearFilters() {
    this.handleTabClick('active');
    this.gridParams.api.setFilterModel(null);
    this.isGridReady = false;
    setTimeout(() => {
      this.isGridReady = true;
    }, 1);
  }

  ngOnInit() {
    if (!this.auth.authenticated) {
      this.router.navigate(['/auth/login']);
    }
    // this.gridData(this.a);
  }

  handleTabClick(type) {
    this.totalRows = undefined;
    if (this.a === type) {
      return;
    }
    // if clicked tab is myListing, i need to find out another way to get mylisting other than using username and filtering out data with that username.
    // is it possible to use any type of ID to only fetch data of mylisting rather than filtering out.
    this.a = type;
    this.isGridReady = false;
    setTimeout(() => {
      this.isGridReady = true;
    }, 1);
  }

  createUrlParams(startRow: number, endRow: number, sort, filter) {
    return new Promise((resolve) => {
      let searchData: any = '&data.listingStatus=' + this.a;
      let sortData = '-created';
      const limit = 17;

      if (sort.length) {
        const sortField = sort[0].colId;
        const sortType = sort[0].sort;
        sortData = this.getFieldName(sortField);
        console.log({ sortField, sortType, sortData });
        if (sortType === 'desc') {
          sortData = '-' + sortData;
        }
      } else {
        sortData = '-modified';
      }

      if (Object.keys(filter).length) {
        // tslint:disable-next-line:forin
        for (const key in filter) {
          console.log(filter[key]);
          if (filter[key].filterType && filter[key].filterType === 'date') {
            if (filter[key].type === 'equals') {
              const date = new Date(filter[key].dateFrom);
              const startDate = date.toISOString();
              const endDate = date.setHours(23, 59, 0, 0);
              searchData = searchData + '&created__gt=' + startDate + '&created__lt=' + endDate;
              // create less than or greater than condition.
            } else if (filter[key].type === 'inRange') {
              const startDate = new Date(filter[key].dateFrom).toISOString();
              const endDate = new Date(filter[key].dateTo).toISOString();
              searchData = searchData + '&created__gt=' + startDate + '&created__lt=' + endDate;
              // create start and end date - with leas than or greater than
            } else if (filter[key].type === 'greaterThan') {
              const startDate = new Date(filter[key].dateFrom).toISOString();
              searchData = searchData + '&created__gt=' + startDate;
              // create only greater than condition
            } else if (filter[key].type === 'lessThan') {
              const endDate = new Date(filter[key].dateFrom).toISOString();
              searchData = searchData + '&created__lt=' + endDate;
              // create only less than conditon
            }
          } else {
            searchData = searchData.length
              ? searchData + '&' + this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type, filter[key].filter)
              : searchData + this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type, filter[key].filter);
          }
        }
      }
      const params = '?sort=' + sortData + '&skip=' + startRow + '&limit=' + limit + searchData;
      console.log(params);
      resolve(params);
    });
  }

  getFilterTypeAndValue(type, key) {
    if (key == null) {
      return null;
    }
    if (type === 'equals') {
      return '=' + key;
    } else if (type === 'notEqual') {
      return '__ne=' + key;
    } else if (type === 'contains') {
      return '__regex=' + key;
    } else if (type === 'greaterThan') {
      return '__gt=' + key;
    } else if (type === 'lessThan') {
      return '__lt=' + key;
    } else if (type === 'inRange') {
      return '__lt=' + key;
    }
  }
  

  getFieldName(name) {
    if (name === 'address') {
      return 'data.address.formatted_address';
    } else if (name === 'listingType') {
      return 'data.listingType';
    } else if (name === 'propertyType') {
      return 'data.propertyType.data.label';
    } else if (name === 'primaryProperty') {
      return 'data.user.data.firstName';
    } else if (name === 'price') {
      return 'data.price';
    } else if (name === 'suburb') {
      return 'data.suburbRef.data.suburb';
    } else if (name === 'city') {
      return 'data.cityRef.data.city';
    } else if (name === 'bedrooms') {
      return 'data.bedrooms';
    } else if (name === 'bathrooms') {
      return 'data.bathrooms';
    } else if (name === 'garages') {
      return 'data.garages';
    } else if (name === 'carPorts') {
      return 'data.carPorts';
    } else if (name === 'floorSize') {
      return 'data.floorSizeInfo.floorSize';
    } else if (name === 'landSize') {
      return 'data.sizeLandSizeInfo.landSize';
    } else if (name === 'unitNumber') {
      return 'data.unitNumber';
    } else if (name === 'sectionalSchemeName') {
      return 'data.sectionalSchemeName';
    } else if (name === 'code') {
      return 'data.mandateMetaData.code';
    } else if (name === 'listingStatus') {
      return 'data.listingStatus';
    } else if (name === 'createdTime') {
      return 'created';
    } else if (name === 'lastUpdated') {
      return 'modified';
    } else if (name === 'property24') {
      return 'data.property24.p24ID';
    } else if (name === 'privateProperty') {
      return 'data.privateProperty.ppID';
    }
  }

  getRowData(params) {
    this.gridParams.api.showLoadingOverlay();
    return new Promise(resolve => {
      this.commercialService.getGridData(params).subscribe(resp => {
        resolve(resp);
      });
    });
  }

  onGridReady(params) {
    params.api.showLoadingOverlay();
    this.gridParams = params;
    const datasource = {
      // tslint:disable-next-line:no-shadowed-variable
      getRows: async (params: IGetRowsParams) => {
        const urlParams = await this.createUrlParams(params.startRow, params.endRow, params.sortModel, params.filterModel);
        const totalCountPromise = Promise.resolve(this.totalRows);
        const dataPromise: any = this.getRowData(urlParams);
        const [totalCount, data]: any = await Promise.all([totalCountPromise, dataPromise]);
        this.totalRows = totalCount;
        const parSedData = [];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          parSedData.push({
            'address': element.data.address.formatted_address,
            'listingType': element.data.listingType,
            'suburbRef': element.data.suburbRef.data ? element.data.suburbRef.data.suburb : '-',
            'cityRef': element.data.cityRef.data ? element.data.cityRef.data.city : '-',
            'commercialType': element.data.commercialType.data ? element.data.commercialType.data.commercialType : '-',
            'mandateStatus': element.data.mandateStatus,
            // tslint:disable-next-line:max-line-length
            'floorSize': element.data.floorSizeInfo.floorSize ? Number(element.data.floorSizeInfo.floorSize).toLocaleString('en-GB') : '-',
            'landSize': element.data.sizeLandSizeInfo.landSize ? Number(element.data.sizeLandSizeInfo.landSize).toLocaleString('en-GB') : '-',
            // tslint:disable-next-line:max-line-length
            'factoryWarehouseSize': element.data.factoryWarehouseSize ? Number(element.data.factoryWarehouseSize).toLocaleString('en-GB') : '-',
            'officeSize': element.data.officeSize ? Number(element.data.officeSize).toLocaleString('en-GB') : '-',
            'retailSize': element.data.retailSize ? Number(element.data.retailSize).toLocaleString('en-GB') : '-',
            'yardSpace': element.data.yardSpace ? Number(element.data.yardSpace).toLocaleString('en-GB') : '-',
            'listingStatus': element.data.listingStatus,
            'code': element.data.mandateMetaData.code,
            'primaryProperty': element.data.user.data ? element.data.user.data.firstName + ' ' + element.data.user.data.lastName : '-',
            'price': element.data.price ? Number(element.data.price).toLocaleString('en-GB') : '-',
            'id': element._id,
            'createdTime': new Date(element.created),
            'lastUpdated': new Date(element.created),
            'sellerName': element.data.sellerName ? element.data.sellerName : '-',
            'sellerMobile': element.data.sellerMobile ? element.data.sellerMobile : '-',
            'sellerWorkNumber': element.data.sellerWorkNumber ? element.data.sellerWorkNumber : '-',
            'sellerEmail': element.data.sellerEmail ? element.data.sellerEmail : '-',
            'property24': element.data.property24.p24ID ? element.data.property24.p24ID : '-',
            'privateProperty': element.data.privateProperty.ppID ? element.data.privateProperty.ppID : '-',
            'p24Link': element.data.property24.p24ID ? element.data.property24.p24Link : 1,
            'ppLink': element.data.privateProperty.ppID ? element.data.privateProperty.ppLink : 1,
            'listingBrochure': element.data.codeDisplay,
            'houseBrochure': element.data.brochures.showHouseBrochure
          });
        }
        this.gridParams.api.hideOverlay();
        if (!parSedData.length) {
          this.gridParams.api.showNoRowsOverlay();
          return params.successCallback([], 0);
        } else {
          return params.successCallback(parSedData);
        }
      }
    };
    params.api.setDatasource(datasource);
  }
}
