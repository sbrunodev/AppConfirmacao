import { map } from 'rxjs/operators';
import { PacienteService } from './../../../model/paciente.service';
import { Component, OnInit } from '@angular/core';
import { ExameService } from '../../../model/exame.service';
import { NotificacaoService } from '../../../model/notificacao.service';

@Component({
  selector: 'app-enviaremail',
  templateUrl: './enviaremail.component.html',
  styleUrls: ['./enviaremail.component.css']
})
export class EnviaremailComponent implements OnInit {

  pacientes: Array<any> = new Array();
  enviarPara: Array<any> = new Array();
  exames: any;
  idExame: number;
  exame = null;

  data: String;
  hora: String;

  constructor(
    private exameService: ExameService,
    private pacienteService: PacienteService,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit() {

    this.exameService.getCombobox()
      .subscribe(dados => this.carregaExames(dados));

    this.pacienteService.getCombobox()
      .subscribe(dados => this.carregaPacientes(dados));


    this.data = Date.now().toString();
    // new Date().toLocaleString();
    this.hora = '08:00';
  }

  carregaPacientes(dados) {
    this.pacientes = dados.result.item;
  }

  carregaExames(dados) {
    this.exames = dados.result.item;
  }

  onChangePaciente(dados) {
    const pos = this.getIndex(this.pacientes, dados);

    if (dados !== -1) {

      // Adiciona o paciente na lista "enviar p/"
      this.enviarPara.push(this.pacientes[pos]);

      // Remove o paciente da combobox.
      this.pacientes = this.pacientes.filter(item => item.id !== dados);
    }
  }

  onChangeExame(dados) {
    this.idExame = dados;
    this.exameService.getObject(dados)
      .subscribe(result => this.showExame(result));
  }

  showExame(dados) {
    this.exame = null;
    this.exame = dados.result;
  }

  removerEnviarPara(id, nome) {
    if (confirm('Deseja remover o(a) ' + nome + ' da lista de Enviar Para ?')) {
      const pos = this.getIndex(this.enviarPara, id);

      if (pos !== -1) {
        // Adiciona o paciente na lista "Pacientes"
        this.pacientes.push(this.enviarPara[pos]);
        // Remove o Enviar para.

        this.enviarPara = this.enviarPara.filter(item => item.id !== id);
      }
    }

  }

  getIndex(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  enviarNotificacao() {

    const jsonObject =
      JSON.stringify(
        {
          exame: this.idExame,
          data: this.data,
          hora: this.hora,
          iniciojejum: '00:00',
          pacientes: this.getPacientesId()
        });

    this.notificacaoService.insert(jsonObject)
    .subscribe(dados => this.afterAccess(dados), (error: any) => alert('Ocorreu um erro'));
  }

  afterAccess(dados) {
    console.log(dados.result);
    if (dados.result) { // Para saber se é diferente de null ou undefined
      if (dados.result === true) {

      } else {
        alert(dados.result);
      }
    }
  }

  getPacientesId() {
    const _paciente: Array<any> = new Array();
    for (let i = 0; i < this.enviarPara.length; i++) {
      _paciente.push({paciente: this.enviarPara[i].id });
    }
    return _paciente;
  }

}
