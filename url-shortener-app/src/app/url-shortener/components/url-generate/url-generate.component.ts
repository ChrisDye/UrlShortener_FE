import { Component, OnDestroy, Output, EventEmitter } from "@angular/core";
import { url, urlCreate } from '../../models/url.model';
import { UrlService } from '../../services/url.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-url-generate',
    templateUrl: './url-generate.component.html'
}) export class UrlGenerateComponent implements OnDestroy {

    destroy$: Subject<boolean> = new Subject<boolean>();

    enteredUrl: string = "";
    message: string = null;

    appUrl: string = environment.appUrl;
    urlResult: url = null;

    @Output() completeCallback: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    constructor(
        private urlService: UrlService
    ) {}

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    generate() {
        this.message = null;
        this.urlResult = null;
        if (this.enteredUrl !== null || this.enteredUrl !== "") {
            let createUrl: urlCreate = {
                actualUrl: this.enteredUrl
            };
            this.urlService.add(createUrl).pipe(takeUntil(this.destroy$)).subscribe(url => {
                if (url !== null) {
                    this.urlResult = url;
                    this.completeCallback.next(true);
                } else {
                    this.message = "Could not add url."
                }
            }, () => {
                this.message = "Could not add url."
            });
        } else {
            this.message = "Url does not look to be valid."
        }
    }

}