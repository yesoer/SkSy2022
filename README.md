# SkSy2022

A simple todo app for the course Scalable Systems.

## Main technologies


The frontend is classic html,js,(s)css using [bootstrap](https://getbootstrap.com/), which is imported via npm.
To build the it parcel is used.

The backend is built using Go with the [gin](https://github.com/gin-gonic/gin) webframework.


## Code Structure

There is a folder for the frontend and a separate one for the backend

**Frontend :**
The actual code is in `/src`.
It's grouped into `index.html` as the source along with some other .html pages, a `js` folder and a `scss` folder. 
The latter two each contain a `main.js/scss`, which are used for importing the bootstrap package files from the `node_modules`, aswell as our own implementaions and style classes.
Within `/src/assets/scss/abstracts/_varibales.scss` you may override bootstraps sas configuration.


**Backend :**
There are the classic `go.mod` and `go.sum` files that a go module contains. 
Furthermore there is the `main.go` containing the code that sets up and starts the router (currently the default router) that makes up the server.

To avoid confusion (because right now this design principle isn't used in any pratical way), instead of writing handlers, we write functions that return handlers.
The idea is that any setup code for that specific route can be run before the actual handler is returned. 
This way it's executed exactly once and clearly distinguishable from any other (setup) code.

## Running/building

**Frontend :**
First in the frontend folder, you should run 
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

**Backend :**

Run the server using the go tools :
```
go run main.go
```
It will start on localhost, port 8080.