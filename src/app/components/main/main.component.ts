import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  height: number = 0;
  messages: any[] = []
  botLastMessage: any = 0
  userLastMessage!: any
  elements: any[] = []
  messages2: any[] = [
    {
      id: 0,
      author: "bot",
      content: "Hola, mi nombre es Sparkly y soy una inteligencia artificial, asistente virtual y la mascota insignia de JessCode Studio. No llevo mucho tiempo de haber sido programado por lo que mi conocimiento es limitado. Sin embargo, me estoy entrenando todos los días para ser mucho mejor"
  }
]
  talk: any = {
    author: "user",
    content: "",
    id: Date.now() / 10000
  }

  constructor(private router: Router, private auth: RequestsService) {
   }
   setElement(value: string){
   }
   sendMessage(){
    if(this.talk.content === "") return;
    this.talk.id = Date.now()/10000;
    this.userLastMessage = this.talk.id;
    let allMessages = JSON.parse(localStorage.getItem('messages')!);
    allMessages.push(this.talk);
    localStorage.setItem('messages', JSON.stringify(allMessages))
    let info = document.getElementById('info')!;
    info.scrollTop = info.scrollHeight;
    let question = this.talk.content;
    this.talk.content = "";
    setTimeout(() => {
      localStorage.setItem('question', question)
      this.question(localStorage.getItem('question')!);
    }, 1000);
    return;
  }
  ngOnInit(): void {
    localStorage.setItem('currentPage', '');
    localStorage.setItem('messages', JSON.stringify(this.messages2))
    setInterval(() => {
      this.messages = JSON.parse(localStorage.getItem('messages')!);
    }, 100)
  }
  question(quest: any){
    this.auth.question(quest).subscribe(res => {
      let botMessage = {
        author: 'bot',
        id: Date.now() / 10000,
        content: res.text
      }
      this.botLastMessage = botMessage.id;
      let allMessages = JSON.parse(localStorage.getItem('messages')!);
      allMessages.push(botMessage);
      localStorage.setItem('messages', JSON.stringify(allMessages))
    }, err => {
      let botMessage = {
        author: 'bot',
        id: Date.now() / 10000,
        content: "Ha ocurrido un error interno, por favor inténtalo más tarde"
      }
      this.botLastMessage = botMessage.id;
      let allMessages = JSON.parse(localStorage.getItem('messages')!);
      allMessages.push(botMessage);
      localStorage.setItem('messages', JSON.stringify(allMessages))
    })
  }

}
