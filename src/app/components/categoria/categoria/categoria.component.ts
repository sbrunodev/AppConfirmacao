import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from './../../../model/categoria.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  formulario: FormGroup;
  formMudou: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoriaSevice: CategoriaService) {
  }


  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      observacao: [null],
      status: [true],
    });

    // Recupera o ID que foi passado pelo parametro
    // tslint:disable-next-line:no-bitwise
    const id = this.route.snapshot.params['id'] | 0;
    if (id !== 0) {
      this.formulario.get('id').setValue(id);
    }
  }


  onSubmit() {
    const objForm = Object.assign({}, this.formulario.value);
    // Validando campos
    if (objForm.observacao == null) { objForm.observacao = ''; }
    objForm.status = (objForm.status === true) ? 1 : 0;

    this.categoriaSevice.insert(objForm)
    .subscribe(dados => this.afterAccess(dados), (error: any) => alert('Ocorreu um erro'));
  }


  // Valida para saber de pode mudar a rota
  onInput() {
    this.formMudou = true;
  }

  podeMudarRota() {
    if (this.formMudou) {
      return confirm('Tem certeza que deseja sair dessa pagina?');
    }
    return true;
  }


  afterAccess(dados) {
    console.log(dados.result);
    if (dados.result) { // Para saber se é diferente de null ou undefined
      if (dados.result === true) {
        this.formulario.reset(); // Retorna Ok, a tentativa foi realizada com sucesso
        this.formulario.get('status').setValue(true);
      } else {
        alert(dados.result);
      }
    }
  }


}
