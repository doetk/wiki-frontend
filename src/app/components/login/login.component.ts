import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { IStore } from '../../state/interfaces/store.interface';
import { Store } from '@ngrx/store';
import { reqLogin } from '../../state/actions/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  psw = new FormControl('', [Validators.required]);
  public user: User = new User();

  constructor(private store: Store<IStore>) {}

  login() {
    this.store.dispatch(reqLogin(this.user.uid, this.user.psw));
  }
  getPaswordErrorMessage() {
    return this.psw.hasError('required')
      ? 'Password is Required!'
      : this.psw.hasError('password');
  }
  getUserNameErrorMessage() {
    return this.username.hasError('required')
      ? 'Username is Required!'
      : this.username.hasError('username');
  }
}
