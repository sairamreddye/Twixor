import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../interfaces/user-options';
import { LoginService } from '../../../providers/login.service';
import { storage } from './../../../providers/storage/storage';
import { StorageService } from '../../../providers/storage/storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  post: any;
  loginData: Login;
  error: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  getError(el) {
    switch (el) {
      case 'email':
        if (this.loginForm.get('email').hasError('required')) {
          return 'email required';
        }
        break;
      case 'pass':
        if (this.loginForm.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
  }

  login(loginForm) {
    this.loginData = loginForm;
    this.loginservice.getlogin(this.loginData).subscribe(
      (res: any) => {
        const response = res;
        if (response.status) {
          const token = response.response['token'];
          // storage.setToken(token);
          this.storageService.setToken(token)
          // const userToken = storage.getToken();
          const userToken = this.storageService.getToken();
          this.router.navigateByUrl(`/chat?authToken=${userToken}`);
        }
      },
      (err) => {
        this.error = err;
        console.log(this.error);
        this.loginForm.reset();
        this.router.navigateByUrl(`/login`);
      });
  }

}

 // this.ngxUiLoaderService.stop();
        // this.isModelShow = true;
        // // alert('Invalid Login');
        // this.errorMessage = "Invalid Login"
// localStorage.setItem('token', token);
// this.loginForm.reset();
// this.router.navigateByUrl(`/chat?authToken=ZAJ9kzAR9LqFKZtc2zK7Z8bY5MglTeUkHDY8yIC7jbEfXZJCEMLuKFgxM9RtZPcl`);
//  const token = 'Y02UcasqJOTzHxlEp4iwfMbY5MglTeUkHDY8yIC7jbEfXZJCEMLuKFgxM9RtZPcl';