import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';
import { WatchComponent } from './watch/watch.component';
import { SearchComponent } from './search/search.component';
import { DownloadComponent } from './download/download.component';

import 'hammerjs';

// import service
import { GetTrendingService } from './video/service/get-trending.service';
import { GetVideoService } from './video/service/get-video.service';
import { GetSearchService } from './video/service/get-search.service';
import { BrowserXhr } from '@angular/http';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'watch/:videoId', component: WatchComponent },
  { path: 'download/:videoId', component: DownloadComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TimeAgoPipe,
    PageNotFoundComponent,
    HomeComponent,
    PrimaryNavComponent,
    WatchComponent,
    SearchComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
  	GetTrendingService,
    GetVideoService,
    GetSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
