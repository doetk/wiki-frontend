import {
  HttpModule,
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { PageService } from './page.service';

describe('Services: PageService', () => {
  let service: PageService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PageService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (myBackend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });

    // Get the MockBackend
    backend = TestBed.get(MockBackend);
    // Returns a service with the MockBackend so we can test with dummy responses
    service = TestBed.get(PageService);
  });

  it(
    'PageService should be created',
    inject([PageService], (myservice: PageService) => {
      expect(service).toBeTruthy();
    }),
  );

  it(
    'should return all articles when getAll() is called',
    fakeAsync(() => {
      const response = [
        {
          title: 'Great',
          route: 'GREAT',
          description: 'This article is great!',
        },
        {
          title: 'HangOver',
          route: 'HANGOVER',
          description:
            'A hangover is a group of unpleasant signs and symptoms that can develop after drinking too much alcohol',
        },
      ];

      // When the request subscribes for results on a connection, return a fake response
      backend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(<ResponseOptions>{
            body: JSON.stringify(response),
          }),
        );
      });

      // Perform a request and make sure we get the response we expect
      service.getAll();
      tick();
      expect(response[0].title).toBe('Great');
      expect(response[0].route).toBe('GREAT');
      expect(response[0].description).toBe('This article is great!');
      //   expect(response[1].title).toBe('Great');
      expect(response[1].route).toBe('HANGOVER');
      expect(response.length).toEqual(2);
    }),
  );

  it(
    'should return info for one article when getById(id) is called',
    fakeAsync(() => {
      const response = [
        {
          pageid: 'GREAT',
          revisionid: 4,
          title: 'Great',
          modified: '2018-01-18T19:46:28.864Z',
          author: 1,
          pagedata: 'This article is great!',
          revisions: {
            route: [
              {
                RevisionID: 0,
                route: '/api/v1/pages/GREAT/revisions/0',
              },
              {
                RevisionID: 1,
                route: '/api/v1/pages/GREAT/revisions/1',
              },
              {
                RevisionID: 2,
                route: '/api/v1/pages/GREAT/revisions/2',
              },
              {
                RevisionID: 3,
                route: '/api/v1/pages/GREAT/revisions/3',
              },
            ],
          },
        },
      ];

      // When the request subscribes for results on a connection, return a fake response
      backend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(<ResponseOptions>{
            body: JSON.stringify(response),
          }),
        );
      });

      // Perform a request and make sure we get the response we expect
      service.getById('Great');
      tick();
      expect(response[0].title).toBe('Great');
      expect(response[0].revisionid).toBe(4);
      expect(response[0].pagedata).toBe('This article is great!');
      //   expect(response[1].title).toBe('Great');
      expect(response[0].revisions.route.length).toEqual(4);
      expect(response.length).toEqual(1);
    }),
  );

  it(
    'should return info for one article when getById(id) is called',
    fakeAsync(() => {
      const response = [
        {
          pageid: 'GREAT',
          revisionid: 4,
          title: 'Great',
          modified: '2018-01-18T19:46:28.864Z',
          author: 1,
          pagedata: 'This article is great!',
        },
      ];

      // When the request subscribes for results on a connection, return a fake response
      backend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(<ResponseOptions>{
            body: JSON.stringify(response),
          }),
        );
      });

      // Perform a request and make sure we get the response we expect
      service.getCurrent('Great');
      tick();
      expect(response[0].title).toBe('Great');
      expect(response[0].revisionid).toBe(4);
      expect(response[0].pagedata).toBe('This article is great!');
      //   expect(response[1].title).toBe('Great');
      expect(response.length).toEqual(1);
    }),
  );
});
