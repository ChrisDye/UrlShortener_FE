import { Component, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { UrlService } from '../../services/url.service';
import { Subject } from 'rxjs';
import { paginated } from '../../models/paginated.model';
import { url } from '../../models/url.model';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-url-list',
    templateUrl: './url-list.component.html'
}) export class UrlListComponent implements OnDestroy {

    destroy$: Subject<boolean> = new Subject<boolean>();

    @Output() rebindCallback: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() previousCallback: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() nextCallback: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() urls: paginated<url> = null;
    message: string = null;
    appUrl: string = environment.appUrl;

    constructor(
        private urlService: UrlService
    ) {}

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    updateUrl(url: url) {

    }

    deleteUrl(id: number) {
        this.urlService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.message = "Url deleted";
            this.rebindCallback.next(true);
        }, () => {
            this.message = "Could not delete url";
        });
    }
}