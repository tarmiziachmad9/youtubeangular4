import { Component, OnInit} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  loader: boolean = true;
  spinner: boolean = true;

  videoId: string; //params id
  apiResource: string;
  API = [];
  Errors: string;

  constructor(private http: Http, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {

  	this.spinner = true;
  	this.loader = true;

	  this.route.params.subscribe(params => {
		this.videoId = params.videoId; 

		this.apiResource = 'https://joxprojects.com/downloader/index.php?videoid='+this.videoId;      

		this.getApi().subscribe(
		  data => { console.log(this.API = data) },
		  err => { this.Errors = 'Oops cannot retrive data!!', this.spinner = false, this.loader = false },
			() => { this.spinner = false, this.loader = false }
		);

	});
  
  }

  getApi() {
      return this.http.get(this.apiResource).map((res: Response) => res.json().Download);
  }

  back() {
    this.location.back(); 
  }

  reload() {
          this.router.navigate(['/download/'+this.videoId])
  }
}
