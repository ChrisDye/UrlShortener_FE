import { Component, OnDestroy, OnInit } from "@angular/core";
import { UrlService } from './services/url.service';
import { Subject } from 'rxjs';
import { paginated } from './models/paginated.model';
import { url } from './models/url.model';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-url-shortener',
    templateUrl: 'url-shortener.component.html'
}) export class UrlShortenerComponent implements OnInit, OnDestroy {
    
    destroy$: Subject<boolean> = new Subject<boolean>();

    urls: paginated<url> = null;

    page: number = 1;
    pageSize: number = 10;

    constructor(
        private urlService: UrlService
    ) {}

    ngOnInit() {
        this.rebindList();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    rebindList() {
        this.urlService.getAll(this.page, this.pageSize).pipe(takeUntil(this.destroy$)).subscribe(urls => {
            this.urls = urls;
        }, () => {

        });
    }

    nextPage() {
        this.page = this.page + 1;
        this.rebindList();
    }

    prevPage() {
        this.page = this.page - 1;
        this.rebindList();
    }
    
}