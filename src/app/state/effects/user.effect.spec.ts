import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata, Actions } from '@ngrx/effects';
import { UserEffects } from './user.effect';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';

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

describe('Effects::User Effects Decoration Tests', () => {
  let effects: UserEffects;
  let metadata: EffectsMetadata<UserEffects>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      providers: [
        UserEffects,
        UserService,
        AlertService,
        { provide: Actions, useFactory: getActions },
      ],
    });
    effects = TestBed.get(UserEffects);
    metadata = getEffectsMetadata(effects);
  });

  it('should register login$ that dispatches an action', () => {
    expect(metadata.login$).toEqual({ dispatch: true });
  });

  it('should register loginComplete$ that does not dispatch', () => {
    expect(metadata.loginComplete$).toEqual({ dispatch: false });
  });

  it('should register logout$ that dispatches an action', () => {
    expect(metadata.logout$).toEqual({ dispatch: true });
  });

  it('should register logoutComplete$ that does not dispatch', () => {
    expect(metadata.logoutComplete$).toEqual({ dispatch: false });
  });

  it('should register signup$ that dispatches an action', () => {
    expect(metadata.signup$).toEqual({ dispatch: true });
  });

  it('should register signupComplete$ that does not dispatch', () => {
    expect(metadata.signupComplete$).toEqual({ dispatch: false });
  });
});
