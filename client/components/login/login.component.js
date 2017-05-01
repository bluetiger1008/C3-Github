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
    this.isAdmin = Auth.isAdminSync;
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
          // if(this.isAdmin() == true)
          this.$state.go('portal');
          // else
          //   this.$state.go('final');
        })
        .catch(err => {
          console.log('error', err.message);
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
