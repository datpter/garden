import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  customOptionsContact: any={
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
