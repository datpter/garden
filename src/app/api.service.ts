import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../assets/js/app.config";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = `${BASE_URL}/api/User`;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }
}
