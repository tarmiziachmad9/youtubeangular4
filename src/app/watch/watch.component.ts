import { Component, OnInit} from '@angular/core';
// import { GetVideoService } from '../video/service/get-video.service';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  loader: boolean = true;
  spinner: boolean = true;

  Details: string;
  Related: string;
  videoId: string; //params id
  safeUrl: SafeResourceUrl; // set safety to embed video
  VideoDetails: any;
  Channel = [];
  ChannelVideo = [];
  RelatedVideo = [];
  RelatedChannel = [];
  RelatedChannelThumb = [];
  Statistics = [];
  StatisticsVideo = [];
  Errors: string;

  constructor(private http: Http, private route: ActivatedRoute, private domSanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.videoId = params.videoId; 
      this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.videoId+'?autoplay=1');

      this.Details = 'https://www.googleapis.com/youtube/v3/videos?part=id,snippet,statistics&id='+this.videoId+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM';
      this.Related = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=10&relatedToVideoId='+this.videoId+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM';
      
      // Get Video Details
      this.getVideo().subscribe(
          data => { this.VideoDetails = data ;
            for(let vDetails of this.VideoDetails) {
              // Get Channel
              this.Channel = vDetails.snippet.channelId;
                this.http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+this.Channel+'&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
                  .map((res: Response) => res.json().items)
                    .subscribe(data => this.ChannelVideo = data)
            }
          },
          err => { this.Errors = 'Oops cannot retrive data!!' }
      );

      this.loader = true;
      this.spinner = true;

      // Get Related Video
      this.getRelated().subscribe(
          data =>  {this.RelatedVideo = data 
            for(let rDetails of this.RelatedVideo) { 
              // Get Statistics
              this.Statistics = rDetails.id.videoId;
                this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id='+this.Statistics+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
                  .map((res: Response) => res.json().items)
                    .subscribe(data => this.StatisticsVideo = this.StatisticsVideo.concat(data))

              // Get Channel Thumbnail from related
              // this.RelatedChannel = rDetails.snippet.channelId;
              //   this.http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+this.RelatedChannel+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
              //     .map((res: Response) => res.json().items)
              //       .subscribe(data => console.log(this.RelatedChannelThumb = this.RelatedChannelThumb.concat(data)))

            }
          },

          err => { this.Errors = 'Oops cannot retrive data!!', this.spinner = false, this.loader = false },
          () => { this.spinner = false, this.loader = false }
       );
     
     });


    // this.TrendingVideos.getTrendingList().subscribe( 
    //       data => { this.List = data ;
    //         for(let list of this.List) {
    //           console.log(this.Channel = list.snippet.channelId);
    //             this.http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+this.Channel+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
    //               .map((res: Response) => res.json().items)
    //                 .subscribe( data => this.ListChannel = data)
               
    //          }
    // });
    
  }

  getVideo() {
      return this.http.get(this.Details).map((res: Response) => res.json().items);
  }

  getRelated() {
      return this.http.get(this.Related).map((res: Response) => res.json().items);
  }

  reload() {
          this.router.navigate(['/watch/'+this.videoId])
  }

}
