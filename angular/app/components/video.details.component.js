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
var video_service_1 = require('../services/video.service');
var generate_date_pipe_1 = require("../pipes/generate.date.pipe");
var comments_component_1 = require("./comments.component");
var VideoDetailsComponent = (function () {
    function VideoDetailsComponent(_loginService, _videoService, _route, _router) {
        this._loginService = _loginService;
        this._videoService = _videoService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Detalle de video";
        this.loading = 'show';
    }
    VideoDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.identity = this._loginService.getIdentity();
        this._route.params.subscribe(function (params) {
            _this.loading = 'show';
            var id = params["id"];
            _this._videoService.getVideo(id).subscribe(function (response) {
                _this.status = response.status;
                if (_this.status != "Success") {
                    _this._router.navigate(["/index"]);
                }
                else {
                    _this.video = response.data;
                    console.log(_this.video);
                }
                _this.loading = 'hide';
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
            _this._videoService.getLastVideos().subscribe(function (response) {
                _this.status = response.status;
                console.log("Estado: " + _this.status);
                if (_this.status != "Success") {
                    _this._router.navigate(["/index"]);
                }
                else {
                    _this.lastVideos = response.data;
                    console.log(_this.lastVideos);
                }
                _this.loading = 'hide';
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    VideoDetailsComponent = __decorate([
        core_1.Component({
            selector: 'video-details',
            templateUrl: 'app/view/video.details.html',
            directives: [router_1.ROUTER_DIRECTIVES, comments_component_1.CommentsComponent],
            providers: [login_service_1.LoginService, video_service_1.VideoService],
            pipes: [generate_date_pipe_1.GenerateDatePipe]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
    ], VideoDetailsComponent);
    return VideoDetailsComponent;
}());
exports.VideoDetailsComponent = VideoDetailsComponent;
//# sourceMappingURL=video.details.component.js.map