import { Paginacao } from './../../../class/paginacao';
import { CategoriaService } from './../../../model/categoria.service';
import { Component, OnInit, Compiler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../class/auth';
import { Categoria } from '../../../class/categoria';
import { NotificacaoService } from '../../../model/notificacao.service';

@Component({
  selector: 'app-enviaremail-list',
  templateUrl: './enviaremail-list.component.html',
  styleUrls: ['./enviaremail-list.component.css']
})
export class EnviaremailListComponent extends Paginacao implements OnInit {
  
  pesquisarValue: String = "";
  items: any;

  constructor(private http: HttpClient, private notificacaoServiceo: NotificacaoService, private _compiler: Compiler) {
    super();
  }


  ngOnInit() {
    this.getList();
  }

  getIndex(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  getList(page: number = 1) {
    this._compiler.clearCache();
    this.notificacaoServiceo.get(page, this.pesquisarValue)
      .subscribe(dados => { console.log(dados); this.exibeLista(dados); }, (error: any) => console.log(error));
  }

  exibeLista(dados) {

    this.items = null;

    if (dados.result.count === 0) { // Quantidade de itens retornados da consulta
      this.pages = null;
    } else {
      if (dados.result.paginas === 0) { // Quantidade de paginas
        this.pages = null;
      } else {
        this.totalPages = dados.result.paginas;
        this.loadPages();
      }
      this.items = dados.result.item;
    }

    console.log('Quantidade: ' + dados.result.count);
    console.log(this.items);

  }

  changePage(page: number, type: string = '') {
    if (this.pagination(page, type)) {
      this.getList(this.currentPage);
    }
  }



  clickPesquisar() {
    this.getList();
  }

}
