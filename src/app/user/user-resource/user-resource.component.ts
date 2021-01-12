import { Component, OnInit } from '@angular/core';
import { FormioResourceComponent } from 'angular-formio/resource';
@Component({
  selector: 'app-user-resource',
  templateUrl: './user-resource.component.html',
  styleUrls: ['./user-resource.component.scss']
})
export class UserResourceComponent extends FormioResourceComponent implements OnInit {}