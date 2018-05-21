import { SearchService } from './services/search/search.service';
import { AlertComponent } from './components/alert/alert.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { RevisionsComponent } from './components/revisions/revisions.component';
import { AddArticleComponent } from './components/addarticle/addarticle.component';
import { ArticleComponent } from './components/article/article.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutComponent } from './components/shared/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from 'material/material.module';
import { HttpModule } from '@angular/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditarticleComponent } from './components/editarticle/editarticle.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Components::AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          BrowserAnimationsModule,
          RouterTestingModule,
          MaterialModule,
          HttpModule,
          FroalaEditorModule.forRoot(),
          FroalaViewModule.forRoot(),
          StoreModule.forRoot(reducers, { metaReducers }),
        ],
        declarations: [
          AppComponent,
          FooterComponent,
          NavbarComponent,
          HomeComponent,
          AboutComponent,
          LoginComponent,
          SignupComponent,
          LogoutComponent,
          EditProfileComponent,
          ProfileComponent,
          EditarticleComponent,
          ArticleComponent,
          EditPasswordComponent,
          AddArticleComponent,
          RevisionsComponent,
          PageNotFoundComponent,
          AlertComponent,
        ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [SearchService],
      }).compileComponents();
    }),
  );
  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app).toBeDefined();
  });
});
