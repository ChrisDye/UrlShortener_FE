import { Component, Output, EventEmitter, Input, OnDestroy } from "@angular/core";
import { url } from '../../models/url.model';
import { UrlService } from '../../services/url.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-url-edit',
    templateUrl: './url-edit.component.html'
}) export class UrlEditComponent implements OnDestroy {
    
    destroy$: Subject<boolean> = new Subject<boolean>();

    @Output() updateCallback: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() url: url = null;
    message: string = null;

    constructor(private urlService: UrlService) {}

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    close() {
        this.updateCallback.next(false);
    }

    update() {
        this.urlService.update(this.url).pipe(takeUntil(this.destroy$)).subscribe(url => {
            this.updateCallback.next(true);
        }, () => {
            this.message = "Could not update url."
        });
    }

}