import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService{

  //public url = "http://localhost/cursoMS/symfony/web/app_dev.php";
  public url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php";

  constructor(private _http: Http){}

  signup(userLogin){
    let json = JSON.stringify(userLogin);
    let params = "json="+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/login", params, {headers: headers})
        .map(res => res.json());
  }
}
