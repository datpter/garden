import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/assets/js/app.config';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartUrl:string=`${BASE_URL}/Cart`;
  constructor(private http:HttpClient) { }
  addToCart(cart: any) {
    return this.http.post<any>(`${this.cartUrl}`, cart)
  }
  getCartById(id:any){
    return this.http.get(`${this.cartUrl}/${id}`)

  }
  deleteCartById(id:any){
    return this.http.delete(`${this.cartUrl}/${id}`)
  }
  updateCart(id:any,newData: any)
  {
    return this.http.put(`${this.cartUrl}/${id}` ,newData);
  }
}
