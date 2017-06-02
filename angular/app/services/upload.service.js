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
var UploadService = (function () {
    function UploadService(_http) {
        this._http = _http;
    }
    UploadService.prototype.makeFileRequest = function (token, url, params, files) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            var progBar = document.getElementById("upload-progress-bar");
            var estadoProgBar = document.getElementById("status");
            var nameFileInput = params[0];
            for (var i = 0; i < files.length; i++) {
                formData.append(nameFileInput, files[i], files[i].name);
            }
            formData.append("authorization", token);
            xhr.onreadystatechange = function () {
                if (xhr.status == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            progBar.setAttribute("value", "0");
            progBar.style.width = "0%";
            xhr.upload.addEventListener("progress", function (event) {
                var percent = (event.loaded / event.total) * 100;
                var prc = Math.round(percent).toString();
                progBar.setAttribute("value", prc);
                progBar.style.width = prc + "%";
                estadoProgBar.innerHTML = Math.round(percent) + " % subido... cargando";
            }, false);
            xhr.addEventListener("load", function () {
                estadoProgBar.innerHTML = "Subida completada";
                var prc = "0";
                progBar.setAttribute("value", prc);
                progBar.setAttribute("aria-valuenow", prc);
                progBar.style.width = prc + "%";
            }, false);
            xhr.addEventListener("error", function () {
                estadoProgBar.innerHTML = "Error en la subida";
            }, false);
            xhr.addEventListener("abort", function () {
                estadoProgBar.innerHTML = "Subida abortada";
            }, false);
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    UploadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UploadService);
    return UploadService;
}());
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map