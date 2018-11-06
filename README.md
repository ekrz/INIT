# INIT 0.5.0

###### a project by Emmanuel Kerjan Retzepter

**INIT** is a boilerplate generator to help you starting templating fast.

It uses Gulp, Bootstrap 4, Sass and Nunjucks engine. This whole project has been built with flexibility in mind so it adapts itself very well to any kind of dev environnement and for various purposes (process SCSS, process NJK templates, optimize images, compress Javascript, compress styles, Hotreload, etc).

## Getting Started

These instructions will help you to get the most of **INIT**.

### Clone INIT

```
> git clone https://github.com/ekrz/init-ekrz.git {your-project}
> cd {your-project}
```

### Install the modules

```
> npm i
```

### Run Gulp (default)

```
> gulp
```

This will run the default tasks, allowing you to set up a local server and enabling BrowserSync.

Once you're happy to launch your styles and scripts on a live site, it is preferable that you run the second set of tasks from **INIT** : build.

```
> gulp build
```

This will remove the source-maps, decrease the size files, allow image optimisation, generate the critical CSS, etc.

## Advanced utilisation and customisation

**INIT** being built to be flexible means you can remove/add tasks or functionalities to your project, if needed.

### BrowserSync proxy

If you work locally on your project but also need to serve your files on a distant server, you might need to activate BrowserSync proxy to enjoy hot reload and others.

To do so, comment out the server element for the proxy option in /gulp/base/connect.js :

```
var  serverConfig  =  {
	//server:  {
	//	baseDir:  path.to.destination
	//},
	proxy: 'http://site.com'
	port:  9000,
	open:  false
};
```

### Serve output to a distant server

You might need to upload your styling or scripts on a distant server, in combination with the BrowserSync proxy configuration.

To do so, you will need to edit the paths in /gulp/paths.js and in the relative tasks.

## **INIT** Architecture and rules

#### Modules

Try to keep the project linked with nodeJS. Do not load external elements, like plugins that couldn't be properly maintained.

Prefer using npm and its huge library to keep your dependencies up to date.

> Example : If you need to include slick carousel, use https://www.npmjs.com/package/slick-carousel instead of an external dependency.

#### Styles

**INIT** uses Sass, and an architecture inspired by ITCSS (https://itcss.io/), allowing scalability and a great maintenance of your project on the long run.

> That be said, you can more or less adapt your styling structure to what your project actually requests.
> Example : not every project will need an "object" section.

#### Nunjucks

With the help of Nunjucks, you will be able to deploy your templates faster and unlock new levels of collaboration.

> You can easily share, reuse and maintain components structure with Nunjucks. On the long term, you could have a shareable library available for your team.

#### JavaScript

**INIT** uses jQuery and Bootstrap 4 Javascript.
You can write your custom JavaScript under /js/site.js. This will automatically compile with the two formers libraries to an unique and minified JavaScript file.

## Built With

- [Bootstrap 4](https://github.com/twbs/bootstrap) – The most popular framework for developing projects.

- [Gulp](https://github.com/gulpjs/gulp) – The streaming build system.

- [Nunjucks](https://mozilla.github.io/nunjucks/) – A rich and powerful templating language for JavaScript.

- [Sass](https://github.com/sass/sass) – Sass makes CSS fun again.

- [BrowserSync](https://browsersync.io/) – Time-saving synchronised browser testing.

## Authors

- **Emmanuel Kerjan Retzepter** – [Github](https://github.com/ekrz), [Twitter](https://twitter.com/ekrzzz)

## License

> This project is licensed under the MIT License.
