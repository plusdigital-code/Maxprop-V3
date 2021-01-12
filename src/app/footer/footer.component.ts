import { Component, OnInit } from '@angular/core';
import { FormioAuthService } from 'angular-formio/auth';
declare var $;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public auth: FormioAuthService) {}

  ngOnInit() {
    
  }

}
