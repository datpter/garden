  import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {environment} from "../environment/environment";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {APP_URL} from "../../assets/js/app.config";
import {CartService} from "../cart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UserStoreService} from "../user-store.service";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']


})


export class ProductComponent implements OnInit, AfterViewChecked {
  productList!:any[];
  product:any;
  products:any;
  userId:any;
  productId!: string;
  addToCartForm!: FormGroup;
  id:any;
  category:any;
  imageUrl= environment.baseUrl+'/resources/';
  subTotal!: any;
  constructor(private productService:ProductService,private route:ActivatedRoute,private cartService:CartService,private fb:FormBuilder, private auth: AuthService,   private router: Router,
              private userStore: UserStoreService) {
  }

  ngAfterViewChecked(): void {
        let url: any = APP_URL;
        const links = Array.from(document.querySelectorAll((".product-link")));
        links.forEach(link => {
          link.addEventListener("click", function () {
            const href = link.getAttribute("href");
            // window.location.href = APP_URL + href;
            window.location.replace(APP_URL + href);

          })
        })
    }

  ngOnInit():void {
    this.userStore.getIdFromStore()
      .subscribe(val=>{
        this.userId  = this.auth.getIdFromToken();
      })
      console.log(this.userId), console.log(  this.productId = this.route.snapshot.paramMap.get('id') as string)
    this.addToCartForm = this.fb.group({
      userId: this.userId,
      Unit:'',
      productId:this.productId,
      total:''
    });


    this.route.paramMap.subscribe((params)=>{
      this.id=params.get('id')

    });

    this.getProductById(this.id);
    this.productService.getProductById(this.id).subscribe((data)=>{
      this.product=data;
      this.productService.getProductRelate(this.product.category).subscribe((data)=>{
        this.products=data;
      })
    })


  }

  getProductById(id:any){
    this.productService.getProductById(id).subscribe((res)=>{
      this.product=res;
    })
  }
  getProductRelate(category:string){
    this.productService.getProductRelate(category).subscribe((res)=>{
      this.products=res;
    })
  }

  onSubmit() {

    this.productService.getProductById(this.addToCartForm.value.productId).subscribe((res)=>{
      this.product=res;
      this.addToCartForm.value.total=this.product.price*this.addToCartForm.value.Unit
      let cartOBJ = {
        ...this.addToCartForm.value,
      }
      console.log(this.addToCartForm.value);
      this.cartService.addToCart(this.addToCartForm.value).subscribe(
        {
          next:(res=>{
            this.addToCartForm.reset();

            alert("Add To Cart Success")
          }),
          error:(err=>{

          })
        }
      )
    })
  }


  id1 = "add-info"
  tabChange(ids: any){
    this.id1 = ids;
    console.log(ids);
  }




  customOptionsProduct: any={
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
        items:4
      }
    }
  }

}
