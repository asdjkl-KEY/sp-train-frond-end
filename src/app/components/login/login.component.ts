import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    username: '',
    password: ''
  }
  message: any = {
    type: "",
    text: ""
  };

  constructor(private router: Router, private auth: RequestsService) { 
    if(this.auth.isAuthenticated()){
      this.router.navigate(['profile'])
    }
   }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "login");
    setInterval(() => {
      if(this.message.type !== ""){
        setTimeout(() => {
          if(this.message.type !== ""){
            this.message.type = "";
            this.message.text = "";
          }
        }, 6000);
      }
    }, 100);
  }
  login(){
    this.auth.login(this.user.username, this.user.password).subscribe(res => {
      if(res.token){
        localStorage.setItem('token', res.token);
        this.router.navigate(['profile']);
      }
    }, err => {
      console.log(err);
      if(err.error === 'not found'){
        this.message.type = "error";
        this.message.text = "Usuario no encontrado";
        return
      }
      if(err.error === 'wrong password'){
        this.message.type = "error";
        this.message.text = "Contraseña incorrecta";
        return;
      }
      this.message.type = 'error';
      this.message.text = 'Se ha producido un error, inténtelo más tarde';
    })
    // localStorage.setItem('token', 'token');
    // this.router.navigate(['profile']);
  }

}
