import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  user!: any
  info: any = {
    question: "",
    answer: ""
  }
  area: string = 'cotidian'
  message: any = {
    type: '',
    content: ''
  }
  isAll: boolean = false;
  constructor(private router: Router, private auth: RequestsService) { }

  ngOnInit(): void {
    
    localStorage.setItem('currentPage', 'train');
    if(!this.auth.isAuthenticated()) {this.router.navigate(['']); return;}
    this.typing();
    this.auth.getUserInfo().subscribe(res => {
      this.user = res;
    }, err => {
      console.log(err.error);
    } );
    setInterval(() => {
      if(!this.auth.isAuthenticated()) return;
      this.auth.getUserInfo().subscribe(res => {
        this.user = res;
      }, err => {
        console.log(err.error);
      } );
      if(this.user !== undefined){
        // console.log(this.user);
        if(this.user.areas.includes('all')){
          this.isAll = true;
        }
      }
    }, 100)
  }
  typing(){
    let u = 0;
    let vuelta = 0
    let messages = ["Bienvenido al entrenamiento del bot!", "Es un placer trabajar contigo en este pequeño pero ambicioso proyecto."];
    let title = document.getElementById('train-title')!;
    function typing(){
      setTimeout(() => {
        if(vuelta == 2) return;
        if(u == messages[vuelta].length) {
          vuelta++; u = 0;
          setTimeout(() => {
            if(vuelta != 2){
              title.textContent = '';
            }
           typing();
          }, 900)
          return;
        }
        title.textContent += messages[vuelta][u];
        u++
        typing();
      }, 100);
    }
    typing();
  }
  train(){
    if(this.isAll == true){
      if(this.info.question == '' || this.info.answer == '') return;
      this.auth.train(this.info, this.area).subscribe(res => {
        this.message.type = res.text;
        this.message.content = "Se ha agregado este bloque al entrenamiento, VAMOS POR EL SIGUIENTE!";
        this.info.question = '';
        this.info.answer = '';
        setTimeout(() => {
          this.message.type = '';
          this.message.content = '';
        }, 4000)
      }, err => {
        this.message.type = 'error';
        this.message.content = 'Ha ocurrido un error y no se ha podido guardar el bloque, inténtalo de nuevo o contacta con el desarrollador!';
        setTimeout(() => {
          this.message.type = '';
          this.message.content = '';
        }, 4000)
      })
    } else {
      this.auth.train(this.info, this.user.areas[0]).subscribe(res => {
        this.message.type = res.text;
        this.message.content = "Se ha agregado este bloque al entrenamiento, VAMOS POR EL SIGUIENTE!";
        this.info.question = '';
        this.info.answer = '';
        setTimeout(() => {
          this.message.type = '';
          this.message.content = '';
        }, 4000)
      }, err => {
        this.message.type = 'error';
        this.message.content = 'Ha ocurrido un error y no se ha podido guardar el bloque, inténtalo de nuevo o contacta con el desarrollador!';
        setTimeout(() => {
          this.message.type = '';
          this.message.content = '';
        }, 4000)
      })
    }
  }

}
