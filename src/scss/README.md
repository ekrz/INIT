# INIT – Sass


##ITCSS

###Settings
Used with preprocessors and contain font, colors definitions, etc.

###Tools
Globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.

###Generic
Reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.

###Elements
Styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.

###Objects
Class-based selectors which define undecorated design patterns, for example media object known from OOCSS

###Components
Specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components

###Utilities
Utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class

###Vendors
This folder contains third-party styling that can’t be imported directly in main.scss. Elements there will always be excluded from the build. e.g. the gulp fontello task download .css elements, store them under /vendors/fontello/. Then it takes the most important styling file, rename it (.scss) and place it under /settings/fontello/ where this file can now be injected in the build.


##Main.scss
This is where we prepare our Sass compilation. We construct our custom bootstrap from there as well. 

