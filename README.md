# http-request

This is an attempt to provide a simple interface for Angular's $http service that incorporates some features seen in other popular services.

## Get Started

**(1)** Get http-request:
 - clone this repository: `$ git clone git@github.com:Nate-McNeil/http-request.git`
 - or via **[Bower](http://bower.io/)**: by running `$ bower install http-request` from your console

**(2)** Include `http-request.[min.]js` in your `index.html`, after including Angular itself:
`<script src="bower_components/http-request/dist/http-request.[min.]js"></script>`

**(3)** Add `'http.request'` to your main module's list of dependencies: 
`angular.module('myApp', ['http.request'])`

**(4)** Inject `'HttpRequest'` to your controller's list of dependencies and start using it: 
`.controller('MyController, function(HttpRequest) { HttpRequest.get('someUrl').then(function() {}) });`
