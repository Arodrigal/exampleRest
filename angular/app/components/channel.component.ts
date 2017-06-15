import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import {LoginService} from "../services/login.service";
import {VideoService} from "../services/video.service";

@Component({
    selector: 'channel',
    templateUrl: 'app/view/channel.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, VideoService]
})

// Clase del componente donde irán los datos y funcionalidades
export class ChannelComponent {
  public titulo = "Canal";
  public errorMessage;
  public status;
  public identity;
  public videos;
  public loading;
  public userChannel;
  public pages;
  public pagePrev = 1;
  public pageNext = 1;

  constructor(
    private _loginService: LoginService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this.identity = this._loginService.getIdentity();
    this.getChannelVideos();
  }

  getChannelVideos(){
    this.loading = "show";

    this._route.params.subscribe(params =>{

      let user:any = params["user"];
      if(!user){
        user = this.identity.sub;
      }

      let page:any = +params["page"];
      if(!page){
        page = 1;
      }

      this._videoService.getChannel(user, page).subscribe(
        response => {
          this.status = response.status;

          if(this.status != "Success"){
            this.status = "Error";
          }else{
            this.videos = response.data.videos;
            console.log(this.videos);
            this.userChannel = response.data.user;
            console.log(this.userChannel);

            this.pages = [];
            for(let i=0; i < response.total_pages; i++){
              this.pages.push(i);
            }

            if(page > 1){
              this.pagePrev = (page - 1);
            }else{
              this.pagePrev = page;
            }

            if(page < response.total_pages || page == 1){
              this.pageNext = (page + 1);
            }else{
              this.pageNext = page;
            }
          }
          this.loading = "hide";
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
