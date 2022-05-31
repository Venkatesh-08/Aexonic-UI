import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API, API_ENDPOINT_URL } from 'constant';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<User> | any;
  public user: Observable<User> | any;

  isLogin: boolean = false;
  constructor(private router: Router,
    private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: any, password: any) {
    return this.http.post<User>(API_ENDPOINT_URL + `login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    this.isLogin = true;
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(API_ENDPOINT_URL + `register`, user);
  }

  logoutApi(){
    let data:any = localStorage.getItem('user');
    let data1 = JSON.parse(data);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    return this.http.put(API.LOG_OUT, data1);
  }
}

function data<T>(arg0: string, data: any) {
  throw new Error('Function not implemented.');
}

