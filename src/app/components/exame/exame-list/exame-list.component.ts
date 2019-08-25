import { ExameService } from './../../../model/exame.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paginacao } from './../../../class/paginacao';

@Component({
  selector: 'app-examelist',
  templateUrl: './exame-list.component.html',
  styleUrls: ['./exame-list.component.css']
})
export class ExameListComponent extends Paginacao implements OnInit {

  items: any;

  constructor(private http: HttpClient, private exameService : ExameService) {
    super();
  }

  ngOnInit() {
    this.getList();
  }

  excluir(desc, id) {

    if (confirm("Deseja excluir a categoria " + desc + " ?")) {
      let index = this.getIndex(id);
      if (index == -1)
        alert('Não foi encontrado o index do código D:');
      else {
        let result = this.exameService.delete(id).
          subscribe(dados => { this.getList() 
            this.items = this.items.filter(item => item.id != id);
          },
            (error: any) => alert('erro'));
      }
    }
  }

  getIndex(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id)
        return i;
    }
    return -1;
  }

  getList(page: number = 1) {
  
    this.exameService.get(page, this.pesquisarValue)
      .subscribe(dados => { console.log(dados); this.exibeLista(dados) }, (error: any) => console.log(error));
  }

  

  exibeLista(dados) {

    this.items = null;

    if (dados.result.count == 0) // Quantidade de itens retornados da consulta
      this.pages = null;
    else {
      if (dados.result.paginas == 0) // Quantidade de paginas
        this.pages = null;
      else {
        this.totalPages = dados.result.paginas;
        this.loadPages();
      }
      this.items = dados.result.item;
    }

    console.log('Quantidade: ' + dados.result.count);
    console.log('Paginas: ' + dados.result.paginas);
    console.log(this.items);

  }

  pesquisarValue: string = "";

  onSearchChange(searchValue: string) {
    this.pesquisarValue = searchValue;
    this.currentPage = 1;
    this.getList();
  }


  changePage(page: number, type: string = "") {
    if (this.pagination(page, type))
      this.getList(this.currentPage);
  }



}
