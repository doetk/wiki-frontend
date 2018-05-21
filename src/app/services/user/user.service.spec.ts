import { PAGESURL } from './../../app.constants';
import {} from 'jasmine';
import * as constants from '../../app.constants';
import {
  TestBed,
  inject,
  fakeAsync,
  getTestBed,
  async,
} from '@angular/core/testing';

import { UserService } from './user.service';
import {
  ConnectionBackend,
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const result = {
  userid: 1,
  username: 'test',
  password: '123',
  first_name: 'Test',
  last_name: 'Tester',
  email: 'test@testing.com',
};

describe('Services:: UserService', () => {
  let backend: MockBackend;
  let service: UserService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [
          UserService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (
              myBackend: XHRBackend,
              defaultOptions: BaseRequestOptions,
            ) => {
              return new Http(myBackend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions],
          },
        ],
      });
      const testbed = getTestBed();
      backend = testbed.get(MockBackend);
      service = testbed.get(UserService);
    }),
  );

  function setupConnections(mybackend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      // if (connection.request.url === '') {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);

      connection.mockRespond(response);
      // }
    });
  }

  it(
    'UserService should be created',
    inject([UserService], (myservice: UserService) => {
      expect(service).toBeTruthy();
    }),
  );

  it('should return user info from the server on successful getById API call', () => {
    spyOn(service, 'getById').and.returnValue(result);

    service.getById(1);
    expect(service.getById).toHaveBeenCalled();
    expect(result.username).toBe('test');
    expect(result.first_name).toBe('Test');
    expect(result.last_name).toBe('Tester');
    expect(result.email).toBe('test@testing.com');
  });

  it('should return userid on successful login', () => {
    spyOn(service, 'login').and.returnValue(result);

    service.login(result.username, result.password);
    expect(service.login).toHaveBeenCalled();
    expect(result.userid).toBe(1);
  });

  it('should return author info on successful getAuthor call', () => {
    spyOn(service, 'getAuthor').and.returnValue(result);

    service.getAuthor(1);
    expect(service.getAuthor).toHaveBeenCalled();
    expect(result.first_name).toBe('Test');
  });
});
