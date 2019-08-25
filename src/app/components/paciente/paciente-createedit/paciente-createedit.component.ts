import { PacienteService } from './../../../model/paciente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from '../../../../../node_modules/rxjs';
import { EstadoBr } from '../../../class/EstadoBr';
import { ConsultaCepService } from '../../../model/consulta-cep.service';

@Component({
  selector: 'app-paciente-createedit',
  templateUrl: './paciente-createedit.component.html',
  styleUrls: ['./paciente-createedit.component.css']
})
export class PacienteCreateeditComponent implements OnInit {

  formulario: FormGroup;
  estados: Observable<EstadoBr[]>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private cepService: ConsultaCepService) {
  }


  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null],
      cpf: [null, Validators.maxLength(14)],
      cep: [null],
      cidade: [null],
      estado: [null],
      bairro: [null],
      endereco: [null],
      numero: [null],
      status: [null],
    });

    this.estados = this.pacienteService.getEstadosBr();


    // Recupera o ID que foi passado pelo parametro
    let id = this.route.snapshot.params['id'] | 0;
    if (id != 0) {
      this.formulario.get('id').setValue(id);
    }


  }


  onSubmit() {
    let objForm = Object.assign({}, this.formulario.value);
    console.log(objForm);

    if (objForm.observacao == null) objForm.observacao = "";
    objForm.status = (objForm.status == true) ? 1 : 0;

    this.pacienteService.insert(objForm)
      .subscribe(dados => this.afterAccess(dados), (error: any) => alert('Ocorreu um erro'));;
  }


  // Valida para saber de pode mudar a rota
  formMudou: boolean = false;
  onInput() {
    this.formMudou = true;
  }

  podeMudarRota() {
    if (this.formMudou)
      return confirm('Tem certeza que deseja sair dessa pagina?');
    return true;
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

  consultaCEP() {
    const cep = this.formulario.get('cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {
    // this.formulario.setValue({});
    console.log(dados);
    this.formulario.patchValue({

      endereco: dados.logradouro,
      // cep: dados.cep,
      numero: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf

    });



    // console.log(form);
  }
}
