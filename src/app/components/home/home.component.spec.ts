import { MaterialModule } from '../../../material/material.module';
import { RouterModule } from '@angular/router';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { Store, StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';

import { reducers, metaReducers } from '../../state/reducers';

import { UserService } from '../../services/user/user.service';
import { HomeComponent } from './home.component';

describe('Components::HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterModule,
          MaterialModule,
          HttpModule,
          FroalaEditorModule.forRoot(),
          FroalaViewModule.forRoot(),
          StoreModule.forRoot(reducers, { metaReducers }),
        ],
        declarations: [HomeComponent],
        providers: [UserService],
      }).compileComponents();
    }),
  );

  it(
    'should create the app',
    async(() => {
      fixture = TestBed.createComponent(HomeComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );

  it(
    `should have as title 'WiKi'`,
    async(() => {
      fixture = TestBed.createComponent(HomeComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('WiKi');
    }),
  );

  it(
    'should render title in a h1 tag',
    async(() => {
      fixture = TestBed.createComponent(HomeComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain(
        'Welcome to the WiKi App',
      );
    }),
  );
});
