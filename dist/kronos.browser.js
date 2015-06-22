(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Kronos = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function Kronos(obj) {
    return Kronos.create(obj);
}
var Kronos;
(function (Kronos) {
    Kronos.create = function (obj) {
        var promise = obj instanceof Promise ? obj : Promise.resolve(obj);
        var res = Object.create(promise);
        res.then = function (fn) {
            return Kronos.create(promise.then(fn));
        };
        res["catch"] = function (fn) {
            return Kronos.create(promise["catch"](fn));
        };
        Object.keys(Kronos).forEach(function (key) {
            res[key] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return Kronos.create(Kronos[key].apply(Kronos, [promise].concat(args)));
            };
        });
        return res;
    };
    Kronos.zip = function (promise, otherPromise) {
        return promise.then(function (value) {
            return otherPromise.then(function (otherValue) {
                return [value, otherValue];
            });
        });
    };
    Kronos.map = function (promise, mapFn) {
        return promise.then(mapFn);
    };
})(Kronos || (Kronos = {}));
module.exports = Kronos;

},{}]},{},[1])(1)
});