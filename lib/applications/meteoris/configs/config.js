/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

/**
 * Edit this class value as you need
 */
App = {
    id: "73xWmYM6nKmMa5ERB",
    name: 'appChkra',
    description: 'A social media site for Chrities',
    author: 'a TechChap',
    email: 'padmin@chkra.co',
    website: 'http://chkra.co',
    version: "1.0",
    //    baseUrl: "http://128.199.173.212:3007", //baseUrl from your hosting IP address
 //   baseUrl: "https://appchkra-tgeeks.c9.io",
//    mongoUrl: 'mongodb://demo:demo@localhost:27017/meteoris', //mongoUrl from your hosting IP address
   // mongoUrl: 'mongodb://localhost:3001/meteor/',
    activateMugen: true, //change to false on production
};


/**
 * Don't edit this if you don't know what exactly are you doing 
 */
UI.registerHelper('app', function(option, value) {
    return App[option];
});