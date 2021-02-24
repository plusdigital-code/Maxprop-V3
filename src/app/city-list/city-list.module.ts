import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormioGrid } from 'angular-formio/grid';
import { FormioResources, FormioResourceService } from 'angular-formio/resource';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import {
  FormioResource,
  FormioResourceConfig,
} from 'angular-formio/resource';



import { CityListRoutingModule } from './city-list-routing.module';
import { CityComponent } from './city/city.component';

@NgModule({
  declarations: [CityComponent],
  imports: [
    CommonModule,
    FormioResource,
    CityListRoutingModule,
    AgGridModule,
    FormioGrid,
    FormioModule
  ],
  providers: [
    FormioResourceService,
    {
      provide: FormioResourceConfig,
      useValue: {
        name: 'city',
        form: 'city'
      }
    }
  ]
})
export class CityListModule { }
