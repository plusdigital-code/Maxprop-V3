import { Component, OnInit } from '@angular/core';
import { FormioResourceViewComponent } from 'angular-formio/resource';
@Component({
  selector: 'app-commercial-view',
  templateUrl: './commercial-view.component.html',
  styleUrls: ['./commercial-view.component.scss']
})
export class CommercialViewComponent extends FormioResourceViewComponent {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
