# SkSy2022


## Main technologies

This is a classic html project using bootstrap, which is imported via npm.
To build the project parcel is used.


## Code Structure

The actual code is in `/src`.
It's grouped into `index.html` as the source along with some other .html pages, a `js` folder and a `scss` folder. 
The latter two each contain a `main.js/scss`, which are used for importing the bootstrap package files from the `node_modules`, aswell as our own implementaions and style classes.
Within `/src/assets/scss/abstracts/_varibales.scss` you may override bootstraps sas configuration.


## Run/build the project

First in the root folder, you should run 
```
npm i
```
to install all required packages.

As found in the package.json the following commands are configured :

```
npm run dev     // start on localhost:1234 using parcel
npm run build   // build the project using parcel
```

Parcel is a dev dependency so it will not be part of the final build.
