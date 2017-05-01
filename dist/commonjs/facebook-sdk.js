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
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_templating_1 = require("aurelia-templating");
var configure_1 = require("./configure");
var FB = (function () {
    function FB(config) {
        this._scriptPromise = null;
        this._config = config;
        this.initAPI();
    }
    FB.prototype.getScript = function () {
        if (this._scriptPromise !== null) {
            return this._scriptPromise;
        }
        if (window.FB === undefined) {
            var script_1 = document.createElement('script');
            script_1.type = 'text/javascript';
            script_1.async = true;
            script_1.defer = true;
            script_1.src = "//connect.facebook.net/" + this._config.get('lang') + "/sdk.js";
            document.body.appendChild(script_1);
            this._scriptPromise = new Promise(function (resolve, reject) {
                window.fbAsyncInit = function () {
                    resolve();
                };
                script_1.onerror = function (error) {
                    reject(error);
                };
            });
            return this._scriptPromise;
        }
        return false;
    };
    FB.prototype.initAPI = function () {
        var _this = this;
        this.getScript()
            .then(function () {
            _this._fb = window.FB;
            _this._fb.init({
                appId: _this._config.get('appId'),
                version: 'v2.9'
            });
        });
    };
    FB.prototype.getLoginStatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._fb.getLoginStatus(function (response) {
                resolve(response);
            });
        });
    };
    FB.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._fb.login(function (response) {
                if (response.authResponse) {
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }, {
                scope: 'public_profile,user_events'
            });
        });
    };
    return FB;
}());
FB = __decorate([
    aurelia_templating_1.noView(),
    aurelia_dependency_injection_1.inject(configure_1.Configure),
    __metadata("design:paramtypes", [Object])
], FB);
exports.FB = FB;
//# sourceMappingURL=facebook-sdk.js.map