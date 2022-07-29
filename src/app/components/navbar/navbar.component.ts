import { Component, OnInit } from '@angular/core';
import { RequestsService }  from '../../services/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated: boolean = false
  current: string = 'home'
  active: string = ''
  constructor(private auth: RequestsService, private router: Router) { 
    setInterval(() => {
      if(this.auth.isAuthenticated() === false){
        this.authenticated = false;
      } else {
        this.authenticated = true;
      }
    }, 100);
  }
  setCurrent(e: string){
    if(!e) return this.current = 'home'
    else return this.current = e
  }
  ngOnInit(): void {
    if(localStorage.getItem("currentPage") !== null){
      this.active = localStorage.getItem("currentPage")!
    }
    setInterval(() => {
      if(localStorage.getItem("currentPage") !== null){
        this.active = localStorage.getItem("currentPage")!
      }
    }, 100);
  }
  logout(){
    this.auth.logout()
    this.router.navigate(['/login'])
  }
  _setActive(e: string){
    this.active = e
  } 

}
