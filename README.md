# hektor-gulp

Helpful Esoteric Kind Tool Or Resource

Project scaffolding &amp; dev dependency manager tool

To install, run: ``npm install git@github.com:infinumjs/hektor-gulp.git --save-dev``

# Trying it out

Go to examples folder and see how to use hektor-gulp

## Autoload tasks
The second argument in the HEKTOR's ``load`` method is autoload. When turned on, HEKTOR will try to guess which task do you want to run, and load it with default settings, even if it's not defined in the config. This can be useful in order to avoid task definitions with empty config objects.
This is an experimental feature.

## Available gulp tasks

Documented in [hektor-docs](https://github.com/infinumjs/hektor-docs)

* styles
* scripts
* connect
* nodemon
* serve
* minify
* clean
* exec
* plato

## TODO

* codeformat
  * csscomb
  * jsformat
* minify
  * imagemin
* deploy
  * zip
  * ssh
  * curl
* build
  * copy
  * replace
  * rev
