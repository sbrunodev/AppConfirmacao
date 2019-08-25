import { Categoria } from './../../../class/categoria';
import { CategoriaService } from './../../../model/categoria.service';
import { ExameService } from './../../../model/exame.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-exame-createedit',
  templateUrl: './exame-createedit.component.html',
  styleUrls: ['./exame-createedit.component.css']
})
export class ExameCreateeditComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private exameService: ExameService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
      jejum: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
      categoriaexame: [null, [Validators.required]],
      observacao: [null],
      status: [true],
    });

    // Recupera o ID que foi passado pelo parametro
    let id = this.route.snapshot.params['id'] | 0;
    if (id != 0) {
      this.formulario.get('id').setValue(id);
    }

    this.carregaCombobox();
  }


  onSubmit() {
    let objForm = Object.assign({}, this.formulario.value);
    // Validando campos
    if (objForm.observacao == null) objForm.observacao = "";
    objForm.status = (objForm.status == true) ? 1 : 0;

    this.exameService.insert(objForm)
      .subscribe(dados => this.afterAccess(dados), (error: any) => alert('Ocorreu um erro'));;

  }

  afterAccess(dados) {
    console.log(dados.result);
    if (dados.result) { // Para saber se é diferente de null ou undefined
      if (dados.result == true) {
        this.formulario.reset(); // Retorna Ok, a tentativa foi realizada com sucesso
        this.formulario.get('status').setValue(true);
      }
      else
        alert(dados.result);
    }
  }

  formMudou: boolean = false;
  onInput() {
    this.formMudou = true;
  }

  podeMudarRota() {
    if (this.formMudou)
      return confirm('Tem certeza que deseja sair dessa pagina?');
    return true;
  }

  // Carrega Combobox CategoriaExame
  cbbCategoriaExame: any;
  carregaCombobox() {
    this.categoriaService.getCombobox()
    .subscribe(
      dados=>{ this.exibeLista(dados) },
      (error:any)=>console.log(error)
    );
  }

  exibeLista(dados) {
    this.cbbCategoriaExame = dados.result.item;
    console.log(this.cbbCategoriaExame);
  }


}



