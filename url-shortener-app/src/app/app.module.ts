import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UrlShortenerComponent } from './url-shortener/url-shortener.component';
import { UrlGenerateComponent } from './url-shortener/components/url-generate/url-generate.component';
import { UrlListComponent } from './url-shortener/components/url-list/url-list.component';
import { RedirectComponent } from './redirect/redirect.component';

import { UrlService } from './url-shortener/services/url.service';

@NgModule({
  declarations: [
    AppComponent,
    UrlShortenerComponent,
    UrlGenerateComponent,
    UrlListComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
