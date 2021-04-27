import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { ListingService } from './listing.service';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

type tabTypes = 'active' | 'archived' | 'pending' | 'myListing';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: 'Code', width: 130, field: 'code', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Type', width: 80, field: 'listingType', filter: 'agTextColumnFilter', sortable: true },
    {
      headerName: 'Created', width: 100, field: 'createdTime', filter: 'agDateColumnFilter', sortable: true, cellRenderer: (params) => {
        return this.datepipe.transform(params.value, 'dd/MM/yyyy');
      }
    },
    {
      headerName: 'Updated', width: 100, field: 'lastUpdated', filter: 'agDateColumnFilter', sortable: true, cellRenderer: (params) => {
        return this.datepipe.transform(params.value, 'dd/MM/yyyy');
      }
    },
    { headerName: 'Primary Property Practitioner', width: 200, field: 'primaryProperty', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Property Type', width: 120, field: 'propertyType', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Price', width: 120, field: 'price', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'City', width: 80, field: 'city', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Suburb', width: 140, field: 'suburb', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Address', width: 250, field: 'address', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Unit Number', width: 120, field: 'unitNumber' },
    { headerName: 'Scheme Name', width: 150, field: 'sectionalSchemeName', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'No. Of Bedrooms', width: 140, field: 'bedrooms', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'No. Of Bathrooms', width: 140, field: 'bathrooms', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Garages', width: 100, field: 'garages', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Car Ports', width: 100, field: 'carPorts', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Floor Size', width: 100, field: 'floorSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Land Size', width: 100, field: 'landSize', filter: 'agNumberColumnFilter', sortable: true },
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
        if(data.value == 1 || data.value == ''){
          return "-"
        }else{
        return `<a href= ${data.value}
      target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
      }
    }, sortable: true
    },
    { headerName: 'P24ID', width: 100, field: 'property24', filter: 'agTextColumnFilter', cellRenderer: (data) => {
      if(data.value == 1 || data.value == ''){
        return "-";
       }else{
        return `${data.value}`
       }
      }, sortable: true },
    {
      headerName: 'P24', width: 100, field: 'p24Link', cellRenderer: (data) => {
        if(data.value == 1 || data.value == ''){
          return "-"
        }else{
        return `<a href= ${data.value}
      target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>`;
      }
    },
      sortable: true
    },
    { headerName: 'Status', width: 80, field: 'listingStatus', filter: 'agTextColumnFilter', sortable: true },
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
  activeTab: tabTypes = 'active';
  officeId;
  isGridReady: boolean = true;
  totalRows = undefined;
  urlParams = ''

  constructor(private listingService: ListingService, private route: ActivatedRoute, private datepipe: DatePipe, private router: Router,) { }

  ngOnInit() {
    this.officeId = this.route.snapshot.params.officeId;
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
  }

  handleTabClick(type) {
    this.totalRows = undefined;
    if (this.activeTab == type) {
      return;
    }
    // if clicked tab is myListing, i need to find out another way to get mylisting other than using username and filtering out data with that username.
    // is it possible to use any type of ID to only fetch data of mylisting rather than filtering out.
    this.activeTab = type
    this.isGridReady = false;
    setTimeout(() => {
      this.isGridReady = true;
    }, 1)
  }

  createUrlParams(startRow: number, endRow: number, sort, filter) {
    return new Promise((resolve) => {
      let searchData: any = '&data.user.data.office._id=' + this.officeId + '&data.listingStatus=' + this.activeTab;
      let sortData = '-created';
      let limit = 17;

      if (sort.length) {
        let sortField = sort[0].colId;
        let sortType = sort[0].sort;
        sortData = this.getFieldName(sortField);
        console.log({ sortField, sortType, sortData })
        if (sortType == 'desc') {
          sortData = '-' + sortData
        }
      } else {
        sortData = '-modified';
      }

      if (Object.keys(filter).length) {
        for (let key in filter) {
          console.log(filter[key])
          if (filter[key].filterType && filter[key].filterType == "date") {
            if (filter[key].type == 'equals') {
              let date = new Date(filter[key].dateFrom);
              let startDate = date.toISOString();
              let endDate = date.setHours(23, 59, 0, 0);
              searchData = searchData + "&created__gt=" + startDate + "&created__lt=" + endDate
              // create less than or greater than condition.
            } else if (filter[key].type == 'inRange') {
              let startDate = new Date(filter[key].dateFrom).toISOString();
              let endDate = new Date(filter[key].dateTo).toISOString();
              searchData = searchData + "&created__gt=" + startDate + "&created__lt=" + endDate
              // create start and end date - with leas than or greater than
            } else if (filter[key].type == 'greaterThan') {
              let startDate = new Date(filter[key].dateFrom).toISOString();
              searchData = searchData + "&created__gt=" + startDate
              // create only greater than condition
            } else if (filter[key].type == 'lessThan') {
              let endDate = new Date(filter[key].dateFrom).toISOString();
              searchData = searchData + "&created__lt=" + endDate
              // create only less than conditon
            }
          }
          else {
            searchData = searchData.length
              ? searchData + '&' + this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type, filter[key].filter)
              : searchData + this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type, filter[key].filter)
          }
        }
      }
      const params = '?sort=' + sortData + '&skip=' + startRow + '&limit=' + limit + searchData
      console.log(params)
      resolve(params)
    })
  }

  getRowData(params) {
    this.gridParams.api.showLoadingOverlay()
    return new Promise(resolve => {
      this.listingService.getGridData(this.officeId, params).subscribe(resp => {
        resolve(resp)
      })
    })
  }

  getFieldName(name) {
    if (name == 'address') {
      return 'data.address.formatted_address'
    } else if (name == 'listingType') {
      return 'data.listingType'
    } else if (name == 'propertyType') {
      return 'data.propertyType.data.label'
    } else if (name == 'primaryProperty') {
      return 'data.user.data.firstName'
    } else if (name == 'price') {
      return 'data.price'
    } else if (name == 'suburb') {
      return 'data.suburbRef.data.suburb'
    } else if (name == 'city') {
      return 'data.cityRef.data.city'
    } else if (name == 'bedrooms') {
      return 'data.bedrooms'
    } else if (name == 'bathrooms') {
      return 'data.bathrooms'
    } else if (name == 'garages') {
      return 'data.garages'
    } else if (name == 'carPorts') {
      return 'data.carPorts'
    } else if (name == 'floorSize') {
      return 'data.floorSizeInfo.floorSize'
    } else if (name == 'landSize') {
      return 'data.sizeLandSizeInfo.landSize'
    } else if (name == 'unitNumber') {
      return 'data.unitNumber'
    } else if (name == 'sectionalSchemeName') {
      return 'data.sectionalSchemeName'
    } else if (name == 'code') {
      return 'data.mandateMetaData.code'
    } else if (name == 'listingStatus') {
      return 'data.listingStatus'
    } else if (name == 'createdTime') {
      return 'created'
    } else if (name == 'lastUpdated') {
      return 'modified'
    }else if(name == 'property24'){
      return 'data.property24.p24ID';
    }
    else if(name == 'privateProperty'){
      return 'data.privateProperty.ppID';
    }
  }

  getFilterTypeAndValue(type, key) {
    if (key == null) {
      return null
    }
    if (type == 'equals') {
      return "=" + key
    } else if (type == 'notEqual') {
      return "__ne=" + key
    } else if (type == "contains") {
      return "__regex=" + key
    } else if (type == "greaterThan") {
      return "__gt=" + key
    } else if (type == "lessThan") {
      return "__lt=" + key
    } else if (type == "inRange") {
      return "__lt=" + key
    }
  }

  async onGridReady(params: any) {
    params.api.showLoadingOverlay()
    this.gridParams = params;
    console.clear();
    console.log("---------------------GRID READY EVENT-----------------------------")
    var datasource = {
      getRows: async (params: IGetRowsParams) => {
        let urlParams = await this.createUrlParams(params.startRow, params.endRow, params.sortModel, params.filterModel);
        let totalCountPromise = Promise.resolve(this.totalRows)// this.totalRows == undefined ? this.listingService.getTotalRows(this.officeId, this.activeTab) : Promise.resolve(this.totalRows);
        let dataPromise: any = this.getRowData(urlParams);
        let [totalCount, data]: any = await Promise.all([totalCountPromise, dataPromise]);
        this.totalRows = totalCount;
        let parSedData = [];
        for (let i = 0; i < data.length; i++) {
          let element = data[i];
          parSedData.push({
            "address": element.data.address.formatted_address,
            "listingType": element.data.listingType,
            "propertyType": element.data.propertyType.data.label,
            "primaryProperty": element.data.user.data ? element.data.user.data.firstName + " " + element.data.user.data.lastName : '',
            "price": element.data.price,
            "suburb": element.data.suburbRef.data.suburb,
            "city": element.data.cityRef.data.city,
            "bedrooms": element.data.bedrooms,
            "bathrooms": element.data.bathrooms,
            "garages": element.data.garages,
            "carPorts": element.data.carPorts,
            "floorSize": element.data.floorSizeInfo.floorSize ? element.data.floorSizeInfo.floorSize + 'm²' : '',
            "landSize": element.data.sizeLandSizeInfo.landSize ? element.data.sizeLandSizeInfo.landSize + 'm²' : '',
            "unitNumber": element.data.unitNumber ? element.data.unitNumber : '',
            "sectionalSchemeName": element.data.sectionalSchemeName,
            "code": element.data.mandateMetaData.code,
            "id": element._id,
            "listingStatus": element.data.listingStatus,
            "createdTime": new Date(element.created),
            "lastUpdated": new Date(element.modified),
            "property24": element.data.property24.p24ID?element.data.property24.p24ID:'-',
            "privateProperty": element.data.privateProperty.ppID?element.data.privateProperty.ppID:'-',
            "p24Link": element.data.property24.p24ID ? element.data.property24.p24Link:1,
            "ppLink": element.data.privateProperty.ppID?element.data.privateProperty.ppLink:1,
          });
        }
        this.gridParams.api.hideOverlay();
        if (!parSedData.length) {
          this.gridParams.api.showNoRowsOverlay()
          return params.successCallback([], 0)
        } else {
          return params.successCallback(parSedData)
        }
      }
    };
    params.api.setDatasource(datasource);
  }

  clearFilters() {
    // this.handleTabClick('active')
    this.gridParams.api.setFilterModel(null);
  }

  onRowClicked(event) {
    const url = window.location.href;
    window.open(`/#/residential/${event.data.id}/view`, '_blank');
  }

  newListing() {
    this.router.navigate([`/residential/new`]);
  }

}
