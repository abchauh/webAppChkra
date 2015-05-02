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
    name: "appChkra",
    version: "0.9.7",
    //baseUrl: "178.62.115.152", //baseUrl from your hosting IP address
       baseUrl: "localhost",
//    mongoUrl: 'mongodb://demo:demo@localhost:27017/meteoris', //mongoUrl from your hosting IP address
   // mongoUrl: "178.62.115.152:3001",
    activateMugen: true, //change to false on production
};


/**
 * Don't edit this if you don't know what exactly are you doing 
 */
UI.registerHelper('app', function(option, value) {
    return App[option];
});