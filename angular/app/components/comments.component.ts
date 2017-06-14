import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
import {CommentService} from '../services/comment.service';
import {GenerateDatePipe} from "../pipes/generate.date.pipe";
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'comments',
    templateUrl: 'app/view/comments.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, CommentService],
    pipes: [GenerateDatePipe]
})

// Clase del componente donde irán los datos y funcionalidades
export class CommentsComponent implements OnInit{
  public titulo:string = "Comentarios";
  public errorMessage;
  public status;
  public comment;
  public identity;
  public token;
  public listComments;
  public loadingComments = 'show';

  constructor(
    private _loginService: LoginService,
    private _commentService: CommentService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this.identity = this._loginService.getIdentity();

    this._route.params.subscribe(
      params => {
        let id = +params["id"];

        this.comment = {
          "video_id": id,
          "body": "",
        }

        this.getComments(id);
      }
    );
  }

  getComments(video_id){
    this.loadingComments = 'show';
    this._commentService.getComments(video_id).subscribe(
      response => {
        this.status = response.status;

        if(this.status != "Success"){
          this.status = "error";
          console.log("Error:");
          console.log(response);
        }else{
          this.listComments = response.data;
          console.log(this.listComments);
          //this.comment.body = "";
        }
        this.loadingComments = 'hide';
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

  deleteComment(id){
    let comment_panel = <HTMLElement> document.querySelector(".comment-panel-"+id);
    if(comment_panel != null){
      comment_panel.style.display = "none";
    }

    this.token = this._loginService.getToken();
    this.loadingComments = 'show';
    this._commentService.deleteComment(this.token, id).subscribe(
      response => {
        this.status = response.status;

        if(this.status != "Success"){
          this.status = "error";
          console.log("Error:");
          console.log(response);
        }else{
          //this.listComments = response.data;
          //console.log(this.listComments);
          //this.comment.body = "";
        }
        this.loadingComments = 'hide';
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

  onSubmit(){
    this.token = this._loginService.getToken();
    this.loadingComments = 'show';

    this._commentService.create(this.token, this.comment).subscribe(
      response => {
        this.status = response.status;

        if(this.status != "Success"){
          this.status = "error";
          console.log("Error:");
          console.log(response);
        }else{
          console.log(this.comment);
          this.comment.body = "";
          this.getComments(this.comment.video_id);
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
