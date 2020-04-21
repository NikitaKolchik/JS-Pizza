/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    var orderData = require('./pizza/orderData');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

   // orderData.initialiseMaps();
    orderData.checkData();


});