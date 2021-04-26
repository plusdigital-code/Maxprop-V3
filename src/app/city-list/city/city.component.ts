import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from '../city.service';
import { DatePipe } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: 'Province',  field: 'data.province.data.province', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'City',  field: 'data.city', filter: 'agTextColumnFilter', sortable: true },
    {
      headerName: 'Created',  field: 'created', filter: 'agDateColumnFilter', sortable: true, cellRenderer: (params) => {
        return this.datepipe.transform(params.value, 'dd/MM/yyyy');
      }
    },
    {
      headerName: 'Updated',  field: 'modified', filter: 'agDateColumnFilter', sortable: true, cellRenderer: (params) => {
        return this.datepipe.transform(params.value, 'dd/MM/yyyy');
      }
    }
  ];
  public rowData: any[];
  public gridOptions: any = {
    rowSelection: 'single',
    pagination: true,
    animateRows: true,
    paginationPageSize: 17
  };
  gridParams: any;
  isGridReady: boolean = true;
  totalRows = undefined;
  urlParams = ''

  constructor(private cityService: CityService, private datepipe: DatePipe,private router: Router) { }

  ngOnInit() {
    this.cityService.getGridData().subscribe(resp => {
      this.rowData = resp;
    })
  }

  newListing(){
    this.router.navigate([`/city/new`]);
  }

  async onGridReady(params: any) {

  }

  onRowClicked(event){
    const url = window.location.href;
    window.open(`/#/city/${event.data._id}/view`, '_blank');
  }

}
