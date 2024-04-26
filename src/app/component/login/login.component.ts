import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  showError: boolean = false;
  showPwdError: boolean = false;

  constructor(private router: Router) { }
  ngOnInit() {}

   /* Function: redirectToOrders
   * Desc: Redirect to the ordeers page once checkout is done
    * Params: none
   * Return: none
   */
   redirectToOrders() {
     if(this.loginForm.controls.email.value == ''){
      this.showError = true;
     }
     if(this.loginForm.controls.password.value == '') {
      this.showPwdError = true;
     }
     if(this.loginForm.valid) {
      this.router.navigate(["orders"]);
     } 

  }
}
