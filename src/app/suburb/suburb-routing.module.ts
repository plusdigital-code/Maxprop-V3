import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuburblistComponent } from './suburblist/suburblist.component';
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


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {path:'list', component:SuburblistComponent},
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
        component: FormioResourceViewComponent
      },
      {
        path: 'edit',
        component: FormioResourceEditComponent
      },
      {
        path: 'delete',
        component: FormioResourceDeleteComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuburbRoutingModule { }
