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
import { ResidentialLeadsViewComponent } from './residential-leads-view/residential-leads-view.component';
import { ResidentialLeadsResourceComponent } from './residential-leads-resource/residential-leads-resource.component';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    FormioResource,
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
        component: ResidentialLeadsResourceComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view',
            component: ResidentialLeadsViewComponent
          },
          {
            path: 'edit',
            component: FormioResourceEditComponent
          },
          {
            path: 'delete',
            component: FormioResourceDeleteComponent
          },
          {
            path: 'residential-lead-notes',
            loadChildren: './residential-lead-notes/residential-lead-notes.module#ResidentialLeadNotesModule'
          }
        ]
      }
    ])
  ],
  declarations: [ResidentialLeadsViewComponent, ResidentialLeadsResourceComponent],
  providers: [
    FormioResourceService,
    {
      provide: FormioResourceConfig,
      useValue: {
        name: 'contact',
        form: 'contact',
        parents: [
          'residentials1'
        ]
      }
    }
  ]
})
export class ResidentialLeadsModule { }
