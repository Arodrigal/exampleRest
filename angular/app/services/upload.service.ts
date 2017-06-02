import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UploadService{
  public progressBar;

  constructor(private _http: Http){}

  makeFileRequest(token, url: string, params: Array<string>, files: Array<File>){
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      var progBar = document.getElementById("upload-progress-bar");
      var estadoProgBar = document.getElementById("status");

      var nameFileInput = params[0];
      for(var i=0; i<files.length; i++){
        formData.append(nameFileInput, files[i], files[i].name);
      }
      formData.append("authorization", token);
      xhr.onreadystatechange = function(){
        if(xhr.status == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      progBar.setAttribute("value", "0");
      progBar.style.width = "0%";


      xhr.upload.addEventListener("progress", function(event: any){
        var percent = (event.loaded / event.total) * 100;
        var prc = Math.round(percent).toString();

        progBar.setAttribute("value", prc);
        progBar.style.width = prc + "%";
        estadoProgBar.innerHTML = Math.round(percent)+" % subido... cargando";
      }, false);

      xhr.addEventListener("load", function(){
        estadoProgBar.innerHTML = "Subida completada";
        var prc = "0";
        progBar.setAttribute("value", prc);
        progBar.setAttribute("aria-valuenow", prc);
        progBar.style.width = prc + "%";
      }, false);

      xhr.addEventListener("error", function(){
        estadoProgBar.innerHTML = "Error en la subida";
      }, false);

      xhr.addEventListener("abort", function(){
        estadoProgBar.innerHTML = "Subida abortada";
      }, false);

      xhr.open("POST", url, true);
      xhr.send(formData);

    });
  }
}
