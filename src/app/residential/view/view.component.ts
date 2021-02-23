import { Component } from '@angular/core';
import { FormioResourceViewComponent } from 'angular-formio/resource';
declare var google; 
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent extends FormioResourceViewComponent {


  ngOnInit() {
    window.scrollTo(0, 0);
    
    
  }
  ngAfterViewInit(){
    setTimeout(() => {
      const pointer = this.service.resource.data.address.geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: pointer,
        zoom: 15,
      });
      const marker = new google.maps.Marker({
        position: pointer,
        map: map,
      });
    },1000)
  }
}
