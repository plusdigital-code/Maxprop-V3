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
    { headerName: 'No. Of Bedrooms', width: 140, field: 'bedrooms', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'No. Of Bathrooms', width: 140, field: 'bathrooms', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Garages', width: 100, field: 'garages', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Car Ports', width: 100, field: 'carPorts', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Floor Size', width: 100, field: 'floorSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Land Size', width: 100, field: 'landSize', filter: 'agNumberColumnFilter', sortable: true },
    { headerName: 'Unit Number', width: 120, field: 'unitNumber' },
    { headerName: 'Scheme Name', width: 150, field: 'sectionalSchemeName', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Status', width: 80, field: 'listingStatus', filter: 'agTextColumnFilter', sortable: true },
  ];
  public rowData: any[];
  public gridOptions: any = {
    rowSelection: 'single',
    cacheBlockSize: 17,
    maxBlocksInCache: 5,
    rowModelType: 'infinite',
    pagination: true,
    paginationAutoPageSize: true,
    animateRows: true
  };
  gridParams: any;
  activeTab: tabTypes = 'active';
  officeId;
  isGridReady:boolean = true;
  totalRows= undefined;

  constructor(private listingService: ListingService, private route: ActivatedRoute, private datepipe: DatePipe, private router: Router,) { }

  ngOnInit() {
    this.officeId = this.route.snapshot.params.officeId;
  }

  handleTabClick(type) {
    this.totalRows= undefined;
    if(this.activeTab == type){
      return;
    }
    // if clicked tab is myListing, i need to find out another way to get mylisting other than using username and filtering out data with that username.
    // is it possible to use any type of ID to only fetch data of mylisting rather than filtering out.
    this.activeTab = type
    this.isGridReady = false;
    setTimeout(() => {
      this.isGridReady = true;
    },1)
  }

  getRowData(startRow: number, endRow: number, sort, filter) {
    this.gridParams.api.showLoadingOverlay()
    let searchData: any = '&data.user.data.office._id=' + this.officeId + '&data.listingStatus=' + this.activeTab;
    let sortData = '-created';
    let limit = 17;
    const params = '?sort=' + sortData + '&skip=' + startRow + '&limit=' + limit + searchData
    return new Promise(resolve => {
      this.listingService.getGridData(this.officeId, params).subscribe(resp => {
        resolve(resp)
      })
    })
  }

  async onGridReady(params: any) {
    params.api.showLoadingOverlay()
    this.gridParams = params;
    console.clear();
    console.log("---------------------GRID READY EVENT-----------------------------")
    var datasource = {
      getRows: async (params: IGetRowsParams) => {
        let totalCountPromise = this.totalRows == undefined ? this.listingService.getTotalRows(this.officeId, this.activeTab) : Promise.resolve(this.totalRows);
        let dataPromise: any = this.getRowData(params.startRow, params.endRow, params.sortModel, params.filterModel);

        let [totalCount, data]:any = await Promise.all([totalCountPromise, dataPromise]);
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
            "floorSize": element.data.floorSizeInfo.floorSize ? element.data.floorSizeInfo.floorSize + 'm²' : '' ,
            "landSize": element.data.sizeLandSizeInfo.landSize ? element.data.sizeLandSizeInfo.landSize + 'm²' : '' ,
            "unitNumber": element.data.unitNumber ? element.data.unitNumber : '',
            "sectionalSchemeName": element.data.sectionalSchemeName,
            "code": element.data.mandateMetaData.code,
            "id": element._id,
            "listingStatus": element.data.listingStatus,
            "createdTime": new Date(element.created),
            "lastUpdated": new Date(element.created)
          });
        }
        this.gridParams.api.hideOverlay();
        if (!parSedData.length) {
          this.gridParams.api.showNoRowsOverlay()
          return params.successCallback([], 0)
        } else {
          return params.successCallback(parSedData, totalCount)
        }
      }
    };
    params.api.setDatasource(datasource);
  }

  clearFilters() {
    this.handleTabClick('active')
  }

  onRowClicked(event) {
    const url = window.location.href;
    window.open(`/#/residential/${event.data.id}/view`, '_blank');
  }

  newListing() {
    this.router.navigate([`/residential/new`]);
  }

}
