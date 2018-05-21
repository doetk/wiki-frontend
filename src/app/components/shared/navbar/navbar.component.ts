import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IStore } from '../../../state/interfaces/store.interface';
import { IPage } from '../../../state/interfaces/page.interface';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { SearchService } from '../../../services/search/search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  firstName$: Observable<string>;
  loggedIn$: Observable<boolean>;
  userid$: Observable<number>;
  items = new Array<any>();
  search: string;

  subject: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>([]);

  constructor(
    private store: Store<IStore>,
    private router: Router,
    private _searchService: SearchService,
  ) {
    this.loggedIn$ = this.store.select(s => s.userReducer.loggedIn);
    this.firstName$ = this.store.select(s => s.userReducer.first_name);
    this.userid$ = this.store.select(s => s.userReducer.userid);

    this.store.select(s => s.pagesReducer.pages).subscribe((pages: IPage[]) => {
      this.items = Array.from(pages);
      this.items.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    });
  }

  changePage(event) {
    console.log(event);
    // filters special characters and removes white space for proper redirect
    const pageToNavigate = event
      .toString()
      .replace(/[^\w()-]/gi, '')
      .toUpperCase();
    // clears search suggestions
    this.subject.next([]);

    this.router.navigate(['/pages/' + pageToNavigate]);
  }

  sendQuery($event, query: string): any {
    /** do not perform search when special keys are pressed */
    if (
      $event.key === 'ArrowDown' ||
      $event.key === 'ArrowUp' ||
      $event.key === 'Enter'
    ) {
      return;
    }

    const queryResults = [];
    this._searchService.sendQuery(query).subscribe(res => {
      // console.log(res);
      res.hits.forEach(e => queryResults.push(e._source));
      this.subject.next(queryResults);
    });
  }
}
