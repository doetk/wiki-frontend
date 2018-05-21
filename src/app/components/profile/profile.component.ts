import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { IUser } from '../../state/interfaces/user.interface';
import { Observable } from 'rxjs/Observable';
import { updateComplete } from '../../state/actions/user.action';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  userid: number;
  username = 'Username';
  profileImagePath = 'path';
  lastActivity = 'test_date';
  recentActivity = ['test activity1', 'test activity2'];
  canEditProfile: boolean;
  showNotification: boolean;


  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<IStore>,
  ) {
    this.store.select(s => s.userReducer.userid).subscribe((userid: number) => {
      this.userid = userid;
    });

    this.store.select(s => s.userReducer.updateInfo). subscribe((updateInfo: boolean) => {
      this.showNotification = updateInfo;
    });
  }

  ngOnInit() {
    console.log(this.showNotification);
    this.user = new User();
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id: number = Number(params.get('id'));
        return this.userService.getById(id);
      })
      .subscribe(user => {
        this.user = user;
        this.canEditProfile = this.checkUserId();
      }, err => { // Redirect back to previous page when trying to access someone else's data
          this.location.back();
      });
    this.userService.getLastLogout(this.userid)
    .subscribe(res => {
      this.lastActivity = new Date(res.last_logout).toLocaleString();
    },
      e => {
        this.lastActivity = Date.now().toLocaleString();
      });

    if (this.showNotification) {
      setTimeout(() => {
        this.store.dispatch(updateComplete());
      }, 2000);
    }
  }

  goToEditProfile() {
    this.router.navigate(['profile/edit/profile'], {
      queryParams: { id: this.userid },
    });
  }

  goToEditPassword() {
    this.router.navigate(['profile/edit/password'], {
      queryParams: { id: this.user.uid },
    });
  }

  findUser(id: number) {
    this.userService.getById(id).subscribe(user => (this.user = user));
  }

  checkUserId() {
    const currentProfileId = Number.parseInt(this.route.snapshot.params['id']);
    return currentProfileId === this.userid;
  }
}
