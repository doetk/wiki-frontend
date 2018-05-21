import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as constants from '../../app.constants';
import { User } from '../../models/user';
import { NOOP } from '@angular/core/src/view/util';

const loginOptions = new RequestOptions({
  withCredentials: true,
});

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getById(_id: number) {
    const url = constants.USERSURL + '/' + _id;
    return this.http
      .get(url, loginOptions)
      .map(response => response.json())
      .catch(e => {
        return Observable.throw(e.json);
      });
  }

  getLastLogout(_id: number) {
    const url = constants.USERSURL + '/last-logout/' + _id;
    return this.http
      .get(url, loginOptions)
      .map(response => response.json())
      .catch(e => {
        return Observable.throw(e.json);
      });
  }

  login(username: string, password: string) {
    const body = `{"uid":"${username}","psw":"${password}"}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({
      headers: headers,
      withCredentials: true,
    });

    return this.http
      .post(constants.LOGINURL, body, options)
      .map(response => response.json());
  }

  logout() {
    return this.http
      .put(constants.LOGOUTURL, null, loginOptions)
      .map(response => response.json());
  }

  signup(user: any) {
    return this.http
      .post(constants.SIGNUPURL, user)
      .map(response => response.json());
  }

  getAuthor(_id: number) {
    const url = constants.USERSURL + '/author/' + _id;
    return this.http.get(url).map(response => response.json());
  }

  updateInfo(user) {
    return this.http
      .put(constants.USERSURL + '/update/info', user, loginOptions)
      .map(res => res.json())
      .catch(e => {
        return Observable.throw(JSON.parse(e._body));
      });
  }

  updatePassword(user) {
    return this.http
      .put(
        constants.USERSURL + '/update/password',
        { user: user },
        loginOptions,
      )
      .map(res => res.json())
      .catch(e => {
        return Observable.throw(e.json);
      });
  }
}
