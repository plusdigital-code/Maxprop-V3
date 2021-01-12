import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from 'angular-formio';

import {
  FormioResource,
  FormioResourceConfig,
  FormioResourceService,
  FormioResourceIndexComponent,
  FormioResourceViewComponent,
  FormioResourceCreateComponent,
  FormioResourceEditComponent,
  FormioResourceDeleteComponent
} from 'angular-formio/resource';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { FormioGrid } from 'angular-formio/grid';
import { ResidentialResourceComponent } from './residential-resource/residential-resource.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit-component';
import { CreateComponent } from './create/create-component';
import { ResidentialIndexComponent } from './residential-index/residential-index.component';

@NgModule({
  declarations: [ResidentialResourceComponent,CreateComponent,EditComponent, ViewComponent, ResidentialIndexComponent],
  imports: [
    CommonModule,
    FormioModule,
    FormioGrid,
    FormioResource,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild([
      {
        path: '',
        component: ResidentialIndexComponent
      },
      {
        path: 'new',
        component: CreateComponent
      },
      {
        path: ':id',
        component: ResidentialResourceComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view',
            component: ViewComponent
          },
          {
            path: 'edit',
            component: EditComponent
          },
          {
            path: 'delete',
            component: FormioResourceDeleteComponent
          },
          {
            path: 'residential-notes',
            loadChildren: './residential-notes/residential-notes.module#ResidentialNotesModule'
          },
          {
            path: 'residential-leads',
            loadChildren: './residential-leads/residential-leads.module#ResidentialLeadsModule'
          },
          {
            path: 'residential-viewings',
            loadChildren: './residential-viewings/residential-viewings.module#ResidentialViewingsModule'
          }
        ]
      }
    ])
  ],
  providers: [
    FormioResourceService,
    {
      provide: FormioResourceConfig,
      useValue: {
        name: 'residentials1',
        form: 'residentials1'
      }
    }
  ]
})
export class ResidentialModule { }
