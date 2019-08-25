import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formulario: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService:AuthService) { 

  } 

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    });
  }

  onSubmit(){
    let valueSubmit = Object.assign({}, this.formulario.value);
    this.authService.fazerLogin(valueSubmit);
  }

}
