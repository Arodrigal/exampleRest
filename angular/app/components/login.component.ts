import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import {LoginService} from'../services/login.service';

@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]
})

// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit {
  public titulo: string = "Identifícate";
  public user;
  public errorMessage;
  public token;
  public identity;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){

    this._route.params.subscribe(params => {
      let logout = +params["id"];
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        window.location.href = "/login";
        //this._router.navigate(["/index"]);
      }
    });

    this.user = {
      "email": "",
      "password": "",
      "gethash": "false"
    }

    this.identity = this._loginService.getIdentity();
    if(this.identity != null && this.identity.sub){
      this._router.navigate(["/index"]);
    }

  }

  onSubmit(){
    console.log(this.user);
    this._loginService.signup(this.user).subscribe(
      response => {
        console.log('Obtenido respuesta');
        this.identity = response;
        //this.token = response;
        if(this.identity.length <=0){
          alert("Error en el servidor");
        }else{
          console.log('Que identity status '+this.identity.status);
          if(!this.identity.status){
            localStorage.setItem('identity', JSON.stringify(this.identity));

            // GET TOKEN
            this.user.gethash = "true";
            this._loginService.signup(this.user).subscribe(
                response => {
                  console.log('Obtenido respuesta de token');
                  this.token = response;

                  if(this.token.length <= 0){
                    alert("Error en el servidor");
                  }else{
                    if(!this.token.status){
                      localStorage.setItem('token', this.token);

                      // REDIRECCIÓN
                      window.location.href = "/";
                      //this._router.navigate(["/index"]);
                    }
                  }
                },
                error => {
                  this.errorMessage = <any>error;

                  if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
            );
          }
        }

      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }
}
