import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService{

  //public url = "http://localhost/cursoMS/symfony/web/app_dev.php";
  public url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php";
  public token;
  public identity;

  constructor(private _http: Http){}

  signup(userLogin){
    let json = JSON.stringify(userLogin);
    let params = "json="+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/login", params, {headers: headers})
        .map(res => res.json());
  }

  getIdentity(){
    if(JSON.parse(localStorage.getItem('identity')) != "undefined"){
      this.identity = JSON.parse(localStorage.getItem('identity'));
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    if(localStorage.getItem('token') != "undefined"){
      this.token = localStorage.getItem('token');
    }else{
      this.token = null;
    }
    return this.token;
  }

  register(userRegister){
    let json = JSON.stringify(userRegister);
    let params = "json="+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/user/new", params, {headers: headers})
        .map(res => res.json());
  }

  updateUser(userUpdate){
    let json = JSON.stringify(userUpdate);
    let params = "json="+json+"&authorization="+this.getToken();
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/user/edit", params, {headers: headers})
        .map(res => res.json());
  }
}
