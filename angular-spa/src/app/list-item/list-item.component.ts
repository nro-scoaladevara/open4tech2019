import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ListItem} from '../shared/models/list-item.model';
import {ListService} from '../shared/list.service';

@Component({
    selector: 'o4t-list-item',
    templateUrl: './list-item.component.html',
})
export class ListItemComponent {
    @Input() item: ListItem;
    @Input() listId: string;
    @Output() updated = new EventEmitter<string>();

    constructor(private listService: ListService) {}

    public onSubmit(): void {
        this.listService.saveListItem({...this.item, list: this.listId}).subscribe({
            next: listId => this.updated.emit(listId)
        });
    }

    public cancel(): void {
        this.updated.emit(this.listId);
    }

}
