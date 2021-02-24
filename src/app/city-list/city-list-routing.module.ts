import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  FormioResourceViewComponent,
  FormioResourceEditComponent,
  FormioResourceDeleteComponent,
  FormioResourceComponent
} from 'angular-formio/resource';
import { CityComponent } from './city/city.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  { path: 'list', component: CityComponent },
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
export class CityListRoutingModule { }
