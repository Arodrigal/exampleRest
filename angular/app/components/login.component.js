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
var router_1 = require("@angular/router");
var login_service_1 = require('../services/login.service');
var LoginComponent = (function () {
    function LoginComponent(_loginService, _route, _router) {
        this._loginService = _loginService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Identifícate";
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var logout = +params["id"];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                _this.identity = null;
                _this.token = null;
                window.location.href = "/login";
            }
        });
        this.user = {
            "email": "",
            "password": "",
            "gethash": "false"
        };
        this.identity = this._loginService.getIdentity();
        if (this.identity != null && this.identity.sub) {
            this._router.navigate(["/index"]);
        }
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.user);
        this._loginService.signup(this.user).subscribe(function (response) {
            console.log('Obtenido respuesta');
            _this.identity = response;
            console.log('Respuesta (' + _this.identity + ')');
            //this.token = response;
            if (_this.identity.length <= 0) {
                alert("Error en el servidor");
            }
            else {
                console.log('Que identity status ' + _this.identity.status);
                if (!_this.identity.status) {
                    localStorage.setItem('identity', JSON.stringify(_this.identity));
                    // GET TOKEN
                    _this.user.gethash = "true";
                    _this._loginService.signup(_this.user).subscribe(function (response) {
                        console.log('Obtenido respuesta de token');
                        _this.token = response;
                        if (_this.token.length <= 0) {
                            alert("Error en el servidor");
                        }
                        else {
                            if (!_this.token.status) {
                                localStorage.setItem('token', _this.token);
                                // REDIRECCIÓN
                                window.location.href = "/";
                            }
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert("Error en la petición");
                        }
                    });
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/view/login.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.ActivatedRoute, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map