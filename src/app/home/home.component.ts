import { Component, OnInit } from '@angular/core';
import { FormioAuthService } from 'angular-formio/auth';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public auth: FormioAuthService) { }

  officeList = [
    { id: '5e398a8993bcd0ba890f7cde', office: 'Maxprop Pinetown', link: '/pinetown', icon: '' },
    { id: '5e39ee247827cdd073865778', office: 'Maxprop Berea', link: '/berea', icon: '' },
    { id: '5e5cc80ab768a2bb9a4426b4', office: 'Maxprop Empangeni', link: '/empangeni', icon: '' },
    { id: '5e398bac931deab8ad36c9d3', office: 'Maxprop Richards Bay', link: '/richards-bay', icon: '' },
    { id: '5e398a80544edc46b71e195b', office: 'Maxprop Durban', link: '/durban', icon: '' },
    { id: '5f91347285576a8dfa04e3ae', office: 'Maxprop Umhlanga Letting', link: '/umhlanga', icon: '' },
    { id: '5e398a82544edc62391e1966', office: 'Maxprop Hillcrest Letting', link: '/hillcrest', icon: '' },
    { id: '5f913445e131ed659bdfbb65', office: 'Maxprop Pinetown Letting', link: '/pinetown-letting', icon: '' },
    { id: '5e39ee21ee72be797cab2250', office: 'Maxprop Ladysmith', link: '/ladysmith', icon: '' },
    { id: '5e39ee1ce08984075b11ea78', office: 'Maxprop Phoenix', link: '/phoenix', icon: '' },
    { id: '5e398a86544edc3b6a1e1971', office: 'Maxprop Tongaat', link: '/tongaat', icon: '' },
    { id: '5e398ba9871f8e9b4191bff9', office: 'Maxprop Kokstad', link: '/kokstad', icon: '' },
    { id: '5e398ba7a4901461be9c5df2', office: 'Maxprop Wyebank', link: '/wyebank', icon: '' },
    { id: '60105dec311325c21d5c0799', office: 'Maxprop Digital', link: '/maxprop-digital', icon: '' }
  ]

  ngOnInit() {
  }

}
