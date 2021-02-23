import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormioGrid } from 'angular-formio/grid';
import { FormioResources } from 'angular-formio/resource';
import { FormioModule, FormioAppConfig } from 'angular-formio';

import {
  FormioResource,
  FormioResourceConfig,
  FormioResourceService,
  FormioResourceIndexComponent,
  FormioResourceViewComponent,
  FormioResourceCreateComponent,
  FormioResourceEditComponent,
  FormioResourceDeleteComponent,
  FormioResourceComponent
} from 'angular-formio/resource';

import { SuburbRoutingModule } from './suburb-routing.module';
import { SuburblistComponent } from './suburblist/suburblist.component';

@NgModule({
  declarations: [SuburblistComponent,FormioResourceComponent,FormioResourceViewComponent,FormioResourceEditComponent,FormioResourceDeleteComponent],
  imports: [
    CommonModule,
    SuburbRoutingModule,
    AgGridModule,
    FormioGrid,
    FormioModule
  ],
  providers: [
    FormioResourceService,
    {
      provide: FormioResourceConfig,
      useValue: {
        name: 'suburb',
        form: 'suburb'
      }
    }
  ]
})
export class SuburbModule { }
