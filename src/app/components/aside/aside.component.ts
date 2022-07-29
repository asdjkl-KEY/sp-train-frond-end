import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
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
  }

}
