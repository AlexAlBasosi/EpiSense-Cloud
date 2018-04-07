# EpiSense


## Prerequisites

1. In order to run this program, you need to have Node.js and NPM (Node Package Manager) installed. NPM is automatically installed when you install Node.js. You can install it from the following link:

Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

2. XAMPP (Cross Platform Apache, MySQL, Perl and PHP), sets up the MySQL server, which we will then use to import the SQL schema and set up the database.

XAMPP: [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)


## Setting up the Database

1. Clone this repository to your machine. If you don't have git installed on your computer, you can download as a .zip file and unzip it to the directory of your choice.

2. Install XAMPP onto your machine.

3. Once the XAMPP manager is up and running, start the Apache Web Server and MySQL database server. If the MySQL server doesn't run, select 'Configure' and change the port number to 3307.

4. Head your browser open to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)

5. In the left bar, select 'New'.

6. Select 'Import'.

7. Select 'Browse'.

8. Find the directory where you installed this repository, then select Databases/episense.sql


## Running the Server


1. Once you have the repository saved on your machine, run the following command:

   `npm install`

   This checks the dependencies stored in the `package.json` file and installs them. 

2. Once all the dependencies are installed, you can run it in two ways:

    * `nodemon server.js`

        nodemon is a package which automatically restarts the server when changes are saved. This is good for the development phase, and as such is stored as a `devDependency` in the `package.json` file.
   
   * `node server.js`

        This runs the server normally, and any changes to the source code requires you to restart the server.



And that's it! The Mobile Application and Machine Learning components are coming soon.
