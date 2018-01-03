import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Injectable()
export class GetVideoService {

  private videoId: string; //params id
  private Details: string;
  private Related: string;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) { 

    this.route.firstChild.params.subscribe( params => { 
        this.videoId = params.videoId;
        this.Details = 'https://www.googleapis.com/youtube/v3/videos?part=id,snippet,statistics&id='+this.videoId+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM';
        this.Related = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=20&relatedToVideoId='+this.videoId+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM';
        // console.log(route.firstChild.params) 
    }); 

  }
  
  getVideo() {
  		return this.http.get(this.Details).map((res: Response) => res.json().items);
  }

  getRelated() {
      return this.http.get(this.Related).map((res: Response) => res.json().items);
  }


}
