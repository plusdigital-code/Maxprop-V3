import { Component, OnInit } from '@angular/core';
import { FormioResourceViewComponent } from 'angular-formio/resource';
declare var google; 
@Component({
  selector: 'app-commercial-view',
  templateUrl: './commercial-view.component.html',
  styleUrls: ['./commercial-view.component.scss']
})
export class CommercialViewComponent extends FormioResourceViewComponent {

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(){
    setTimeout(() => {
    try{
        const pointer = this.service.resource.data.address.geometry.location;
        const map = new google.maps.Map(document.getElementById("map"), {
          center: pointer,
          zoom: 15,
        });
        const marker = new google.maps.Marker({
          position: pointer,
          map: map,
        });
      } catch(error){
        this.ngAfterViewInit()
      }
    },2000)
  }

  transform(value: any): any {
    if(!value ){
      return " "
    }
    return JSON.stringify(value, null, 2)
    .replace(/ /g, '&nbsp;') // note the usage of `/ /g` instead of `' '` in order to replace all occurences
    .replace(/\n/g, '<br/>'); // same here
  }
}
