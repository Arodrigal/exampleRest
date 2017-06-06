"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_service_1 = require('../services/login.service');
var upload_service_1 = require('../services/upload.service');
var video_service_1 = require('../services/video.service');
var video_1 = require('../model/video');
var VideoNewComponent = (function () {
    function VideoNewComponent(_loginService, _uploadService, _videoService, _route, _router) {
        this._loginService = _loginService;
        this._uploadService = _uploadService;
        this._videoService = _videoService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Crear un nuevo video";
        this.uploadedImage = false;
        this.uploadedImage = false;
    }
    VideoNewComponent.prototype.ngOnInit = function () {
        /*let identity = this._loginService.getIdentity();
        this.identity = identity;
    
        if(identity == null){
          this._router.navigate(["/index"]);
        }else{
          this.user = new User(identity.sub,
              identity.role,
              identity.name,
              identity.surname,
              identity.email,
              identity.password,
              "null");
        }*/
        this.video = new video_1.Video(1, "", "", "public", "null", "null", null, null);
        console.log("Componente de nuevo video");
    };
    VideoNewComponent.prototype.callVideoStatus = function (value) {
        this.video.status = value;
    };
    VideoNewComponent.prototype.onSubmit = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._videoService.create(token, this.video).subscribe(function (response) {
            _this.status = response.status;
            if (_this.status != "Success") {
                _this.status = "error";
                console.log("Error:");
                console.log(response);
            }
            else {
                _this.video = response.data;
                console.log(_this.video);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    VideoNewComponent.prototype.fileChangeEventImage = function (fileInput) {
        var _this = this;
        this.filesToUpload = fileInput.target.files;
        var token = this._loginService.getToken();
        var url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php/video/upload-image/" + this.video.id;
        this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(function (result) {
            _this.resultUpload = result;
            _this.video.image = _this.resultUpload.filename;
            console.log(_this.video);
        }, function (error) {
            alert("Error");
            console.log(error);
        });
    };
    VideoNewComponent.prototype.nextUploadVideo = function () {
        console.log("Cambiado estado del uploadedImage");
        this.uploadedImage = true;
        console.log("Comprobacion ('+this.status+') ('+this.uploadedImage+')");
    };
    VideoNewComponent.prototype.fileChangeEventVideo = function (fileInput) {
        var _this = this;
        this.filesToUpload = fileInput.target.files;
        var token = this._loginService.getToken();
        var url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php/video/upload-video/" + this.video.id;
        this._uploadService.makeFileRequest(token, url, ['video'], this.filesToUpload).then(function (result) {
            _this.resultUpload = result;
            _this.video.videoPath = _this.resultUpload.filename;
            console.log(_this.video);
        }, function (error) {
            alert("Error");
            console.log(error);
        });
    };
    VideoNewComponent.prototype.redirectToVideo = function () {
        this._router.navigate(['/index']);
    };
    VideoNewComponent = __decorate([
        core_1.Component({
            selector: 'video-new',
            templateUrl: 'app/view/video.new.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, upload_service_1.UploadService, video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, upload_service_1.UploadService, video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
    ], VideoNewComponent);
    return VideoNewComponent;
}());
exports.VideoNewComponent = VideoNewComponent;
//# sourceMappingURL=video.new.component.js.map