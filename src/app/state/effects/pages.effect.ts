import { UPDATE_AUTHOR_DETAILS } from './../actions/page.action';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';

import { PayloadAction } from '../interfaces/payloadaction.interface';
import { PageService } from '../../services/page/page.service';
import * as Pages from '../actions/pages.action';
import { defer } from 'rxjs/observable/defer';
import { UserService } from '../../services/user/user.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class PagesEffects {
  constructor(
    private actions$: Actions,
    private _pageService: PageService,
    private _userService: UserService,
  ) {}

  @Effect()
  reqPages$: Observable<Action> = this.actions$
    .ofType(Pages.REQ_PAGES)
    .switchMap((action: Action): ObservableInput<Action> => {
      return this._pageService
        .getAll()
        .mergeMap(pagesData => {
          return Observable.from([
            Pages.updatePagesDetails(
              pagesData.map(page => {
                return Object.assign(page, {
                  shortRoute: page.route,
                  description: page.description,
                });
              }),
            ),
            ...pagesData.map((page, idx) =>
              Pages.reqAuthorsDetails(page.author, idx),
            ),
            Pages.pagesCompleted(),
          ]);
        })
        .catch(err => {
          return of(Pages.pagesFailed());
        });
    });

  @Effect()
  reqAuthorsDetails$: Observable<Action> = this.actions$
    .ofType(Pages.REQ_AUTHORS_DETAILS)
    .mergeMap((action: PayloadAction): ObservableInput<Action> => {
      return this._userService
        .getAuthor(action.payload.authorId)
        .mergeMap(authorData => {
          return Observable.from([
            Pages.updateAuthorsDetails(
              authorData.first_name,
              authorData.last_name,
              action.payload.pageIndex,
            ),
            Pages.getAuthorsCompleted(),
          ]);
        })
        .catch(err => {
          console.log(err);
          return of(Pages.getAuthorsFailed());
        });
    });
}
