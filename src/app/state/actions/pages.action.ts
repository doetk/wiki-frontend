import { Action } from '@ngrx/store';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { IPage } from '../interfaces/page.interface';

export const UPDATE_PAGES_DETAILS = 'UPDATE_PAGES_DETAILS';
export const REQ_PAGES = 'REQ_PAGES';
export const PAGES_COMPLETED = 'PAGES_COMPLETED';
export const PAGES_FAILED = 'PAGES_FAILED';

export const GET_AUTHORS_COMPLETED = 'GET_AUTHORS_COMPLETED';
export const GET_AUTHORS_FAILED = 'GET_AUTHORS_FAILED';
export const REQ_AUTHORS_DETAILS = 'REQ_AUTHORS_DETAILS';
export const UPDATE_AUTHORS_DETAILS = 'UPDATE_AUTHORS_DETAILS';

export const reqAuthorsDetails = (
  authorId: number,
  pageIndex: number,
): PayloadAction => {
  return {
    type: REQ_AUTHORS_DETAILS,
    payload: {
      authorId,
      pageIndex,
    },
  };
};

export const updateAuthorsDetails = (
  authorFirstName: string,
  authorLastName: string,
  pageId: number,
): PayloadAction => {
  return {
    type: UPDATE_AUTHORS_DETAILS,
    payload: {
      authorFirstName,
      authorLastName,
      pageId,
    },
  };
};

export const updatePagesDetails = (pages: IPage[]): PayloadAction => {
  return {
    type: UPDATE_PAGES_DETAILS,
    payload: {
      pages: pages,
    },
  };
};

export const reqPages = (): Action => {
  return {
    type: REQ_PAGES,
  };
};

export const pagesCompleted = (): Action => {
  return {
    type: PAGES_COMPLETED,
  };
};

export const pagesFailed = (): Action => {
  return {
    type: PAGES_FAILED,
  };
};

export const getAuthorsCompleted = (): Action => {
  return {
    type: GET_AUTHORS_COMPLETED,
  };
};

export const getAuthorsFailed = (): Action => {
  return {
    type: GET_AUTHORS_FAILED,
  };
};
