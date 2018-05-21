import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { IStore } from '../../state/interfaces/store.interface';
import { Store } from '@ngrx/store';
import { reqSignup } from '../../state/actions/user.action';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public user: User = new User();
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  psw = new FormControl('', [Validators.required, Validators.minLength(6)]);
  first = new FormControl('', [Validators.required]);
  last = new FormControl('', [Validators.required]);

  constructor(private store: Store<IStore>, private location: Location) {}

  getEmailErrorMessage() {
    return this.email.hasError('required')
      ? 'Email is Required!'
      : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getUserNameErrorMessage() {
    return this.username.hasError('required')
      ? 'Username is Required!'
      : this.username.hasError('username')
        ? this.username.hasError('pattern')
        : 'Must be at least 5 characters';
  }

  getFirstNameErrorMessage() {
    return this.first.hasError('required')
      ? 'First Name is Required!'
      : this.first.hasError('first');
  }

  getLastNameErrorMessage() {
    return this.last.hasError('required')
      ? 'Last Name is Required!'
      : this.last.hasError('last');
  }
  getPaswordErrorMessage() {
    return this.psw.hasError('required')
      ? 'Password is Required!'
      : this.psw.hasError('password')
        ? this.psw.hasError('pattern')
        : 'Must be at least 6 characters';
  }

  signup() {
    this.store.dispatch(
      reqSignup(
        this.user.username,
        this.user.psw,
        this.user.first,
        this.user.last,
        this.user.eml,
      ),
    );
  }

  goBack() {
    this.location.back();
  }
}
