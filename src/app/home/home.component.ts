import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GetTrendingService } from '../video/service/get-trending.service';
import { Http, Response } from '@angular/http';
import { DecimalPipe } from '@angular/common';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private TrendingVideos: GetTrendingService, private http: Http) { }

  loader: boolean = false;
  spinner: boolean = false;

  List = [];
  Count = [];
  Errors: string;

  onScroll () {
      console.log('scrolled!!')
  }

  ngOnInit() {
    this.spinner = true;
    this.loader = true 
    this.TrendingVideos.getTrendingList().subscribe(
        data => { console.log(this.List = data)} ,
        err => { this.Errors = 'Oops cannot retrive data!!', this.spinner = false, this.loader = false},
        () => { this.spinner = false, this.loader = false }

    );

  	this.TrendingVideos.getTrendingListCount().subscribe( data => this.Count = data );

    // this.TrendingVideos.getTrendingList().subscribe( 
    //   data => { this.List = data ;
    //     this.List.forEach(
    //       idChannel =>
    //       // Get Channel
    //       this.http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+idChannel.snippet.channelId+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
    //         .map((res: Response) => res.json().items)
    //           .subscribe( data => this.Channel = data )
    //     );
    // });

    // this.TrendingVideos.getTrendingList().subscribe( 
    //       data => { this.List = data ;
    //         for(let list of this.List) {
    //           console.log(this.Channel = list.snippet.channelId);
    //             this.http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+this.Channel+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
    //               .map((res: Response) => res.json().items)
    //                 .subscribe( data => this.ListChannel = data)
               
    //          }
    // });

    // this.TrendingVideos.getTrendingList().subscribe( 
    //       data => { this.List = data ;
    //         for(let list of this.List) {
    //           this.Channel = list.snippet.channelId;

    //             Observable.forkJoin(
    //               this.Channel.map(
    //                 id => this.http.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+id+'&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
    //                   .map((res: Response) => res.json().items)
    //               )
    //             ) .subscribe(data => this.ListChannel = data)
    //          }
    // });

  }


}
