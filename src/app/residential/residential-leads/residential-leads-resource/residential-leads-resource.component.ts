import { Component, OnInit } from '@angular/core';
import { FormioResourceComponent } from 'angular-formio/resource';

@Component({
  selector: 'app-residential-leads-resource',
  templateUrl: './residential-leads-resource.component.html',
  styleUrls: ['./residential-leads-resource.component.scss']
})
export class ResidentialLeadsResourceComponent extends FormioResourceComponent { }