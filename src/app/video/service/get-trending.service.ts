import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GetTrendingService {

  constructor(private http: Http) { }	

  private TrendingList:string = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ID&maxResults=10&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM';
  private TrendingListCount:string = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&chart=mostPopular&regionCode=ID&maxResults=25&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM';
  // private TrendingUrl:string = '../../assets/yt.json';
  
  getTrendingList() {
  		return this.http.get(this.TrendingList).map((res: Response) => res.json().items);
  }

  getTrendingListCount() {
  		return this.http.get(this.TrendingListCount).map((res: Response) => res.json().items);
  }

  // getTrendingListChannel() {
  //     return this.http.get(this.TrendingListChannel).map((res: Response) => res.json().items)
  // }
  

}
