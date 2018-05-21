import { PageService } from './../../services/page/page.service';
// import { Store } from '@ngrx/store';
// import { IPage } from './../interfaces/page.interface';
// import { IPages } from './../interfaces/pages.interface';
// import { TestBed } from '@angular/core/testing';
// import { Actions } from '@ngrx/effects';
// import { cold, hot } from 'jasmine-marbles';
// import { PagesEffects } from './pages.effect';
// import { PayloadAction } from '../interfaces/payloadaction.interface';
// import { Observable } from 'rxjs/Observable';
// import { empty } from 'rxjs/observable/empty';
// import * as Pages from '../actions/pages.action';
// import { HttpModule } from '@angular/http';

// export class TestActions extends Actions {
//   constructor() {
//     super(empty());
//   }

//   set stream(source: Observable<any>) {
//     this.source = source;
//   }
// }
// export function getActions() {
//   return new TestActions();
// }

// describe('PagesEffects', () => {
//   let store: any;
//   let effects: PagesEffects;
//   let actions$: TestActions;
//   let pageService: PageService;

//   const page1 = {
//     title: 'Great',
//     route: 'GREAT',
//     description: 'This article is great!',
//   };
//   const page2 = {
//     title: 'Awesome',
//     route: 'AWESOME',
//     description: 'This article is awesome!',
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       providers: [
//         PagesEffects,
//         {
//           provide: Store,
//           useValue: {
//             // open: jest.fn(),
//             query: jest.fn(),
//             // insert: jest.fn(),
//             // executeWrite: jest.fn(),
//           },
//         },
//         { provide: Actions, useFactory: getActions },
//       ],
//     });

//     store = TestBed.get(Store);
//     effects = TestBed.get(PagesEffects);
//     actions$ = TestBed.get(Actions);
//     pageService = TestBed.get(PageService);
//   });
//   describe('reqPages$', () => {
//     it('should return pages Completed, with the pages, on success', () => {
//       const action = Pages.reqPages();
//       const update = Pages.updatePagesDetails;
//       const completion = Pages.pagesCompleted;

//       actions$.stream = hot('-a', { a: action });
//       const response = cold('-a-b|', { a: page1, b: page2 });
//       const expected = cold('-----c', { c: completion });
//       store.query = jest.fn(() => response);

//       expect(effects.reqPages$).toBeObservable(expected);
//     });
//   });
// });

import { TestBed } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata, Actions } from '@ngrx/effects';
import { PagesEffects } from './pages.effect';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpModule } from '@angular/http';
import { UserService } from '../../services/user/user.service';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }
  set stream(source: Observable<any>) {
    this.source = source;
  }
}
export function getActions() {
  return new TestActions();
}

describe('Effects::Page Effects Decoration Tests', () => {
  let effects: PagesEffects;
  let metadata: EffectsMetadata<PagesEffects>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PagesEffects,
        PageService,
        UserService,
        { provide: Actions, useFactory: getActions },
      ],
    });
    effects = TestBed.get(PagesEffects);
    metadata = getEffectsMetadata(effects);
  });

  it('should register reqPages$ that dispatches an action', () => {
    expect(metadata.reqPages$).toEqual({ dispatch: true });
  });
});
