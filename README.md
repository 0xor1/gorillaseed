gorillaseed
============

A simple seed project for a single page web app written with [**Angular**](https://angularjs.org/), [**Require**](http://requirejs.org/)
and [**SCSS**](http://sass-lang.com/) on the client side and [**Go**](http://golang.org/) with [**Gorilla Toolkit**](http://www.gorillatoolkit.org/)
on the server side. The seed project comes chock full with goodies:

* Automated build tasks
* Server side unit tests
* Client side unit tests
* End-to-End tests

##Setup Checklist

1. Install:
    * [Go](http://golang.org/)
    * [Node](https://nodejs.org/)
    * [Ruby](https://www.ruby-lang.org)
        * [Compass](http://compass-style.org/)

2. Create the directory `$GOPATH/github.com/0xor1/gorillaseed` and check this repo out into it

3. `cd` to `$GOPATH/github.com/0xor1/gorillaseed` and run:
    ```sh
        npm install
        npm install -g grunt-cli
    ```

4. Local request redirection is required, for local development, ([Fiddler](http://www.telerik.com/fiddler) is a good tool for this) to send `gorillaseed.net` to `127.0.0.1:8080`

##Common Tasks

There is a grunt task to cover all the basic requirements of development, run the following commands as `grunt <cmd>`:

* `buildServer` will build the server and copy the resulting server.exe to `build\server`
* `buildClient` will write the index.html file to `build\client` with the compiled and minified js inlined and stripped of its amd loading code
* `buildAll` is a convenience command that simply chains the above commands.

...More coming soon...
