import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { FormManagerService, FormManagerConfig } from 'angular-formio/manager';
import { FormioAuthService, FormioAuthConfig } from 'angular-formio/auth';
import { FormioResources } from 'angular-formio/resource';
import { AuthConfig, AppConfig } from '../config';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormioGrid } from 'angular-formio/grid';
import { NgAisModule } from 'angular-instantsearch';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AutocompleteComponent } from './autocomplete.component';
import { BrandComponent } from './brand/brand.component';
import { VideosComponent } from './videos/videos.component';
import { FooterComponent } from './footer/footer.component';
import { CommercialContactsComponent } from './commercial-contacts/commercial-contacts.component';
import { ResidentialContactComponent } from './residential-contact/residential-contact.component';
import { DatePipe } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import { PropertyPractitionersComponent } from './property-practitioners/property-practitioners.component';




// import './components/CheckMatrix';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AutocompleteComponent,
    BrandComponent,
    VideosComponent,
    FooterComponent,
    CommercialContactsComponent,
    ResidentialContactComponent,
    ListingComponent,
    PropertyPractitionersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormioGrid,
    BrowserModule,
    FormioModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    NgAisModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      },
      {
        path: 'form',
        loadChildren: './form/form.module#FormModule'
      },
      {
        path: 'event',
        loadChildren: './event/event.module#EventModule'
      },
      {
        path: 'residential',
        loadChildren: './residential/residential.module#ResidentialModule'
      },
      {
        path: 'office',
        loadChildren: './office/office.module#OfficeModule'
      },
      {
        path: 'commercial',
        loadChildren: './commercial/commercial.module#CommercialModule'
      },
      {
        path: 'commercial-contact',
        loadChildren: './commercial-contact/commercial-contact.module#CommercialContactModule'
      },
      {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule'
      },
      {
        path: 'seller-leads',
        loadChildren: './seller-leads/seller-leads.module#SellerLeadsModule'
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'users',
        // loadChildren: './user/user.module#UserModule'
        component:PropertyPractitionersComponent
      },
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#EmployeeModule'
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: 'support',
        loadChildren: './support/support.module#SupportModule'
      },
      {
        path: 'brand',
        component: BrandComponent
      },
      {
        path: 'videos',
        component: VideosComponent
      },
      {
        path: 'commercial-contacts',
        component: CommercialContactsComponent,
      },
      {
        path: 'contacts',
        component: ResidentialContactComponent,
      },
      {
        path: 'residentialoffice/:officeId',
        component: ListingComponent,
      },
      {
        path: 'suburb',
        loadChildren: './suburb/suburb.module#SuburbModule'
      },
      {
        path: 'city',
        loadChildren: './city-list/city-list.module#CityListModule'
      }
    ], { useHash: true })
  ],
  providers: [
    FormioResources,
    FormioAuthService,
    FormManagerService,
    DatePipe,
    {
      provide: FormManagerConfig, useValue: {
        tag: 'common'
      }
    },
    { provide: FormioAuthConfig, useValue: AuthConfig },
    { provide: FormioAppConfig, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public _router: Router) {

  }

}