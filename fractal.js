'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'INIT Component Library');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/templates/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

fractal.web.set('static.path', __dirname + '/dist');
// register the Nunjucks adapter for your components
fractal.components.engine('@frctl/nunjucks');

 // look for files with a .nunj file extension
fractal.components.set('ext', '.njk');