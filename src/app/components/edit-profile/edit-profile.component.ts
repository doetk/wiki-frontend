import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
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
import { updateSuccess } from '../../state/actions/user.action';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @Input('username') private username: string;
  private email: string;
  private firstName: string;
  private lastName: string;
  private user: User;
  private userid: number;
  private returnPath: number;
  private correctPassword = true;
  private missingFields = false;
  private missingPassword = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private store: Store<IStore>,
    private snackBar: MatSnackBar,
  ) {
    this.store.select(s => s.userReducer.userid).subscribe((userid: number) => {
      this.userid = userid;
    });
  }

  ngOnInit() {
    this.user = new User();
    this.route.queryParamMap // TODO check null query param
      .switchMap((params: ParamMap) => {
        const id: number = Number(params.get('id'));
        return this.userService.getById(id);
      })
      .subscribe(
        user => {
          this.user = user;
        },
        err => {
          this.location.back();
        },
      );

    if (this.user.uid === undefined) {
      // TODO return to current User's profile
      this.returnPath = this.userid;
    } else {
      this.returnPath = Number.parseInt(this.user.uid);
    }
  }
  onSubmit(editForm: NgForm) {
    // TODO add error handling, only submit changed fields in request body

    const tempUser = editForm.value;
    const enteredPassword = editForm.value.password;
    delete tempUser.password;

    // Checks for values not modified by user
    for (const key in tempUser) {
      if (tempUser[key] === '') {
        delete tempUser[key];
      }
    }

    // Checks to make sure user has updated at least one field
    // TODO add error message to ui
    if (Object.keys(tempUser).length === 0) {
      this.missingFields = true;
      return;
    } else {
      this.missingFields = false;
    }

    // Checks if user has entered a password
    // TODO add error message to ui
    if (enteredPassword === '') {
      this.missingPassword = true;
      return;
    } else {
      this.missingPassword = false;
    }

    const user = { user: tempUser, password: enteredPassword };

    // TODO add error messages, only re-route on successful change
    this.userService.updateInfo(user).subscribe(
      res => {
        //  this.openSnackBar('Information Updated', 'OK');
        this.store.dispatch(updateSuccess());
        this.router.navigate(['/profile/' + this.returnPath]);
      },
      err => {
        // TODO add error message to UI
        if (err.message === 'Invalid credentials') {
          this.correctPassword = false;
        } else if (err.message === 'username') {
          // display proper error message
          console.log('username already exists');
          console.log(err);
        } else if (err.message === 'email') {
          console.log('email already exists');
          console.log(err.message);
        }
      },
    );
  }

  cancelForm() {
    // this.location.back();
    this.router.navigate(['/profile/' + this.returnPath]); // TODO remove
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 100000,
    });
  }
}
