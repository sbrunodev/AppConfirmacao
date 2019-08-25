import { Categoria } from '../class/categoria';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../class/auth';
import { Observable } from 'rxjs';

import { map, tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  nameClass = 'categoriaexame';
  constructor(private http: HttpClient) {

  }

  insert(ObjJson) {
    console.log("Objeto"); console.log(ObjJson); console.log("Caminho :" + Auth.url + this.nameClass); console.log("Token :" + Auth.token);
    if (ObjJson.id == null)
      return this.http.post(Auth.url + this.nameClass, ObjJson, { headers: { 'token': Auth.token } });
    else
      return this.http.put(Auth.url + this.nameClass + "/" + ObjJson.id, ObjJson, { headers: { 'token': Auth.token } });
  }

  get(page, descricao) {

    if (!descricao)
      descricao = "";
      
    console.log(Auth.url + this.nameClass + `?page=${page}&desc=${descricao}`);
    return this.http.get(Auth.url + this.nameClass + `?page=${page}&desc=${descricao}`, { headers: { 'token': Auth.token } })
      .pipe(map(response => { return response })) // or try  `response.json()` instead of `response` 
  }

  delete(id) {
    console.log(Auth.url + this.nameClass + "/" + id);
    return this.http
      .delete(Auth.url + this.nameClass + "/" + id, { headers: { 'token': Auth.token } });
  }

  getCombobox() {
    return this.http.get(Auth.url + this.nameClass + `?getComboBox=true`, { headers: { 'token': Auth.token } })
      .pipe(map(response => { return response }))
  }




}
