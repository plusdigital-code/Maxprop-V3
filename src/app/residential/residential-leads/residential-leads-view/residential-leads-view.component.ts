import { Component, OnInit } from '@angular/core';
import { FormioResourceViewComponent } from 'angular-formio/resource';

@Component({
  selector: 'app-residential-leads-view',
  templateUrl: './residential-leads-view.component.html',
  styleUrls: ['./residential-leads-view.component.scss']
})
export class ResidentialLeadsViewComponent extends FormioResourceViewComponent {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}