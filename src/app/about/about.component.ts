import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  customOptions3: any = {
    loop: true,
    margin:40,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    // nav: true
  }
  customOptions4: any={
    dots: false,
    loop:true,


    responsive:{
      0:{
        items:1
      },
      600:{
        items:3
      },
      1000:{
        items:6
      }
    }
  }

}
