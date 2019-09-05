import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginCredential} from '../models';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
      private messageService: MessageService,
      private loginService: LoginService,
      private router: Router,
      formBuilder: FormBuilder
  ) {
    this.loginFormGroup = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  login() {
    const loginCredential: LoginCredential = this.loginFormGroup.value;
    this.loginService.login(loginCredential)
      .then(authData => {
        this.router.navigate(['/list']);
      })
      .catch(authError => {
        this.messageService.showAlert('Sorry!', 'Something went wrong.', 'Login failed.');
        this.loginFormGroup.reset();
      });
  }

}
