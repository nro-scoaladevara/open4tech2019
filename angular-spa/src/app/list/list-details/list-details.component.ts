import {Component, OnInit} from '@angular/core';
import {List} from 'src/app/shared/models/list.model';
import {ActivatedRoute} from '@angular/router';
import {ListService} from 'src/app/shared/list.service';
import {ListItem} from 'src/app/shared/models/list-item.model';

@Component({
    templateUrl: './list-details.component.html'
})
export class ListDetailsComponent implements OnInit {
    public list: List;

    constructor(
        private route: ActivatedRoute,
        private listService: ListService,
    ) {}

    public ngOnInit(): void {
        this.listService.getList(this.route.snapshot.paramMap.get('id')).subscribe({
            next: list => this.list = list
        });
    }

    delete(): void {
        this.listService.deleteListWithConfirmation(this.list);
    }

    deleteListItem(item: ListItem) {
        this.listService.deleteListItemWithConfirmation(item).subscribe({
            next: _ => {
                const itemIndex = this.list.items.indexOf(item);
                this.list.items.splice(itemIndex, 1);
            }
        });
    }
}
