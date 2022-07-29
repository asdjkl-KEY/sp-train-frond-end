import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  asidebar: boolean = false;
  constructor() { }
  ngOnInit(): void {
    setInterval(() => {
      if(localStorage.getItem('currentPage') === 'news'){
        this.asidebar = true;
      } else {
        this.asidebar = false;
      }
    })
  }
}
