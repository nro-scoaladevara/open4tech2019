import {Component, Input, EventEmitter, Output} from '@angular/core';
import {List} from '../shared/models/list.model';
import {ListService} from '../shared/list.service';

@Component({
  selector: 'o4t-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  @Input() list: List;
  @Output() updated = new EventEmitter<string>();

  constructor(private listService: ListService) {}

  onSubmit(): void {
    this.listService.saveList(this.list).subscribe(listId => {
      this.updated.emit(listId);
    });
  }

  cancel(): void {
    this.updated.emit(this.list.id);
  }
}
