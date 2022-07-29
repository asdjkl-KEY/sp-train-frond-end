import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  bell: string = ""

  constructor(private router: Router, private auth: RequestsService) { }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.auth.getNews().subscribe(res => {
    //     this.news = res.news;
    //   }, err => {
    //     // console.log(err);
    //   });
      
    // }, 100);
    localStorage.setItem('currentPage', 'news');
  }

}
