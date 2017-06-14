import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
import {VideoService} from '../services/video.service';
import {GenerateDatePipe} from "../pipes/generate.date.pipe";
import {CommentsComponent} from "./comments.component";
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'video-details',
    templateUrl: 'app/view/video.details.html',
    directives: [ROUTER_DIRECTIVES, CommentsComponent],
    providers: [LoginService, VideoService],
    pipes: [GenerateDatePipe]
})

// Clase del componente donde irán los datos y funcionalidades
export class VideoDetailsComponent implements OnInit{
  public titulo:string = "Detalle de video";
  //public user: User;
  public video: Video;
  public loading = 'show';
  public errorMessage;
  public status;
  public lastVideos;
  public statusLastVideos;
  public identity;

  constructor(
    private _loginService: LoginService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){ }

  ngOnInit(){
    this.identity = this._loginService.getIdentity();

    this._route.params.subscribe(params => {
      this.loading = 'show';
      let id = params["id"];

      this._videoService.getVideo(id).subscribe(
        response => {
          this.status = response.status;

          if(this.status != "Success"){
            this._router.navigate(["/index"]);
          }else{
            this.video = response.data;
            console.log(this.video);

          }
          this.loading = 'hide';
        },
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

      this._videoService.getLastVideos().subscribe(
        response => {
          this.status = response.status;

          console.log("Estado: "+this.status);
          if(this.status != "Success"){
            this._router.navigate(["/index"]);
          }else{
            this.lastVideos = response.data;
            console.log(this.lastVideos);

          }
          this.loading = 'hide';
        },
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    });

  }

}
