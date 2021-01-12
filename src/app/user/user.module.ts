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
import { UserViewComponent } from './user-view/user-view.component';
import { UserResetPasswordComponent } from './user-reset/user-reset-password.component';
import { UserResourceComponent } from './user-resource/user-resource.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './user-edit/user-edit.component';
@NgModule({
  declarations: [UserResourceComponent,EditComponent, UserViewComponent, UserResetPasswordComponent],
  imports: [
    CommonModule,
    FormioModule,
    FormioResource,
    ReactiveFormsModule,
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
        path: 'changePassword',
        component: UserResetPasswordComponent
      },
      {
        path: ':id',
        component: UserResourceComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view',
            component: UserViewComponent
          },
          {
            path: 'changePassword',
            component: UserResetPasswordComponent
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
            path: 'user-notes',
            loadChildren: './user-notes/user-notes.module#UserNotesModule'
          },
          {
            path: 'user-brand',
            loadChildren: './user-brand/user-brand.module#UserBrandModule'
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
        name: 'user',
        form: 'user'
      }
    }
  ]
})
export class UserModule { }
