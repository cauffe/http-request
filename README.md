# http-request

This is an attempt to provide a simple interface for Angular's $http service that incorporates some features seen in other popular services.

## Get Started

**(1)** Get http-request:
 - clone this repository: `$ git clone git@github.com:Nate-McNeil/http-request.git`
 - or via **[Bower](http://bower.io/)**: by running `$ bower install http-request` from your console

**(2)** Include `http-request.js` in your `index.html`, after including Angular itself:
`<script src="bower_components/http-request/dist/http-request.js"></script>`

**(3)** Add `'http.request'` to your main module's list of dependencies: 
`angular.module('myApp', ['http.request'])`
