import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CommentService{

  //public url = "http://localhost/cursoMS/symfony/web/app_dev.php";
  public url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php";

  constructor(private _http: Http){}

  create(token, comment){
    let json = JSON.stringify(comment);
    let params = "json="+json+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/comment/new", params, {headers: headers})
        .map(res => res.json());
  }

  getComments(id){
    return this._http.get(this.url+"/comment/list/"+id).map(res => res.json());
  }

  deleteComment(token, id){
    let params = "&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/comment/delete/"+id, params, {headers: headers})
        .map(res => res.json());
  }
}
