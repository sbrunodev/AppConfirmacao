import { PacienteService } from './../../../model/paciente.service';
import { Paginacao } from './../../../class/paginacao';
import { CategoriaService } from './../../../model/categoria.service';
import { Component, OnInit, Compiler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../class/auth';
import { Categoria } from '../../../class/categoria';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent extends Paginacao implements OnInit {

  constructor(private http: HttpClient, private pacienteService: PacienteService, private _compiler: Compiler) {
    super();
  }

  items: any;

  ngOnInit() {
    this.getList();
  }

  excluir(desc, id) {

    if (confirm("Deseja excluir o Paciente " + desc + " ?")) {
      let index = this.getIndex(id);
      if (index == -1)
        alert('Não foi encontrado o index do código D:');
      else {
        let result = this.pacienteService.delete(id).
          subscribe(dados => {
            console.log(dados);
            this.getList();
            this.items = this.items.filter(item => item.id != id);
          },
            (error: any) => alert('erro'));
      }
    }
  }

  getIndex(id) {
    for (let i = 0; i < this.items.length; i++)
      if (this.items[i].id == id)
        return i;
    return -1;
  }

  getList(page: number = 1) {
    this._compiler.clearCache();
    this.pacienteService.get(page, this.pesquisarValue)
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
    console.log(this.items);

  }

  changePage(page: number, type: string = "") {
    if (this.pagination(page, type))
      this.getList(this.currentPage);
  }

  pesquisarValue: string = "";

  clickPesquisar() {
    this.getList();
  }

}
