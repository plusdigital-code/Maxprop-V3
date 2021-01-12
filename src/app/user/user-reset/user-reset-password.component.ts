import { Component, OnInit, DoCheck } from '@angular/core';
import { FormioResourceComponent } from 'angular-formio/resource';
import { Formio } from 'formiojs';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmValidation';
declare var $: any;
@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-reset-password.component.html',
})
export class UserResetPasswordComponent {
  submitted = false;
  changePasswordForm: FormGroup;
  query = {};
  constructor(private router: Router, private fb: FormBuilder) {
    location.search.substr(1).split("&").forEach((item) => {
      this.query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
    });
    const hasToken = localStorage.getItem('formioToken');
    if (this.query['token'] && !hasToken) {
      Formio.setToken(this.query['token']);
      localStorage.removeItem('formioAppUser');
      localStorage.removeItem('formioUser');
    }
  }

  get f() { return this.changePasswordForm.controls; }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    Formio.currentUser().then((user: any) => {
      Formio.setUser(user);
      user.data.password = this.f.password.value;
      const userFormio = new Formio(AppConfig.appUrl + '/user/submission/' + user._id);
      userFormio.saveSubmission(user).then((sub: any) => {
        this.router.navigate(['/user/' + user._id + '/view']);
      });
    });
  }
}
