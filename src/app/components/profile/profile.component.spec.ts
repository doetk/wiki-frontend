import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../state/reducers';

import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/from';

import { By } from '@angular/platform-browser';

// import { reducers } from 'app/state/reducers';

import {} from 'jasmine';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Location } from '@angular/common';

class MockActivatedRoute {
  queryParams = new Subject<any>();
}

class MockUserService extends UserService {
  updatePassword() {
    return Observable.of([]);
  }
}

class MockBackend {
  user: {};
}

describe('Components::ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          FormsModule,
          RouterTestingModule.withRoutes([]),
          HttpModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
          }),
          BrowserAnimationsModule,
        ],
        declarations: [ProfileComponent],
        providers: [
          { provide: UserService, useClass: MockUserService },
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: Observable.of([{ id: 1 }]),
            },
          },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
