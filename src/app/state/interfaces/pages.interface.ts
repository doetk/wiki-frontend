import { IPage } from './page.interface';

export interface IPages {
  pages: IPage[];
  getPagesInProgress: boolean;
  getPagesFailed: boolean;
  authorId: number;
  pageIndex: number;
  getAuthorsInProgress: boolean;
  getAuthorsCompleted: boolean;
}
