import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    id: 0,
    username: '',
    admin: false,
    email: 'user.email',
    avatarURL: 'https://IASparkly.sparklybot.repl.co/avatars/icon.png',
    createdAt: 'user.createdAt',
    badges: [],
    color: 'user.color',
    areas: ['user.areas']
  }
  API: string = 'https://IASparkly.sparklybot.repl.co/';
  constructor(private router: Router, private auth: RequestsService) { 
    if(!this.auth.isAuthenticated()) this.router.navigate(['']);
    this.auth.getUserInfo().subscribe(res => {
      this.user = res;
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    localStorage.setItem('currentPage', 'profile');
    
    setInterval(() => {
      if(!this.auth.isAuthenticated()) return;
      if(this.user === undefined){
        this.auth.getUserInfo().subscribe(res => {
          this.user = res;
        }, err => {
          console.log(err);
        })
      }
    }, 1000);
    let toggle = document.getElementById('modal-toggle')!;
    let close = document.getElementById('modal-close')!;
    let modalBackground = document.getElementById('modal-background')!;
    let modal = document.getElementById('modal')!;
    toggle.addEventListener('click', () => {
      modalBackground.style.display = 'block';
      modal.style.animation = 'modal-toggle 0.5s forwards';
    });
    close.addEventListener('click', () => {
      modalBackground.style.display = 'none';
      modal.style.animation = 'modal-close 0.5s forwards';
    })
  }
  setBackgroundHeader(element: any){
    element.style.background = this.user.color;
  }
  changeColor(){
    this.auth.changeColor(this.user.color).subscribe(res => {
      console.log(res.text);
    })
  }
  moveToTrain(){
    this.router.navigate(['train']);
  }

}
