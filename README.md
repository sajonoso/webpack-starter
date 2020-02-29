# Webpack starter

A simple template for a webpack project.   For creating a single page HTML application that will bundle your JavaScript code into a single file

## Setup

Download repository.  Set the application name in the `run` script defined by the variable APP_NAME, then execute in the project root:
`./run setup`

## Development Build

Typing `./run serve` will start up a web server at http://localhost:3000 showing the index.html page and any files defined in the `./static` folder.

Changes to the code in `src/index.js` and any imported files will automatically rebuild the JavaScript bundle

## Production Build

Type `./run prod` to build a production version of your application and run it with a webserver at http://localhost:3000
