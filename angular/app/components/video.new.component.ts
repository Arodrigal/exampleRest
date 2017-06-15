import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
import {UploadService} from '../services/upload.service';
import {VideoService} from '../services/video.service';
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'video-new',
    templateUrl: 'app/view/video.new.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, UploadService, VideoService]
})

// Clase del componente donde irán los datos y funcionalidades
export class VideoNewComponent implements OnInit{
  public titulo:string = "Crear un nuevo video";
  public user: User;
  public video: Video;
  public errorMessage;
  public status;
  public uploadedImage = false;
  public identity;

  constructor(
    private _loginService: LoginService,
    private _uploadService: UploadService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.uploadedImage = false;
  }

  ngOnInit(){
    this.identity = this._loginService.getIdentity();

    if(this.identity == null){
      this._router.navigate(["/index"]);
    }else{
      this.video = new Video(1, "", "", "public", "null", "null", null, null, this.identity.sub);
      console.log("Componente de nuevo video");
    }
  }

  callVideoStatus(value){
    this.video.status = value;
  }

  onSubmit(){


    let token = this._loginService.getToken();

    this._videoService.create(token, this.video).subscribe(
      response => {
        this.status = response.status;

        if(this.status != "Success"){
          this.status = "error";
          console.log("Error:");
          console.log(response);
        }else{
          this.video = response.data;
          console.log(this.video);

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

  public filesToUpload: Array<File>;
  public resultUpload;

  fileChangeEventImage(fileInput: any){

    this.filesToUpload = <Array<File>>fileInput.target.files;

    let token = this._loginService.getToken();
    let url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php/video/upload-image/"+this.video.id;
    this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
        (result) => {
          this.resultUpload = result;
          this.video.image = this.resultUpload.filename;

          console.log(this.video);

        },
        (error) => {
          alert("Error");
          console.log(error);
        }

    );
  }

  nextUploadVideo(){
    console.log("Cambiado estado del uploadedImage");
    this.uploadedImage = true;
    console.log("Comprobacion ('+this.status+') ('+this.uploadedImage+')");
  }

  fileChangeEventVideo(fileInput: any){

    this.filesToUpload = <Array<File>>fileInput.target.files;

    let token = this._loginService.getToken();
    let url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php/video/upload-video/"+this.video.id;
    this._uploadService.makeFileRequest(token, url, ['video'], this.filesToUpload).then(
        (result) => {
          this.resultUpload = result;
          this.video.videoPath = this.resultUpload.filename;

          console.log(this.video);

        },
        (error) => {
          alert("Error");
          console.log(error);
        }

    );
  }

  redirectToVideo(){
    this._router.navigate(['/video', this.video.id]);
  }
}
