import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class DefaultComponent {
  public titulo = "Portada";
  public identity;

  constructor(
    private _loginService: LoginService
  ){}

  ngOnInit(){
    this.identity = this._loginService.getIdentity();
  }
}
