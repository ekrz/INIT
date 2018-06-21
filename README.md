# init-ekrz 2.4.0

Generate a bootstrap 4 Sass ready project with Nunjucks templating engine. Powered by Gulp.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Clone and go

> To start init, you must have nodeJS (+ npm/yarn) and gulp installed on your machine.
```
> git clone https://github.com/ekrz/init-ekrz.git {your-project}
> cd {your-project}
> npm i
> gulp
```

### Architecture and rules

#### modules
> Try to keep the project linked with nodeJS. Do not load external elements, like plugins that couldn't be properly maintained. Prefer to use npm and its huge library to keep your dependencies up to date.

#### Styles
> The whole architecture is based on ITCSS to allow a great control on the long-run of your project.

#### Nunjucks
> Use Nunjucks to split your markup code, and unlock great functionalities. This will save you precious time and allow eventual collaborators to take on your project faster.

#### JavaScript
> This project use bootstrap 4 and jQuery. Write your JavaScript within /js/site.js, it will automatically compile with jQuery and Boostrap on the output (in a minified version).


## Built With

* [Bootstrap 4](https://github.com/twbs/bootstrap) - The most popular framework for developing projects.
* [Gulp](https://github.com/gulpjs/gulp) - The streaming build system.
* [Nunjucks](https://mozilla.github.io/nunjucks/) - A rich and powerful templating language for JavaScript.
* [Sass](https://github.com/sass/sass) - Sass makes CSS fun again.


## Authors

* **Emmanuel K. Retzepter** - *Initial work* - [ekrz](https://github.com/ekrz)


## License

> This project is licensed under the MIT License.

## Acknowledgments

> Hat tip to anyone who's code was used
