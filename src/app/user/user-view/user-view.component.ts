import { Component, OnInit } from '@angular/core';
import { FormioResourceViewComponent } from 'angular-formio/resource';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends FormioResourceViewComponent { 
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  checkType(value){
    return typeof value
  }
}
