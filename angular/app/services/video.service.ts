import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class VideoService{

  //public url = "http://localhost/cursoMS/symfony/web/app_dev.php";
  public url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php";
  public token;
  public identity;

  constructor(private _http: Http){}

  create(token, video){
    let json = JSON.stringify(video);
    let params = "json="+json+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/video/new", params, {headers: headers})
        .map(res => res.json());
  }

  update(token, video, id){
    let json = JSON.stringify(video);
    let params = "json="+json+"&authorization="+token;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    return this._http.post(this.url+"/video/edit/"+ id, params, {headers: headers})
        .map(res => res.json());
  }

  getVideo(id){
    return this._http.get(this.url+"/video/details/"+id).map(res => res.json());
  }

  getLastVideos(){
    return this._http.get(this.url+"/video/last-videos").map(res => res.json());
  }

  getVideos(page = null){
    if(page == null){
      page = 1;
    }

    return this._http.get(this.url+"/video/list?page="+page).map(res => res.json());
    //return this._http.get(this.url+"/video/list").map(res => res.json());
  }
}
