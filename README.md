gorillaseed
============

A simple seed project for a single page web app written with [**Angular**](https://angularjs.org/), [**Require**](http://requirejs.org/)
and [**SCSS**](http://sass-lang.com/) on the client side and [**Go**](http://golang.org/) with [**Gorilla Toolkit**](http://www.gorillatoolkit.org/)
on the server side. The seed project is configured as a true single page web app in that the build scripts will concat and minify all
the css and js files and then inline them into the index.html file. The seed project comes chock full with goodies:

* Automated build and testing tasks
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

5. Run the grunt tasks `buildServer` then `startDevServer`

6. Open a browser and navigate to `gorillaseed.net`, if you are looking at a web page with some buttons on, congratz everything worked.

##Common Tasks

There is a grunt task to cover all the basic requirements of development, run the following commands as `grunt <cmd>`:

* `buildServer` will build the server and copy the resulting server.exe to `build\server`
* **TODO** ~~`testServer` will run all the server unit tests and drop the results and coverage reports in `test\unit\server`~~
* `cleanServerBuild` will delete all generated files from running `buildServer`
* `cleanServerTest` will delete all generated files from running `testServer`


* `buildClient` will write the index.html file to `build\client` with the concatenated and minified css and js inlined and stripped of its AMD loading code
* `testClient` will run all the client unit tests and drop the results and coverage reports in `test\unit\client`
* `cleanClientBuild` will delete all generated files from running `buildClient`
* `cleanClientTest` will delete all generated files from running `testClient`


* `buildAll` is a convenience command for `buildServer` and `buildClient`
* `testAll` is a convenience command for `testServer` and `testClient`
* `cleanAllBuild` is a convenience command for `cleanServerBuild` and `cleanClientBuild`
* `cleanAllTest` is a convenience command for `cleanServerTest` and `cleanClientTest`


* **TODO** ~~`watchScss` will start compass auto compilation of all scss files in the `src\client` directory~~
* `cleanScss` will delete all **css** files in `src\client`


* `startDevServer` will start the `server.exe` in the `src\server` directory
* `startBuildServer` will start the `server.exe` in the `build\server` directory


* **TODO** ~~`testE2e` will run all the end to end tests and drop the results and coverage reports in `test\e2e`~~
* `cleanE2e` will delete all generated files from running `testE2e`


* `nuke` is a convenience command for `cleanAllBuild`, `cleanAllTest`, `cleanScss` and `cleanE2e`


