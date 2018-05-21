import * as Pages from '../actions/pages.action';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { IPages } from '../interfaces/pages.interface';
import { IPage } from '../interfaces/page.interface';
import { Action } from '@ngrx/store';

const storeInitialState: IPages = {
  pages: [],
  getPagesInProgress: false,
  getPagesFailed: false,

  getAuthorsInProgress: false,
  getAuthorsCompleted: false,
  authorId: undefined,
  pageIndex: undefined,
};

export function pagesReducer(
  state: IPages = storeInitialState,
  action: PayloadAction,
): IPages {
  if (action.type === Pages.UPDATE_PAGES_DETAILS) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === Pages.REQ_PAGES) {
    return Object.assign({}, state, { getPagesInProgress: true });
  }

  if (action.type === Pages.PAGES_COMPLETED) {
    return Object.assign({}, state, action.payload, {
      getPagesInProgress: false,
      getPagesFailed: false,
    });
  }

  if (action.type === Pages.PAGES_FAILED) {
    return Object.assign({}, state, {
      getPagesInProgress: false,
      getPagesFailed: true,
    });
  }

  if (action.type === Pages.UPDATE_AUTHORS_DETAILS) {
    const newPageObj = Object.assign(
      {},
      state.pages[action.payload.pageId],
      action.payload,
    );
    const newState = JSON.parse(JSON.stringify(state));
    newState.pages[action.payload.pageId] = newPageObj;
    return newState;
  }

  if (action.type === Pages.REQ_AUTHORS_DETAILS) {
    return Object.assign({}, state, action.payload, {
      getAuthorInProgress: true,
      getAuthorCompleted: false,
    });
  }

  if (action.type === Pages.GET_AUTHORS_COMPLETED) {
    return Object.assign({}, state, {
      getAuthorInProgress: false,
      getAuthorCompleted: true,
    });
  }

  if (action.type === Pages.GET_AUTHORS_FAILED) {
    return Object.assign({}, state, {
      getAuthorInProgress: false,
      getAuthorCompleted: false,
    });
  }
  return state;
}
