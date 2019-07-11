import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListHomeComponent} from './list/home/list-home.component';
import {ListDetailsComponent} from './list/list-details/list-details.component';
import {ListItemHomeComponent} from './list-item/home/list-item-home.component';

const routes: Routes = [
    {
        path: '',
        component: ListHomeComponent
    },
    {
        path: 'lists/:id',
        component: ListDetailsComponent,
        pathMatch: 'full'
    },
    {
        path: 'lists/:id/edit',
        component: ListHomeComponent
    },
    {
        path: 'lists/:listId/items/new',
        component: ListItemHomeComponent
    },
    {
        path: 'lists/:listId/items/:itemId',
        component: ListItemHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
