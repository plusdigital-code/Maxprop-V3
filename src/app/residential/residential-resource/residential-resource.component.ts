import { Component, OnInit } from '@angular/core';
import { FormioResourceComponent } from 'angular-formio/resource';

@Component({
  selector: 'app-residential-resource',
  templateUrl: './residential-resource.component.html',
  styleUrls: ['./residential-resource.component.scss']
})
export class ResidentialResourceComponent extends FormioResourceComponent implements OnInit {}