import {Component, OnInit} from '@angular/core';
import {List} from 'src/app/shared/models/list.model';
import {Router, ActivatedRoute} from '@angular/router';
import {ListService} from 'src/app/shared/list.service';

@Component({
    templateUrl: './list-home.component.html'
})
export class ListHomeComponent implements OnInit {
    public list: List;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private listService: ListService
    ) {}

    public ngOnInit(): void {
        this.listService.getCurrentList(this.route.snapshot.paramMap.get('id')).subscribe({
            next: list => this.list = list
        });
    }

    public navigateToList(listId: string): void {
        this.router.navigate(['lists', listId]);
    }
}
