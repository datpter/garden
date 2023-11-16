import { Component } from '@angular/core';
import {ProductService} from "../product.service";
import { searchProduct } from 'src/assets/js/search.helper.js';
import {environment} from "../environment/environment";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent  {

  products:any;
  imageUrl= environment.baseUrl+'/resources/';
  constructor(private productService:ProductService) {}
  ngOnInit(){
    this.productService.getProduct().subscribe(data =>{
      this.products=data;
    })

    const input = document.querySelector("input");
    const form = document.querySelector("form");
    form?.addEventListener("submit", async function(event) {
      event.preventDefault();
      const tabContent = document.querySelector(".tab-content");
      searchProduct(input?.value, tabContent);

  });

}
  customOptions5: any={
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
