import { NotificacaoService } from './../../../model/notificacao.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-enviaremail-detalhada',
  templateUrl: './enviaremail-detalhada.component.html',
  styleUrls: ['./enviaremail-detalhada.component.css']
})
export class EnviaremailDetalhadaComponent implements OnInit {

  inf = null;

  constructor(private route: ActivatedRoute, private notificacaoService: NotificacaoService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'] | 0;
    if (id !== 0) {
      this.notificacaoService.getObject(id)
        .subscribe(result => this.carregaDados(result));
    }
  }

  carregaDados(dados) {
    this.inf = dados.result;
    console.log(this.inf);
  }

  reenviarEmail(email){
    alert(email);
  }

  verificar(linkVerificar){
    alert(linkVerificar);
  }

}
