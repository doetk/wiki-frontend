import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import {} from 'jasmine';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Location } from '@angular/common';

import { MaterialModule } from '../../../material/material.module';
import * as fromRoot from '../../state/reducers';
import { UserService } from '../../services/user/user.service';
import { EditPasswordComponent } from './edit-password.component';

class MockActivatedRoute {
  queryParams = new Subject<any>();
}

class MockUserService extends UserService {
  updatePassword() {
    return Observable.of([]);
  }
}

const mockFormOldPassMissing = <NgForm>{
  value: {
    oldPassword: '',
    newPassword: 'newPass',
    confirmPassword: 'newPass',
  },
};

const mockFormOldPassIncorrect = <NgForm>{
  value: {
    oldPassword: 'wrong',
    newPassword: 'newPass',
    confirmPassword: 'newPass',
  },
};

const mockFormNewPassMissing = <NgForm>{
  value: {
    oldPassword: 'oldPass',
    newPassword: '',
    confirmPassword: '',
  },
};

const mockFormNotMatching = <NgForm>{
  value: {
    oldPassword: 'oldPass',
    newPassword: 'newPass',
    confirmPassword: 'notMatching',
  },
};

const mockFormValid = <NgForm>{
  value: {
    oldPassword: 'oldPass',
    newPassword: 'newPass',
    confirmPassword: 'newPass',
  },
};

let routerStub;

describe('Components::EditPasswordComponent', () => {
  let component: EditPasswordComponent;
  let fixture: ComponentFixture<EditPasswordComponent>;

  beforeEach(
    async(() => {
      routerStub = {
        navigate: jasmine.createSpy('navigate'),
      };
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
        declarations: [EditPasswordComponent],
        providers: [{ provide: UserService, useClass: MockUserService }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPasswordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
  });

  it('should create edit-password component', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should display error message when old password is missing',
    fakeAsync(() => {
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updatePassword').and.callThrough();

      component.onSubmit(mockFormOldPassMissing);

      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('#oldPassMissing'));
      expect(el).toBeTruthy();
    }),
  );

  it(
    'should display error message when old password is incorrect',
    fakeAsync(() => {
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updatePassword').and.returnValue(
        Observable.throw('error'),
      );

      component.onSubmit(mockFormOldPassIncorrect);

      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('#wrongPass'));
      expect(el).toBeTruthy();
    }),
  );

  it(
    'should display error message when new password is missing',
    fakeAsync(() => {
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updatePassword').and.callThrough();

      component.onSubmit(mockFormNewPassMissing);

      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('#newPassMissing'));
      expect(el).toBeTruthy();
    }),
  );

  it(
    'should display error message when passwords do not match',
    fakeAsync(() => {
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updatePassword').and.callThrough();

      component.onSubmit(mockFormNotMatching);

      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('#passNotMatch'));
      expect(el).toBeTruthy();
    }),
  );

  it(
    'should redirect on successful submission',
    fakeAsync(() => {
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updatePassword').and.returnValue(
        Observable.of('success'),
      );
      const spyNavigate = spyOn((<any>component).router, 'navigate');

      const spyLocation = spyOn(TestBed.get(Location), 'back').and.returnValue(
        '',
      );

      component.onSubmit(mockFormValid);

      expect(spyLocation).toHaveBeenCalled();
    }),
  );
});
