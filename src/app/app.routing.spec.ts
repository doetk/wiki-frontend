import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';

import * as r from '@angular/router';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';
import { Location } from '@angular/common';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/shared/about/about.component';
import { RevisionsComponent } from './components/revisions/revisions.component';
import { EditarticleComponent } from './components/editarticle/editarticle.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ArticleComponent } from './components/article/article.component';
import { AddArticleComponent } from './components/addarticle/addarticle.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import {
  HttpModule,
  BaseRequestOptions,
  Http,
  ConnectionBackend,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UserService } from './services/user/user.service';
import { PageService } from './services/page/page.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppModule, RouterTestingModule, HttpModule],
        providers: [
          BaseRequestOptions,
          MockBackend,

          { provide: 'userService', useClass: UserService },
          { provide: 'pageService', useClass: PageService },
          {
            provide: Http,
            useFactory: (
              backend: ConnectionBackend,
              defaultOptions: BaseRequestOptions,
            ) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions],
          },
        ],
      }).compileComponents();
    }),
  );

  it(
    'should navigate to "Home" immediately',
    fakeAsync(() => {
      createComponent();
      expect(location.path()).toEqual('/', 'after initialNavigation()');
      expectElementOf(HomeComponent);
    }),
  );

  //   it(
  //     'should navigate to "About" on click',
  //     fakeAsync(() => {
  //       createComponent();
  //       click(page.aboutLinkDe);
  //       // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom
  //       advance();
  //       expectPathToBe('/about');
  //       expectElementOf(AboutComponent);

  //       page.expectEvents([
  //         [r.NavigationStart, '/about'],
  //         [r.RoutesRecognized, '/about'],
  //         [r.NavigationEnd, '/about'],
  //       ]);
  //     }),
  //   );

  it(
    'should navigate to "About" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/about');
      // location.go('/about'); // also works ... except, perhaps, in Stackblitz
      advance();
      expectPathToBe('/about');
      expectElementOf(AboutComponent);
    }),
  );

  it(
    'should navigate to "Login" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/login');
      // location.go('/about'); // also works ... except, perhaps, in Stackblitz
      advance();
      expectPathToBe('/login');
      expectElementOf(LoginComponent);
    }),
  );
  it(
    'should navigate to "Logout" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/logout');
      // location.go('/about'); // also works ... except, perhaps, in Stackblitz
      advance();
      expectPathToBe('/logout');
      expectElementOf(LogoutComponent);
    }),
  );

  it(
    'should navigate to "Signup" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/signup');
      // location.go('/about'); // also works ... except, perhaps, in Stackblitz
      advance();
      expectPathToBe('/signup');
      expectElementOf(SignupComponent);
    }),
  );

  it(
    'should navigate to "Edit Profile" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/profile/edit/profile');
      // location.go('/about'); // also works ... except, perhaps, in Stackblitz
      advance();
      expectPathToBe('/profile/edit/profile');
      expectElementOf(EditProfileComponent);
    }),
  );
  it(
    'should navigate to "Edit Password" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/profile/edit/password');
      // location.go('/about'); // also works ... except, perhaps, in Stackblitz
      advance();
      expectPathToBe('/profile/edit/password');
      expectElementOf(EditPasswordComponent);
    }),
  );
  it(
    'should navigate to "an Article page" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/pages/great');
      // location.go('/about'); // also works ... except, perhaps, in Stackblitz
      advance();
      expectPathToBe('/pages/great');
      expectElementOf(ArticleComponent);
    }),
  );

  it(
    'should navigate to "Add Article" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/addarticle');
      advance();
      expectPathToBe('/addarticle');
      expectElementOf(AddArticleComponent);
    }),
  );

  it(
    'should navigate to "User Profile Page" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/profile/1');
      advance();
      expectPathToBe('/profile/1');
      expectElementOf(ProfileComponent);
    }),
  );

  it(
    'should navigate to "a Page Revision" w/ browser location URL change',
    fakeAsync(() => {
      createComponent();
      location.simulateHashChange('/pages/great/revisions/0');
      advance();
      expectPathToBe('/pages/great/revisions/0');
      expectElementOf(RevisionsComponent);
    }),
  );
  //   it(
  //     'should navigate to "Edit Article" w/ browser location URL change',
  //     fakeAsync(() => {
  //       createComponent();
  //       location.simulateHashChange('/pages/great/edit');
  //       tick(100);
  //       advance();
  //       expectPathToBe('/pages/great/edit');
  //       expectElementOf(EditarticleComponent);
  //     }),
  //   );
});

////// Helpers /////////

/** Wait a tick, then detect changes */
function advance(): void {
  tick();
  fixture.detectChanges();
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router);
  router.initialNavigation();
  //   spyOn(injector.get(PageService), 'getAll').and.returnValue(
  //     Promise.resolve('Test Quote'),
  //   ); // fakes it
  advance();

  page = new Page();
}

class Page {
  aboutLinkDe: DebugElement;
  homeLinkDe: DebugElement;
  articleLinkDe: DebugElement;
  recordedEvents: any[] = [];

  // for debugging
  comp: AppComponent;
  location: SpyLocation;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  expectEvents(pairs: any[]) {
    const events = this.recordedEvents;
    expect(events.length).toEqual(
      pairs.length,
      'actual/expected events length mismatch',
    );
    for (let i = 0; i < events.length; ++i) {
      expect((<any>events[i].constructor).name).toBe(
        pairs[i][0].name,
        'unexpected event name',
      );
      expect((<any>events[i]).url).toBe(pairs[i][1], 'unexpected event url');
    }
  }

  constructor() {
    router.events.subscribe(e => this.recordedEvents.push(e));
    const links = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref),
    );
    this.aboutLinkDe = links[2];
    this.homeLinkDe = links[0];
    this.articleLinkDe = links[1];

    // for debugging
    this.comp = comp;
    this.fixture = fixture;
    this.router = router;
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(
    path,
    expectationFailOutput || 'location.path()',
  );
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}
