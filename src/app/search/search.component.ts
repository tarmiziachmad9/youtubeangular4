import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Location, DecimalPipe } from '@angular/common';
import { GetSearchService } from '../video/service/get-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchInput: string;
  loader: boolean = false;
  spinner: boolean = false; 
  
  searchQuery = [];
  StatisticsVideo = [];
  Errors: string;

  constructor(private http: Http, private router: Router, private location: Location, private getSearch: GetSearchService) { }

  getQuery() {
  	this.spinner = true;
  	this.loader = true;
    this.getSearch.getSearchVideo(this.searchInput).subscribe(
      data =>  { this.searchQuery = data;
        for(let vDetails of this.searchQuery) {
          // Get Channel
            this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id='+vDetails.id.videoId+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
              .map((res: Response) => res.json().items)
                .subscribe(data => this.StatisticsVideo = this.StatisticsVideo.concat(data));
        }
      },
      err => { this.Errors = 'Oops cannot retrive data!!', this.spinner = false, this.loader = false},
      () => { this.spinner = false, this.loader = false }
    );
  }

  back() {
    this.location.back(); 
  }

  ngOnInit() { }

}

