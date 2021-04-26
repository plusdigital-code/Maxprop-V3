import { Component, OnInit, ViewChild } from '@angular/core';
import { SuburbService } from '../suburb.service';
import { DatePipe } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

@Component({
  selector: 'app-suburblist',
  templateUrl: './suburblist.component.html',
  styleUrls: ['./suburblist.component.scss']
})
export class SuburblistComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: 'City',  field: 'data.city.data.city', filter: 'agTextColumnFilter', sortable: true },
    { headerName: 'Suburb',  field: 'data.suburb', filter: 'agTextColumnFilter', sortable: true },
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

  constructor(private suburbService: SuburbService, private datepipe: DatePipe,private router: Router) { }

  ngOnInit() {
    this.suburbService.getGridData().subscribe(resp => {
      this.rowData = resp;
    })
  }

  newListing(){
      this.router.navigate([`/suburb/new`]);
    }

  async onGridReady(params: any) {

  }

  onRowClicked(event){
    const url = window.location.href;
    window.open(`/#/suburb/${event.data._id}/view`, '_blank');
  }

}
