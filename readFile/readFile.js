const express = require('express')
var md5File = require('md5-file');
var fs = require('fs');
const app = express()


fs.watch('../MLModel/FINALOUTPUT2.csv', 'utf8', function(event, file){

    fs.readFile('../MLModel/FINALOUTPUT2.csv', 'utf8', function(error, data){
        if(error){
            console.log('Could not read file.');
        } else {
           var array = Array.from(data.split(','));
           console.log(array);
        }
    });
});


// fs.writeFile("./hash", md5File.sync('../MLModel/FINALOUTPUT2.csv'), function(err) {
//     if(err) {
//         return console.log(err);
//     }
// });

// var newHash;

//     newHash = md5File.sync('../MLModel/FINALOUTPUT2.csv');

//     console.log("new hash: " + newHash);

//     fs.readFile('./hash', 'utf8', function(error, data){
//         if(error){
//             console.log('Could not read file.');
//         } else {
//             console.log("Hash from file: " + data);
//         }
//     });


    // console.log("New hash: " + hash);
    // if(newHash != hash){
    //     hash = newHash;

    

    // var lineReader = require('readline').createInterface({
    //     input: require('fs').createReadStream('../MLModel/FINALOUTPUT2.csv')
    // });

    // lineReader.on('line', function (error, line) {
    //     console.log(line);
    // });




app.listen(3002, () => console.log('Example app listening on port 3002!'))