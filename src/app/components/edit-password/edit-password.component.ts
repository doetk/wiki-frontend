import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Location } from '@angular/common';
import { User } from '../../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { IUser } from '../../state/interfaces/user.interface';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css'],
})
export class EditPasswordComponent {
  oldPassMissing: Boolean = false;
  newPassMissing: Boolean = false;
  oldPassWrong: Boolean = false;
  passwordsMatch: Boolean = true;

  oldPassErrorRemove: Boolean = false;
  newPassErrorRemove: Boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  onSubmit(form: NgForm) {
    const info = form.value;
    console.log(form);
    // TODO add error messages to ui

    // Checks to make sure user has entered a current password
    if (info.oldPassword === '') {
      this.oldPassMissing = true;
      this.oldPassWrong = false;
      this.oldPassErrorRemove = true;
      return;
    } else {
      this.oldPassMissing = false;
    }

    // Checks to make sure user has entered new password correctly
    if (info.newPassword !== info.confirmPassword) {
      this.passwordsMatch = false;
      this.newPassErrorRemove = true;
      return;
    } else {
      this.passwordsMatch = true;
    }

    // Checks to make sure user has entered data into new password and confirm password fields
    if (info.newPassword === '') {
      this.newPassMissing = true;
      this.newPassErrorRemove = true;
      return;
    } else {
      this.newPassMissing = false;
    }

    // TODO add error messages to ui
    this.userService.updatePassword(info).subscribe(
      result => {
        // returns 204 No Content if successful
        this.location.back();
      },
      err => {
        this.oldPassWrong = true;
        this.oldPassErrorRemove = true;
      },
    );
  }

  cancelForm() {
    this.location.back();
  }
}
