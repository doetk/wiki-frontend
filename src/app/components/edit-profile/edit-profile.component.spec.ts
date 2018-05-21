import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../state/reducers';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';

import { By } from '@angular/platform-browser';
import {} from 'jasmine';
import { NgForm } from '@angular/forms/src/directives/ng_form';

import { reducers } from 'app/state/reducers';

class MockActivatedRoute {
  queryParams = new Subject<any>();
}

class MockUserService extends UserService {
  getById() {
    return Observable.of([]);
  }

  updateInfo() {
    return Observable.of([]);
  }
}

const testUser = {
  uid: '1',
  psw: '',
  first_name: 'first',
  last_name: 'last',
  email: 'email',
  username: 'username',
};

const mockFormSome = <NgForm>{
  value: {
    username: 'newUsername',
    first_name: '',
    last_name: 'newLast',
    email: '',
    password: 'test',
  },
};

const mockFormNone = <NgForm>{
  value: {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: 'test',
  },
};

const mockFormNoPass = <NgForm>{
  value: {
    username: 'newUsername',
    first_name: '',
    last_name: 'newLast',
    email: '',
    password: '',
  },
};

const mockFormWrongPass = <NgForm>{
  value: {
    username: 'newUsername',
    first_name: '',
    last_name: 'newLast',
    email: '',
    password: 'wrong',
  },
};

let routerStub;

describe('Components::EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

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
        declarations: [EditProfileComponent],
        providers: [{ provide: UserService, useClass: MockUserService }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'form placeholders should be populated with correct info',
    fakeAsync(() => {
      fixture.detectChanges();
      let el = fixture.debugElement.query(By.css('#username'));
      const uService = TestBed.get(UserService);

      const spy = spyOn(uService, 'getById').and.returnValue(
        Observable.of(testUser),
      );

      component.ngOnInit();

      fixture.detectChanges();

      expect(el.nativeElement.placeholder).toEqual('username');

      el = fixture.debugElement.query(By.css('#email'));
      expect(el.nativeElement.placeholder).toEqual('email');

      el = fixture.debugElement.query(By.css('#firstName'));
      expect(el.nativeElement.placeholder).toEqual('first');

      el = fixture.debugElement.query(By.css('#lastName'));
      expect(el.nativeElement.placeholder).toEqual('last');
    }),
  );

  it(
    'submit should only send changed values and redirect',
    fakeAsync(() => {
      const el = fixture.debugElement.query(By.css('#username'));
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updateInfo').and.returnValue(
        Observable.of(''),
      );
      const spyNavigate = spyOn((<any>component).router, 'navigate');

      component.onSubmit(mockFormSome);

      expect(spyService.calls.count()).toBeTruthy();
      expect(spyNavigate).toHaveBeenCalled();
    }),
  );

  it(
    'should not submit if no new data has been entered',
    fakeAsync(() => {
      const el = fixture.debugElement.query(By.css('#username'));
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updateInfo').and.returnValue(
        Observable.of(''),
      );

      component.onSubmit(mockFormNone);

      expect(spyService.calls.count()).toEqual(0);
    }),
  );

  it(
    'should not submit if no password has been entered',
    fakeAsync(() => {
      const el = fixture.debugElement.query(By.css('#username'));
      const uService = TestBed.get(UserService);

      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updateInfo').and.returnValue(
        Observable.of(''),
      );

      component.onSubmit(mockFormNoPass);

      expect(spyService.calls.count()).toEqual(0);
    }),
  );

  it(
    'UI should show warnings if password is incorrect',
    fakeAsync(() => {
      fixture.detectChanges();

      const uService = TestBed.get(UserService);
      const spyComponent = spyOn(component, 'onSubmit').and.callThrough();
      const spyService = spyOn(uService, 'updateInfo').and.returnValue(
        Observable.throw({ status: 401, message: 'Invalid credentials' }),
      );
      const spyNavigate = spyOn((<any>component).router, 'navigate');

      component.onSubmit(mockFormWrongPass);

      fixture.detectChanges();

      let el = fixture.debugElement.query(By.css('#warning'));
      expect(el.nativeElement).toBeTruthy();

      el = fixture.debugElement.query(By.css('#passInstruction'));
      expect(el.nativeElement.classList.contains('warn')).toBeTruthy();
    }),
  );
});
