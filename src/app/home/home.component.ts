import { Component } from '@angular/core';
import {ProductService} from "../product.service";
import {searchProduct} from "../../assets/js/search.helper";
import {environment} from "../environment/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products:any;
  top:any;
  imageUrl= environment.baseUrl+'/resources/';
  constructor(private productService:ProductService) {}
  ngOnInit(){
    this.productService.getProductHome().subscribe(data =>{
      this.products=data;
      console.log(data)
    })
    this.productService.getProducttop().subscribe(data =>{
      this.top=data;
      console.log(data)
    })
    const input = document.querySelector("input");
    const form = document.querySelector("form");
    form?.addEventListener("submit", async function(event) {
      event.preventDefault();
      const tabContent = document.querySelector(".tab-content");
      searchProduct(input?.value, tabContent);

    });
  }

  customOptions: any = {

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
      },
      940: {
        items: 4
      }
    },
    // nav: true
  }
  customOptions2: any={
    dots: false,
    loop:true,
    margin:10,

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
