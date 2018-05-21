import { MaterialModule } from '../../../material/material.module';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { reducers, metaReducers } from '../../state/reducers';
import { AlertService } from '../../services/alert/alert.service';
import { AlertComponent } from './../alert/alert.component';
import { EditarticleComponent } from './editarticle.component';

describe('Components::EditArticleComponent', () => {
  let fixture: ComponentFixture<EditarticleComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MaterialModule,
          FroalaEditorModule.forRoot(),
          StoreModule.forRoot(reducers, { metaReducers }),
        ],
        declarations: [EditarticleComponent, AlertComponent],
        providers: [AlertService],
      }).compileComponents();
    }),
  );

  it(
    'should create the Edit Arcle Component',
    async(() => {
      fixture = TestBed.createComponent(EditarticleComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );

  it(
    'should render h3 tag content',
    async(() => {
      fixture = TestBed.createComponent(EditarticleComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h3').textContent).toContain(
        'Edit Article',
      );
    }),
  );
});
