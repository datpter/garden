import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { BASE_URL } from 'src/assets/js/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl:string ='https://localhost:7293/api/Room/Single';
  categoryUrl:string ='https://localhost:7293/api/Room';
  constructor(private http:HttpClient) { }
  getProduct(): Observable<any>{
    return this.http.get<any>(BASE_URL+ '/Room');
  }

  getProduct1(search_key:any=null): Observable<any>{
    let url= (BASE_URL+ '/Room');

    if(search_key!=null){
      url+='&name_like='+search_key;

    }
    return this.http.get<any>(url);
  }

  getProductHome(): Observable<any>{
    return this.http.get<any>('https://localhost:7293/api/Room/home');
  }

  getProducttop(): Observable<any>{
    return this.http.get<any>('https://localhost:7293/api/Room/top');
  }
  getProductRelate(category:string){
    return this.http.get(`${this.categoryUrl}/${category}`);
  }
  getProductById(id:any){
    return this.http.get(`${this.productUrl}/${id}`);
  }

}
