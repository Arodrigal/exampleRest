import {Component, OnInit} from '@angular/core';
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

  constructor(
    private _loginService: LoginService
  ){}

  ngOnInit(){

    this.user = {
      "email": "",
      "password": "",
      "gethash": "false"
    }
  }

  onSubmit(){
    console.log(this.user);
    this._loginService.signup(this.user).subscribe(
      response => {
        console.log(response);
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
