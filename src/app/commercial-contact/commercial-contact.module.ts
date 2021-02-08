
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormioResource,
  FormioResourceConfig,
  FormioResourceRoutes,
  FormioResourceService,
  FormioResourceIndexComponent,
  FormioResourceViewComponent,
  FormioResourceCreateComponent,
  FormioResourceEditComponent,
  FormioResourceDeleteComponent,
  FormioResourceComponent
} from 'angular-formio/resource';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    FormioResource,
    // RouterModule.forChild(FormioResourceRoutes())
    RouterModule.forChild([
      {
        path: '',
        component: FormioResourceIndexComponent
      },
      {
        path: 'new',
        component: FormioResourceCreateComponent
      },
      {
        path: ':id',
        component: FormioResourceComponent,
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
            component: FormioResourceEditComponent
          },
          {
            path: 'delete',
            component: FormioResourceDeleteComponent
          },
          // {
          //   path: 'residential-notes',
          //   loadChildren: './residential-notes/residential-notes.module#ResidentialNotesModule'
          // },
          // {
          //   path: 'residential-leads',
          //   loadChildren: './residential-leads/residential-leads.module#ResidentialLeadsModule'
          // },
          // {
          //   path: 'residential-viewings',
          //   loadChildren: './residential-viewings/residential-viewings.module#ResidentialViewingsModule'
          // }
        ]
      }
    ])
  ],
  declarations: [ViewComponent],
  providers: [
    FormioResourceService,
    {provide: FormioResourceConfig, useValue: {
      name: 'commercialContact',
      form: 'commercialcontact'
    }}
  ]
})
export class CommercialContactModule { }
