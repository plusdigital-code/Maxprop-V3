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
import { FormioGrid } from 'angular-formio/grid';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ResourceComponent } from './resource/resource.component';
import { CommercialViewComponent } from './commercial-view/commercial-view.component';
import { CommercialIndexComponent } from './commercial-index/commercial-index.component';
import { EditComponent } from './edit/edit-component';
import { CreateComponent } from './create/create-component';
@NgModule({
  declarations: [ResourceComponent, EditComponent, CreateComponent, CommercialViewComponent, CommercialIndexComponent],
  imports: [
    CommonModule,
    FormioModule,
    FormioGrid,
    HttpClientModule,
    AgGridModule.withComponents([]),
    FormioResource,
    RouterModule.forChild([
      {
        path: '',
        component: CommercialIndexComponent
      },
      {
        path: 'new',
        component: CreateComponent
      },
      {
        path: ':id',
        component: ResourceComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view',
            component: CommercialViewComponent
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
            path: 'commercial-notes',
            loadChildren: './commercial-notes/commercial-notes.module#CommercialNotesModule'
          },
          {
            path: 'commercial-leads',
            loadChildren: './commercial-leads/commercial-leads.module#CommercialLeadsModule'
          },
          {
            path: 'commercial-viewings',
            loadChildren: './commercial-viewings/commercial-viewings.module#CommercialViewingsModule'
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
        name: 'commercial1',
        form: 'commercial1'
      }
    }
  ]
})
export class CommercialModule { }
