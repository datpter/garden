import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../helpers/validationform";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(private fb : FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }
  get f(){
    return this.signUpForm.controls
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      let signUpObj = {
        ...this.signUpForm.value,
        role:'',
        token:''
      }
      this.auth.signUp(signUpObj)
        .subscribe({
          next:(res=>{
            console.log(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
            alert("Sign Up Success")
          }),
          error:(err=>{
            alert(err?.error.message)
          })
        })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm); //{7}
    }
  }

}
