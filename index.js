/**
* created by Hemadri Dasari on 04/06/2018
*/

//Initialize global variables here
global.config = require("config");

const getPopulation = require('./controller/Population');

getPopulation();

//Trigger manual GC every 3 hours 
let runGC = function(){
  if(global.gc){
    console.log("Garbage Collection is available");
    global.gc();
  }else{
    console.log("Garbage Collection unavailable");
  }
}

let intVar = setInterval(runGC, config.app.gcInterval);


