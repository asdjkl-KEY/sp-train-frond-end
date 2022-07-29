import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private API: string = 'https://IASparkly.sparklybot.repl.co/'
  constructor(private http: HttpClient) { 

  }
  isAuthenticated(): boolean{
    if(localStorage.getItem('token') !== null){
      return true;
    }
    return false;
  }
  logout(){
    localStorage.removeItem('token');
  }
  login(username: string, password: string){
    return this.http.post<any>(this.API + 'login', {
      username,
      password
    });
  }
  register(username: string, email: string, password: string, areas: string[]){
    return this.http.post<any>(this.API + 'register', {
      username,
      email,
      password,
      token: this.getToken(),
      areas
    });
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isAdmin(){
    return this.http.get<any>(this.API + 'is-admin' + '?token=' + this.getToken());
  }
  getNews(){
    return this.http.get<any>(this.API + 'news');
  }
  question(quest: any){
    return this.http.post<any>(this.API + 'question', {
      question: quest
    })
  }
  getUserInfo(){
    return this.http.get<any>(this.API + 'user-info' + '?token=' + this.getToken());
  }
  changeColor(color: string){
    return this.http.post<any>(this.API + 'user-color', {
      token: this.getToken(),
      color
    });
  }
  train(info: any, area: string){
    return this.http.post<any>(this.API + 'train/'+ area, {
      info,
      token: this.getToken()
    })
  }
  hasUserName(oldname: string, newname: string){
    return this.http.post<any>(this.API + 'has-name', {
      oldname,
      newname
    });
  }
  hasUserEmail(oldemail: string, newemail: string){
    return this.http.post<any>(this.API + 'has-email', {
      oldemail,
      newemail
    });
  }
  updateUser(username: string, email: string){
    return this.http.post<any>(this.API + 'update-user', {
      username,
      email,
      token: this.getToken()
    })
  }
  changePassword(old: string, newpass: string){
    return this.http.post<any>(this.API + 'update-password', {
      token: this.getToken(),
      password: newpass,
      oldPassword: old
    })
  }
  saveAvatar(avatar: any){
    return this.http.post<any>(this.API + 'save-avatar', {
      token: this.getToken(),
      avatar: avatar
    })
  }
}
