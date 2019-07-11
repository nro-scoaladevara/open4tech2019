import {Injectable} from '@angular/core';
import {List} from './models/list.model';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {config} from '.';
import {HttpClient} from '@angular/common/http';
import {map, tap, filter, switchMap} from 'rxjs/operators';
import {ConfirmationDialogData} from './confirmation-dialog/dialog-data.model';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ListItem} from './models/list-item.model';

@Injectable()
export class ListService {
  private lists: List[];
  private latestList$ = new BehaviorSubject<List>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  getCurrentList(listId: string): Observable<List> {
    if (listId) {
      return this.getList(listId);
    }
    return of(new List());
  }

  getCurrentListItem(itemId: string): Observable<ListItem> {
    if (itemId) {
      return this.getItem(itemId);
    }
    return of(new ListItem());
  }

  getAllLists(): Observable<List[]> {
    if (this.lists && this.lists.length > 0) {
      return of(this.lists);
    }
    return this.httpClient.get<List[]>(`${config.apiBaseUrl}/lists`).pipe(
      tap(lists => {
        this.lists = lists;
      })
    );
  }

  getLatestList(): Observable<List> {
    if (!this.lists) {
      this.getAllLists().subscribe(_ => {
        this.fillLatestList();
      });
    }
    this.fillLatestList();
    return this.latestList$.asObservable();
  }

  getList(listId: string): Observable<List> {
    return this.httpClient.get<List>(`${config.apiBaseUrl}/lists/${listId}`);
  }

  getItem(itemId: string): Observable<ListItem> {
    return this.httpClient.get<ListItem>(`${config.apiBaseUrl}/items/${itemId}`);
  }

  deleteListById(listId: string): Observable<any> {
    this.lists = null;
    return this.httpClient.delete(`${config.apiBaseUrl}/lists/${listId}`);
  }

  deleteListItemById(itemId: string): Observable<any> {
    return this.httpClient.delete(`${config.apiBaseUrl}/items/${itemId}`);
  }

  private fillLatestList(): void {
    if (!this.lists || this.lists.length === 0) {
      return;
    }
    this.latestList$.next(this.lists[this.lists.length - 1]);
  }

  saveList(list: List): Observable<string> {
    if (list.id) {
      return this.updateList(list);
    }
    return this.createNewList(list);
  }

  private createNewList(list: List): Observable<string> {
    return this.httpClient.post<List>(`${config.apiBaseUrl}/lists`, list).pipe(
      map(newList => newList.id)
    );
  }

  private updateList(list: List): Observable<string> {
    return this.httpClient.put<List>(`${config.apiBaseUrl}/lists/${list.id}`, list).pipe(
      map(newList => newList.id)
    );
  }

  saveListItem(item: ListItem): Observable<string> {
    if (item.id) {
      return this.updateListItem(item);
    }
    return this.createNewListItem(item.list, item);
  }

  private updateListItem(item: ListItem): Observable<string> {
    return this.httpClient.put<ListItem>(`${config.apiBaseUrl}/items/${item.id}`, item).pipe(
      map(li => li.list)
    );
  }

  private createNewListItem(listId: string, item: ListItem): Observable<string> {
    return this.httpClient.post<ListItem>(`${config.apiBaseUrl}/lists/${listId}/items`, item)
      .pipe(
        map(li => li.list)
      );
  }

  public deleteListWithConfirmation(list: List): void {
    const data: ConfirmationDialogData = {
      message: `Are you sure you want to delete the '${list.name}' list?`,
      title: 'Please confirm',
      positiveActionText: 'Delete',
      positiveActionColor: 'warn',
      negativeActionText: 'Cancel'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data});
    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      switchMap(_ => this.deleteListById(list.id))
    ).subscribe({
      next: _ => {
        this.navigateHome();
      },
      error: e => console.log(e),
    });
  }

  public deleteListItemWithConfirmation(listItem: ListItem): Observable<any> {
    const data: ConfirmationDialogData = {
      message: `Are you sure you want to delete the '${listItem.description}' list item?`,
      title: 'Please confirm',
      positiveActionText: 'Delete',
      negativeActionText: 'Cancel',
      negativeActionColor: 'warn',
      positiveActionColor: 'primary'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data});
    return dialogRef.afterClosed().pipe(
      filter(result => !!result),
      switchMap(_ => this.deleteListItemById(listItem.id))
    );
  }

  private navigateHome(): void {
    this.router.navigateByUrl('/');
  }
}
