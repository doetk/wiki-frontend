import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { AlertComponent } from './../alert/alert.component';
import { metaReducers, reducers } from '../../state/reducers';
import { MaterialModule } from 'material/material.module';
import { ControlContainer } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reqLogin } from '../../state/actions/user.action';
import { IStore } from '../../state/interfaces/store.interface';
import { User } from '../../models/user';

describe('Components::LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let instance: LoginComponent;
  const user: User = new User();
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MaterialModule,
          ReactiveFormsModule,
          StoreModule.forRoot(reducers, { metaReducers }),
        ],
        declarations: [LoginComponent, AlertComponent],
        providers: [AlertService],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    instance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Login Component', () => {
    expect(fixture).toBeTruthy();
    expect(fixture).toBeDefined();
  });

  it('Valid password and email fields test', () => {
    const username = new FormControl('test', [Validators.required]);
    const psw = new FormControl('12345', [Validators.required]);

    expect(username.errors).toBeNull();

    expect(psw.valid).toBeTruthy();
    expect(username.invalid).toBeFalsy();
    expect(username.status).toBe('VALID');
  });

  it('Invalid password and email fields test', () => {
    const username = new FormControl('', [Validators.required]);
    const psw = new FormControl('', [Validators.required]);

    expect(username.errors).toBeTruthy();
    const errors = instance.getPaswordErrorMessage();

    expect(errors).toBeTruthy();
    expect(errors).toEqual('Password is Required!');
    expect(psw.valid).toBeFalsy();
    expect(username.invalid).toBeTruthy();
    expect(username.status).toBe('INVALID');
  });
});
