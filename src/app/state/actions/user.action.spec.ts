import { PayloadAction } from './../interfaces/payloadaction.interface';
import * as actions from './user.action';

describe('Actions::User Actions', () => {
  it('should create an action on a successful login attempt', () => {
    const action = actions.loginCompleted();
    expect({ ...action }).toEqual({ type: actions.LOGIN_COMPLETED });
  });

  it('should create an action to a failed login attempt', () => {
    const action = actions.loginFailed();
    expect({ ...action }).toEqual({ type: actions.LOGIN_FAILED });
  });

  it('should create an action on a successful signup', () => {
    const action = actions.signupCompleted();
    expect({ ...action }).toEqual({ type: actions.SIGNUP_COMPLETED });
  });

  it('should create an action on a failed signup attempt', () => {
    const action = actions.signupFailed();
    expect({ ...action }).toEqual({ type: actions.SIGNUP_FAILED });
  });

  it('should create an action on a successful logout', () => {
    const action = actions.logoutCompleted();
    expect({ ...action }).toEqual({ type: actions.LOGOUT_COMPLETED });
  });

  it('should create an action on a failed logout attempt', () => {
    const action = actions.logoutFailed();
    expect({ ...action }).toEqual({ type: actions.LOGOUT_FAILED });
  });

  it('should create an action for request login', () => {
    const username = 'test123';
    const password = 'myPswd';
    const payload: PayloadAction = {
      type: actions.REQ_LOGIN,
      payload: {
        username: username,
        password: password,
      },
    };
    const action = actions.reqLogin(username, password);
    expect({ ...action }).toEqual(payload);
  });

  it('should create an action for request signup', () => {
    const username = 'test123';
    const password = 'myPswd';
    const first_name = 'Test';
    const last_name = 'Testerson';
    const email = 'test@testerson.com';
    const payload: PayloadAction = {
      type: actions.REQ_LOGIN,
      payload: {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
    };
    const action = actions.reqSignup(
      username,
      password,
      first_name,
      last_name,
      email,
    );
    expect({ ...action.payload }).toEqual(payload.payload);
  });

  it('should create an action to update user info', () => {
    const userid = 20;
    const username = 'test123';
    const first_name = 'Test';
    const last_name = 'Testerson';
    const email = 'test@testerson.com';
    const payload: PayloadAction = {
      type: actions.UPDATE_USER_DETAILS,
      payload: {
        userid: userid,
        username: username,

        first_name: first_name,
        last_name: last_name,
        email: email,
      },
    };
    const action = actions.updateUserDetails(
      userid,
      username,
      first_name,
      last_name,
      email,
    );
    expect({ ...action }).toEqual(payload);
  });
});
