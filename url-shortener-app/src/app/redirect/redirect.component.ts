import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UrlService } from '../url-shortener/services/url.service';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html'
}) export class RedirectComponent implements OnInit, OnDestroy {
    
    destroy$: Subject<boolean> = new Subject<boolean>();
    redirectMessage = null;

    constructor(
        private route: Router,
        private urlService: UrlService
    ) {}

    ngOnInit() {
        this.redirectMessage = "redirecting...";

        console.log(this.route.url);
        let shortened = this.route.url.substring(1);
        console.log(shortened);
        if (shortened !== null && shortened.trim() != '') {
            this.getUrl(shortened.trim());
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    getUrl(url: string) {
        this.urlService.getSingle(url).pipe(takeUntil(this.destroy$)).subscribe(url => {
            if (url != null && url.actualUrl !== null) {
                window.location.href = url.actualUrl;
            } else {
                this.redirectMessage = "Could not redirect user.";
            }
        }, () => {
            this.redirectMessage = "Could not redirect user.";
        });
    }
}