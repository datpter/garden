import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {UserStoreService} from "../user-store.service";
import {AuthService} from "../auth.service";
import {environment} from "../environment/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BASE_URL} from "../../assets/js/app.config";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements  OnInit, AfterViewChecked{
  imageUrl= environment.baseUrl+'/resources/';
  public updateForm!: FormGroup;
  total:number=0;
  productId!: number;
  carts:any;
  userId:any;
  ordertotal:number=0;
  constructor(private cartService:CartService, private userStore: UserStoreService,private auth: AuthService,private fb:FormBuilder, private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.updateForm = this.fb.group({
      quanity:"",
    });
    this.userStore.getIdFromStore()
      .subscribe(val=>{
        this.userId  = this.auth.getIdFromToken();
      });
    console.log(this.userId)
    this.cartService.getCartById(this.userId).subscribe((res)=>{
      this.carts=res;
      for (const item of this.carts) {
        console.log(item.subtotal)
        this.total+=item.subtotal

      }
      console.log(this.carts)
      this.ordertotal=this.total+15


    })


    const updateBtn = document.querySelector(".update-btn");
    console.log(updateBtn);

    updateBtn?.addEventListener("click", async () => {
      const productRows = Array.from(document.querySelectorAll(".product-row"));
      const cartQuantityInputs = Array.from(document.querySelectorAll(".cart-quantity-input"));
      // Nhat ra quantity can update
      for (const p of productRows) {
        // chu y
        // @ts-ignore
        const id = p.querySelector(".cart-product-id").firstElementChild.textContent;
        // @ts-ignore
        const unit = p.querySelector(".cart-product-quantity").firstElementChild.value;

        const url = `${BASE_URL}/Cart/${id}?unit=${unit}`;

        // chu y
        const configInit: RequestInit = {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
        const request: Promise<Response> = fetch(url, configInit);
      }

    });


  }
  delete(id:any){
    if(confirm('Are you really want to delete ')){
      this.cartService.deleteCartById(id).subscribe((data)=>{
        this.cartService.getCartById(this.userId).subscribe((data)=>{
          this.carts=data;
        })
      })
    }

  }
  updateItem(id: number, newData: any) {
    this.cartService.updateCart(id, newData).subscribe(
      (response) => {
        console.log('Update successful', response);
        // Handle success (e.g., show a success message)
      },
      (error) => {
        console.error('Update failed', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
  onSubmit() {
  console.log(this.updateForm.value)
  }

  changeItem() {
    console.log('hello')
  }

  ngAfterViewChecked(): void {

  }
}
