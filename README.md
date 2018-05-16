# Image Processing Web App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find information on how to perform common tasks.

## Table of Contents

- [Intro](#intro)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm install](#npm-install)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Supported Browsers](#supported-browsers)
- [Using the public folder](#using-the-public-folder)
- [Bugs](#bugs)

## Intro
This web app combines various image processing techniques like filtering, image segmentation, convolution and point processing methods. The app is written in JavaScript and compiled using [React](https://reactjs.org/) and [Redux](https://redux.js.org/). 

## Installation
To build and compile this web app [NodeJS](https://nodejs.org/en/) version 8 or later is required. NodeJS can be installed from [here](https://nodejs.org/en/download/) for all platforms.
<br>
<br>
After installation issue the following command in your terminal:
```
npm install -g serve
```
This will install a NodeJs module which can serve your app. Now, naviagate to the root directory of the project and with your terminal issue the command:
```
serve build
```
This will create a Node server and serve the web app on [localhost](http://localhost:3000). Navigate to [http://localhost:3000](http://localhost:3000) on your favourite web browser to see the web app in action.

## Folder Structure

After creation and installing the dependencies the project should look like this:

```
image-processing/
    README.md
    node_modules/
    package.json
    build/
    public/
        index.html
        favicon.ico
        manifest.json
        images/
            coins.png
            sea.png
            sea2.png
    src/
        Functions/
        redux/
        ui/
        App.js
        index.js
        registerServiceWorker.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Using the `public` Folder

>Note: this feature is available with `react-scripts@0.5.0` and higher.

### Changing the HTML

The `public` folder contains the HTML file so you can tweak it, for example, to [set the page title](#changing-the-page-title).
The `<script>` tag with the compiled code will be added to it automatically during the build process.

### Adding Assets Outside of the Module System

The public folder includes the images that are going to be processed by the web app.

## Bugs

One bug that is immidiately noticable is the `upload` feature. For some reason, the canvas (which is the component that maipulates the image) doesn;t render properly when it's updated with a new image. To use a new image, you have to put it in the `images` folder located in the `public` folder, rename it to `coins.png` and restart the server.
<br>