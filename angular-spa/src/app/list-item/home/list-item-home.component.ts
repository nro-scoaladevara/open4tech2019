import {Component, OnInit} from '@angular/core';
import {ListItem} from 'src/app/shared/models/list-item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from 'src/app/shared/list.service';

@Component({
    template: '<o4t-list-item *ngIf="listItem" [item]="listItem" [listId]="listId" (updated)="navigateToList($event)"></o4t-list-item>'
})
export class ListItemHomeComponent implements OnInit {
    public listId: string;
    public listItem: ListItem;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private listService: ListService
    ) {}

    public ngOnInit(): void {
        this.listId = this.route.snapshot.paramMap.get('listId');
        this.listService.getCurrentListItem(this.route.snapshot.paramMap.get('itemId')).subscribe({
            next: li => this.listItem = li
        });
    }

    navigateToList(listId: string) {
        this.router.navigate(['lists', listId]);
    }
}
