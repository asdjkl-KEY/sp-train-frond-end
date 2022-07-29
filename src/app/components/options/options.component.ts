import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  API: string = 'http://localhost:3000/'
  avatar: any = 'assets/icons/icon-512x512.png';
  base64!: unknown;
  _p: any = {
    old: '',
    p1: '',
    p2: ''
  }
  _r: any = {
    username: '',
    email: '',
    password: '',
    areas: [
      {
        name: 'emotional',
        checked: false
    },
    {
        name: 'intelligence',
        checked: false
    },
    {
        name: 'cotidian',
        checked: false
    }
  ]
  }
  message: any = {
    name: '',
    email: ''
  }
  msg: any = {
    type: '',
    content: ''
  }
  userinfo: any = {
    id: 0,
    username: '',
    admin: false,
    email: 'user.email',
    avatarURL: 'user.avatarURL',
    createdAt: 'user.createdAt',
    badges: [],
    color: 'user.color',
    areas: ['user.areas']
  }
  user: any = {
    username: '',
    email: ''
  }
  modals: any = {
    avatar: {
      c: 'changeavatar',
      cc: 'changeavatar-content'
    },
    namemail: {
      c: 'changeemailname',
      cc: 'changeemailname-content'
    },
    password: {
      c: 'changepassword',
      cc: 'changepassword-content'
    },
    register: {
      c: 'registeruser',
      cc: 'registeruser-content'
    }
  }
  constructor(private router: Router, private auth: RequestsService) {

  }

  ngOnInit(): void {
    localStorage.setItem('currentPage', 'options');
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['']);
    }
    this.auth.getUserInfo().subscribe(res => {
      this.user.username = res.username;
      this.user.email = res.email
      this.userinfo = res;
      this.avatar = res.avatarURL;
    }, err => {
      console.log(err.error);
    })
    setInterval(() => {
      if(!this.auth.isAuthenticated()) return;
      this.auth.getUserInfo().subscribe(res => {
        this.userinfo = res;
      }, err => {
        console.log(err.error);
      })
    }, 1000)
  }
  preview(){
    function getBase64(file: any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    let input = document.getElementById('fileavatar')! as HTMLInputElement;
    let file = input.files![0];
    getBase64(file).then(base64 => {
      this.avatar = base64;
      this.base64 = base64;
    });
  }
  saveAvatar(){
    this.auth.saveAvatar(this.base64).subscribe(res => {
      this.msg.type = res.text;
      this.msg.content = 'Se ha actualizado correctamente';
      setTimeout(() => {
        this.close('avatar');
        this.msg.content = '';
      }, 1000)
    })
  }
  close(modal: string){
    let m = this.modals[modal];
    let bg = document.getElementById(m.c)! as HTMLDivElement;
    let c = document.getElementById(m.cc)! as HTMLDivElement;
    c.style.animation = 'modal-out 0.7s forwards'
    setTimeout(() => {
      bg.style.display = 'none';
    }, 500)
  }
  openModal(modal: string){
    let m = this.modals[modal];
    let bg = document.getElementById(m.c)! as HTMLDivElement;
    let c = document.getElementById(m.cc)! as HTMLDivElement;
    bg.style.display = 'block';
    c.style.animation = 'modal-entry 0.7s forwards';
  }
  saveNamemail(modal: string){
    this.auth.updateUser(this.user.username, this.user.email).subscribe(res => {
      this.msg.type = res.text;
      this.msg.content = 'Se ha actualizado correctamente';
      setTimeout(() => {
        this.close(modal);
        this.msg.content = '';
      }, 1000)
    }, err => {
      this.msg.type = 'error';
      this.msg.content = 'Ha ocurrido un error, inténtelo de nuevo';
      setTimeout(() => {
        this.msg.content = '';
      }, 4000)
    })
  }
  verifyNameMail(value: string){
    if(value === 'username'){
      if(this.user.username === '') return;
      this.auth.hasUserName(this.userinfo.username, this.user.username).subscribe(res => {
        console.log(res.hasName);
        if(res.hasName == "true"){
          this.message.name = 'El nombre de usuario ya existe';
        } else {
          this.message.name = '';
        }
      })
    } else {
      if(this.user.email === '') return;
      this.auth.hasUserEmail(this.userinfo.email, this.user.email).subscribe(res => {
        if(res.hasEmail == "true"){
          this.message.email = 'El Correo electrónico ya pertenece a otra cuenta'
        } else {
          this.message.email = '';
        }
      })
    }
  }
  changePassword(){
    if(this._p.old == '' || this._p.p1 == '', this._p.p2 == ''){
      this.msg.type = 'error';
      this.msg.content = 'Todos los campos son obligatorios';
      setTimeout(() => {
        this.msg.content = '';
      }, 4000)
      return;
    }
    if(this._p.p1 !== this._p.p2){
      this.msg.type = 'error';
      this.msg.content = 'Las contraseñas no coinciden';
      setTimeout(() => {
        this.msg.content = '';
      }, 4000)
      return;
    }
    this.auth.changePassword(this._p.old, this._p.p1).subscribe(res => {
      this.msg.type = res.text;
      this.msg.content = 'Se ha actualizado la contraseña correctamente';
      setTimeout(() => {
        this.msg.content = '';
        this.close('password');
        this._p.old = '';
        this._p.p1 = '';
        this._p.p2 = '';
      }, 2000);
      return;
    }, err => {
      this.msg.type = 'error';
      this.msg.content = 'Ha ocurrido un error, inténtelo de nuevo';
      setTimeout(() => {
        this.msg.content = '';
      }, 4000)
      console.log(err.error);
      return;
    })
  }
  registerUser(){
    let areas: string[] = []
    if(this._r.username == '' || this._r.email == '' || this._r.password == ''){
      this.msg.type = 'error';
      this.msg.content = 'Todos los campos son obligatorios';
      setTimeout(() => {
        this.msg.content = '';
      }, 4000)
      return;
    }
    let a = 0;
    for(let area of this._r.areas){
      if(area.checked == true){
        a++;
      }
    }
    if(a == 0){
      this.msg.type = 'error';
      this.msg.content = 'Debe seleccionar al menos un área';
      setTimeout(() => {
        this.msg.content = '';
      }, 4000);
      return;
    }
    if(a == 3){
      areas[0] = 'all'
    }
    if(a > 0 && a < 3){
      for(let area of this._r.areas){
        if(area.checked == true){
          areas.push(area.value);
        }
      }
    }
    this.auth.register(this._r.username, this._r.email, this._r.password, areas).subscribe(res => {
      this.msg.type = res.text;
      this.msg.content = 'Se ha registrado correctamente el nuevo usuario';
      setTimeout(() => {
        this.msg.content = '';
        this.close('register');
        this._r.username = '';
        this._r.email = '';
        this._r.password = '';
        this._r.areas[0].checked = false;
        this._r.areas[1].checked = false;
        this._r.areas[2].checked = false;
      }, 2000);
      return;
    }, err => {
      if(err.error == 'already exists'){
        this.msg.type = 'error';
        this.msg.content = 'El nombre de usuario o correo electrónico ya existe en otra cuenta';
        setTimeout(() => {
          this.msg.content = '';
        }, 4000)
        return;
      }
      this.msg.type = 'error';
      this.msg.content = 'Ha ocurrido un error, inténtelo de nuevo';
      setTimeout(() => {
        this.msg.content = '';
      }, 4000)
      console.log(err.error);
      return;
    })
  }

}
