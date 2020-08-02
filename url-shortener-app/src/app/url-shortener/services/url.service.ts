import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { url, urlCreate } from '../models/url.model';
import { Observable } from 'rxjs';
import { paginated } from '../models/paginated.model';

@Injectable()
export class UrlService {
    private endpoint: string = environment.apiEndpoint;

    constructor(
        private http: HttpClient
    ) {}

    getAll(page: number = 1, pageSize: number = 25): Observable<paginated<url>> {
        return this.http.get<paginated<url>>(this.endpoint + "?page=" + page + "&pageSize=" + pageSize);
    }

    getSingle(shortened: string): Observable<url> {
        return this.http.get<url>(this.endpoint + "/" + shortened);
    }

    add(url: urlCreate): Observable<url> {
        return this.http.post<url>(this.endpoint, url);
    }

    update(url: url): Observable<url> {
        return this.http.put<url>(this.endpoint, url);
    }

    delete(id: number) {
        return this.http.delete(this.endpoint + "/" + id);
    }
}