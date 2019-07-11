import {Component, OnInit} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'o4t-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public showHomePage$: Observable<boolean>;
    private showHomePageSource$ = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.showHomePage$ = this.showHomePageSource$.asObservable();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const showHomeButton = event.url.length > 1;
                this.showHomePageSource$.next(showHomeButton);
            }
        });
    }

    public goHome(): void {
        this.router.navigateByUrl('/');
    }
}
