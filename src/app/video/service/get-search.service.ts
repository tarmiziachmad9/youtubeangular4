import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class GetSearchService {

  private SearchVideo: string;

  constructor(private http: Http) { }

  getSearchVideo(query: string): Observable<any>{
  	this.SearchVideo = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + query + '&maxResults=10&type=video&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM';
  		return this.http.get(this.SearchVideo).map(res => res.json().items);
  }

}
