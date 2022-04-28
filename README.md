# SkSy2022


## Main technologies

This is a classic html project using bootstrap, which is imported via npm.
To build the project parcel is used.


## Code Structure

The actual code is in `/src`.
It's grouped into `index.html` as the source, a `js` folder and a `scss` folder. 
The latter two each contain a `bootstrap.js/scss`, which are used for importing the corresponding files from the `node_modules`, aswell as a `main.js/scss` containing our own implementaions and style classes.
Within `/src/assets/scss/abstracts/_varibales.scss` you may override bootstraps sas configuration.


## Run/build the project

As found in the package.json the following commands are configured :

```
npm run dev     // start on localhost:1234 using parcel
npm run build   // build the project using parcel
```

Parcel is a dev dependency so it will not be part of the final build.
