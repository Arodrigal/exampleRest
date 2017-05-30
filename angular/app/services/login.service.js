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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var LoginService = (function () {
    function LoginService(_http) {
        this._http = _http;
        //public url = "http://localhost/cursoMS/symfony/web/app_dev.php";
        this.url = "http://127.0.0.1:8888/cursoMS/symfony/web/app_dev.php";
    }
    LoginService.prototype.signup = function (userLogin) {
        var json = JSON.stringify(userLogin);
        var params = "json=" + json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/login", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.getIdentity = function () {
        if (JSON.parse(localStorage.getItem('identity')) != "undefined") {
            this.identity = JSON.parse(localStorage.getItem('identity'));
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    LoginService.prototype.getToken = function () {
        if (localStorage.getItem('token') != "undefined") {
            this.token = localStorage.getItem('token');
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map