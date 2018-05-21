import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { reducers, metaReducers } from '../../state/reducers';
import { AlertService } from '../../services/alert/alert.service';
import { AlertComponent } from './../alert/alert.component';
import { AddArticleComponent } from './addarticle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Components::AddArticleComponent', () => {
  let fixture: ComponentFixture<AddArticleComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          FormsModule,
          RouterTestingModule,
          MaterialModule,
          StoreModule.forRoot(reducers, { metaReducers }),
        ],
        declarations: [AddArticleComponent, AlertComponent],
        providers: [AlertService],
      }).compileComponents();
    }),
  );

  it(
    'should create Add Article Component',
    async(() => {
      fixture = TestBed.createComponent(AddArticleComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );

  it(
    'should render i tag content',
    async(() => {
      fixture = TestBed.createComponent(AddArticleComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('i').textContent).toContain('book');
      expect(compiled.querySelector('button').textContent).toContain('Create');
    }),
  );
});
