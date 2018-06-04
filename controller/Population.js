/**
* created by Hemadri Dasari on 04/06/2018
*/

const express = require('express'),
      async = require('async');
      Client = require('node-rest-client').Client;

let client = new Client();

function getPopulation(){
  let countries = process.argv.slice(2);
  if(countries && countries.length > 0){
    let array = [];     
    async.each(countries, function(country, callback) {
      let obj = {};
      if( country == null || country == "" || typeof country == undefined) {
        console.log('Country is invalid');
        callback('Country is invalid');
      } else {
        let data = getPopulationByCurrentDate(country).then((data) => {
          console.log(`Population retrieved successfull for todays date for the country: ${country}`, data);
          obj["country"] = country;
          obj["population"] = data.total_population.population;
          array.push(obj);
          callback();
        });
      }
    }, function(err, results) {
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('There was an error while fetching population. please try again');
        } else {
          let data = array.sort(sortCountriesByPopulation);
          console.log('Please find countries wise population below');
          data.map((d, i) => {
            console.log(`${d.country} : ${d.population}`);
          });
        }
    });
  }
}

function getCurrentTime(){
  //instantiate Date with new keyword 
  let today = new Date();
  //get todays date
  let date = today.getDate();
  //get current month
  let month = today.getMonth()+1;
  //get current year
  let year = today.getFullYear();
  if(date<10){
    date='0'+date;
  } 
  if(month<10){
    month='0'+month;
  } 
  let currentDate = year+'-'+month+'-'+date;
  return currentDate;
}

function getPopulationByCurrentDate(country) {
  //call getCurrentTime function to get todays date in YYYY-MM-DD format
  const currentDate = getCurrentTime();
  //Prepare end point with country and currentdate as request params 
  let url = `${config.apiURL}${country}/${currentDate}`;
  return new Promise((resolve, reject) => {
    //use node-rest-client library to get the api response
    client.get(url, (data, res) => {
      resolve(data);
    }).on('error', (err) => reject(err));
  });
}

function sortCountriesByPopulation(a,b) {
  if (a.population > b.population)
    return -1;
  if (a.population < b.population)
    return 1;
  return 0;
}

module.exports = getPopulation;