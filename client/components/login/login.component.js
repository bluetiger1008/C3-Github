'use strict';
// @flow

type User = {
  name: string;
  email: string;
  password: string;
};

export class LoginComponent {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          console.log('loggedin');
          this.$state.go('portal');
        })
        .catch(err => {
          console.log('error');
          this.errors.login = err.message;
        });
    }
  }
}

export default angular.module('directives.login', [])
  .component('login', {
    template: require('./login.html'),
    controller: LoginComponent
  })
  .name;
