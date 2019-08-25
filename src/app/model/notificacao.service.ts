import { EstadoBr } from './../class/EstadoBr';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../class/auth';
import { Observable } from 'rxjs';

import { map, tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  nameClass = 'notificacao';
  constructor(private http: HttpClient) {

  }

  insert(ObjJson) {
    /*console.log("Objeto");console.log(ObjJson);console.log("Caminho :"+Auth.url + this.nameClass);console.log("Token :"+Auth.token);*/
    console.log(ObjJson);
    return this.http.post(Auth.url + this.nameClass, ObjJson, { headers: { 'token': Auth.token } } );
  }

  get(page, exame) {
    // page = 'all';
    return this.http.get(Auth.url + this.nameClass + `?page=${page}`, { headers: { 'token': Auth.token } })
      .pipe(map(response => response)); // or try  `response.json()` instead of `response`
  }

  getObject(id) {
  
    return this.http.get(Auth.url + this.nameClass + `/${id}`, { headers: { 'token': Auth.token } })
      .pipe(map(response => response)); // or try  `response.json()` instead of `response`
  }

  delete(id) {
    console.log(Auth.url + this.nameClass + '/' + id);
    return this.http
      .delete(Auth.url + this.nameClass + '/' + id, { headers: { 'token': Auth.token } });
  }

  getCombobox() {
    return this.http.get(Auth.url + this.nameClass + `?getComboBox=true`, { headers: { 'token': Auth.token } })
      .pipe(map(response => response));
  }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/Dados/Estados.json');
  }



}
