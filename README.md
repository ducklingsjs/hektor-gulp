# hektor-gulp

Helpfull Esoteric Kind Tool Or Resource

Project scaffolding &amp; dev dependency manager tool

# Trying it out

Go to examples folder and see how to use hektor-gulp

## Available gulp tasks

* styles
  * subtasks
    * sass
    * autoprefixer
  * options
    * src (default: {app}/styles/main.scss)
    * includePaths (default: {app}/bower_components)
    * browsers (default: ['last 2 versions', 'ie 10'])
    * dest (default: .tmp/styles)
* scripts
  * subtasks
    * browserify
    * babelify
    * aliasify
    * hbsfy
  * options
    * src (default: {app}/scripts/main.js)
    * main (default: main.js)
    * babelify (default: { stage: 2 })
    * aliasify (default: {})
    * nodePath (default: process.env.NODE_PATH:./{app}/scripts)
    * dest (default: .tmp/scripts)
    * debug (default: false)
* connect (with livereload)
  * options
    * taskName (default: connect)
    * config (default: { root: ['.tmp', 'app'], port: 9100, livereload: { port: 10100 } })
* nodemon
  * options
    * config (default: { script: 'index.js', ext: 'js', ignore: [ '.tmp/**', paths.app + '/*', paths.dist + '/*', 'node_modules/*' ] })
* serve (with watch)
  * options
    * server (default: connect)
    * watch (default: { '{app}/styles/{,**/}*.scss': ['styles'], '{app}/scripts/{,**/}*.{js,hbs}': ['scripts'] })

## TODO

* stylecheck
  * jshint
  * jscs
* min
  * useminPrepare
  * usemin
  * imagemin
  * cssmin
  * htmlmin
* debowerify?
* copy
* zip
* ssh
* curl
* uglify
* replace
* exec