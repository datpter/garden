import { Component, OnInit } from '@angular/core';
import { login } from 'src/assets/js/account.helper';
import { BASE_URL } from 'src/assets/js/app.config';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import ValidateForm from "../helpers/validationform";
import {Router} from "@angular/router";
import {UserStoreService} from "../user-store.service";
import {AuthService} from "../auth.service";
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,

    private auth: AuthService,
    private router: Router,

    private userStore: UserStoreService
  ) {}


  ngOnInit(): void {
    //validate
    // Lấy 2 ô username và password từ DOM
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.setIdForStore(tokenPayload.UserId);
          alert("Login Success")
          this.router.navigate([''])
        },
        error: (err) => {
          alert(err?.error.message)
          console.log(err);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }


}
