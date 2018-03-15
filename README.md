# EpiSense

## Prerequisites
In order to run this program, you need to have Node.js and NPM (Node Package Manager) installed. NPM is automatically installed when you install Node.js. You can install it from the following link:

Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Running the Server

1. Clone this repository to your machine. If you don't have git installed on your computer, you can download as a .zip file and unzip it to the directory of your choice.

2. Once you have the repository saved on your machine, run the following command:

   `npm install`

   This checks the dependencies stored in the `package.json` file and installs them. 

3. Once all the dependencies are installed, you can run it in two ways:

   ..* `nodemon server.js`

   nodemon is a package which automatically restarts the server when changes are saved. This is good for the development phase, and as such is stored as a `devDependency` in the `package.json` file.

   ..* `node server.js`

   This runs the server normally, and any changes to the source code requires you to restart the server.


And that's it! Thank you for using this application.
