import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../models/login';
import { API_CONFIG } from '../config/api.config';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(login: Login) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, login, {
      observe: 'response',
      responseType: 'text'
    });
  }

  register(register: Register) {
    return this.http.post(`${API_CONFIG.baseUrl}/register`, register, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successFullLogin(authToken: string, login: string){
    localStorage.setItem('token', authToken)
    localStorage.setItem('username', login)
  }

  isAuthenticated(){
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }

  logout(){
    localStorage.clear();
  }
}
