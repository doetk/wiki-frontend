import { PayloadAction } from './../interfaces/payloadaction.interface';
import * as actions from './page.action';
import { Revisions } from '../interfaces/page-content.interface';

const today = new Date();
const title = 'myTitle';
const route = 'www.wiki.com';
const shortRoute = 'myVeryShortRoute';
const description = 'This is how we describe an article';
const revisionid = 1;
const modified = today;
const author = 5;
const pagedata = 'There is a lot i can write here. Maybe i can write about me!';
const revisions: Revisions[] = [
  {
    route: 'myRoute',
    RevisionId: 2,
  },
];
const authorFirstName = 'myFirstname';
const authorLastName = 'myLastName';
const userid = 7;

describe('Actions::Page Actions', () => {
  it('should create an action to update page details', () => {
    const payload: PayloadAction = {
      type: actions.UPDATE_PAGE_DETAILS,
      payload: {
        title,
        route,
        shortRoute,
        description,
        revisionid,
        modified,
        author,
        pagedata,
        revisions,
      },
    };
    const action = actions.updatePageDetails(
      title,
      route,
      shortRoute,
      description,
      revisionid,
      modified,
      author,
      pagedata,
      revisions,
    );
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action to update page revision details', () => {
    const payload: PayloadAction = {
      type: actions.UPDATE_REV_DETAILS,
      payload: {
        title,
        route,
        shortRoute,
        modified,
        author,
        pagedata,
      },
    };
    const action = actions.updatePageRevDetails(
      title,
      route,
      shortRoute,
      modified,
      author,
      pagedata,
    );
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action to update author details', () => {
    const payload: PayloadAction = {
      type: actions.UPDATE_AUTHOR_DETAILS,
      payload: {
        authorFirstName,
        authorLastName,
      },
    };
    const action = actions.updateAuthorDetails(authorFirstName, authorLastName);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action on request page', () => {
    const payload: PayloadAction = {
      type: actions.REQ_PAGE,
      payload: {
        shortRoute: shortRoute,
      },
    };
    const action = actions.reqPage(shortRoute);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for page completion', () => {
    const payload: PayloadAction = {
      type: actions.PAGE_COMPLETED,
      payload: {
        userid,
      },
    };
    const action = actions.pageCompleted(userid);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for a failed page', () => {
    const action = actions.pageFailed();
    expect({ ...action }).toEqual({ type: actions.PAGE_FAILED });
  });

  it('should create an action for creating a new page', () => {
    const payload: PayloadAction = {
      type: actions.NEW_PAGE,
      payload: {
        title: shortRoute,
      },
    };
    const action = actions.newPage(shortRoute);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for new page completion', () => {
    const payload: PayloadAction = {
      type: actions.NEW_PAGE_COMPLETED,
      payload: {
        newPageRoute: shortRoute,
      },
    };
    const action = actions.newPageCompleted(shortRoute);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for a new page failed attempt', () => {
    const action = actions.newPageFailed();
    expect({ ...action }).toEqual({ type: actions.NEW_PAGE_FAILED });
  });

  it('should create an action to edit an article', () => {
    const payload: PayloadAction = {
      type: actions.EDIT_ARTICLE,
      payload: {
        shortRoute,
        pagedata,
      },
    };
    const action = actions.editArticle(shortRoute, pagedata);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for edit article completion', () => {
    const payload: PayloadAction = {
      type: actions.EDIT_ARTICLE_COMPLETED,
      payload: {
        pagedata,
      },
    };
    const action = actions.editArticleCompleted(pagedata);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for edit article failed attempt', () => {
    const action = actions.editArticleFailed();
    expect({ ...action }).toEqual({ type: actions.EDIT_ARTICLE_FAILED });
  });

  it('should create an action to request revision', () => {
    const payload: PayloadAction = {
      type: actions.REQ_REVISION,
      payload: {
        shortRoute,
        revisionid,
      },
    };
    const action = actions.reqRevision(shortRoute, revisionid);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for request revision completion', () => {
    const action = actions.revisionCompleted();
    expect({ ...action }).toEqual({ type: actions.REVISION_COMPLETED });
  });

  it('should create an action for request revision failed', () => {
    const action = actions.revisionFailed();
    expect({ ...action }).toEqual({ type: actions.REVISION_FAILED });
  });

  it('should create an action get author name completion', () => {
    const action = actions.getAuthorCompleted();
    expect({ ...action }).toEqual({ type: actions.GET_AUTHOR_COMPLETED });
  });

  it('should create an action for get author name failed', () => {
    const action = actions.getAuthorFailed();
    expect({ ...action }).toEqual({ type: actions.GET_AUTHOR_FAILED });
  });
});
