import { loginFailed } from './../actions/user.action';
import { userReducer } from './user.reducer';
import { updateUserDetails } from '../actions/user.action';
import * as userActions from '../actions/user.action';
import { IUser } from '../interfaces/user.interface';
import * as fromUserReducer from './user.reducer';

describe('REDUCERS::userReducer:', () => {
  describe('An undefined action', () => {
    it('should return the default/intitial store state', () => {
      const action = {} as any;
      const result = userReducer(undefined, action);

      expect(result).toEqual(fromUserReducer.storeInitialState);
    });
  });

  describe('REQ_LOGIN', () => {
    it('should make loginInProgress to true', () => {
      const user = { username: 'test', password: '5432' };
      const createAction = userActions.reqLogin(user.username, user.password);
      const result = userReducer(
        fromUserReducer.storeInitialState,
        createAction,
      );

      expect(result.loginInProgress).toEqual(true);
      expect(result.username).toEqual('test');
      expect(result.loggedIn).toEqual(false);
    });
  });

  describe('REQ_SIGNUP', () => {
    it('should make signUpProgress to true', () => {
      const user = {
        username: 'test',
        password: '123',
        first_name: 'theo',
        last_name: 'Sam',
        email: 'abc@def.gh',
      };
      const createAction = userActions.reqSignup(
        user.username,
        user.password,
        user.first_name,
        user.last_name,
        user.email,
      );

      const expectedResult: IUser = {
        userid: undefined,
        username: 'test',
        password: '123',
        first_name: 'theo',
        last_name: 'Sam',
        email: 'abc@def.gh',
        loggedIn: false,
        loginInProgress: false,
        logoutInProgress: false,
        lastLoginFailed: false,
        lastLogoutFailed: false,
        signupInProgress: true,
        signedUp: false,
        updateInfo: false,
      };

      const result = userReducer(
        fromUserReducer.storeInitialState,
        createAction,
      );

      expect(result).toEqual(expectedResult);
      expect(result.username).toEqual('test');
      // expect(result.loggedIn).toEqual(true);
    });
  });
  // describe('LOGIN_COMPLETED', () => {
  //   it('should make loginInProgress to true', () => {
  //     const action = userActions.loginCompleted();
  //     const result = userReducer(fromUserReducer.storeInitialState, action);
  //     const expectedResult = {
  //       loginInProgress: false,
  //       lastLoginFailed: false,
  //       loggedIn: true,
  //       password: undefined,
  //     };
  //   });
  // });
});
//   describe('LOGIN_FAILURE', () => {
//     it('should have an error and no pending state', () => {
//       const error = 'login failed';
//       const createAction = new LoginFailure(error);

//       const expectedResult = {
//         error: error,
//         pending: false,
//       };

//       const result = reducer(fromLoginPage.initialState, createAction);

//       expect(result).toMatchSnapshot();
//     });
//   });
