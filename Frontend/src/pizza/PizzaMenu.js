/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
            $(".make-order").css("opacity","1");


        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
            $(".make-order").css("opacity","1");

        });
        $(".filter-meat").click(function () {
                    filterPizza('М’ясна піца');
        })
        $(".filter-mushrooms").click(function () {
                filterPizza('mushroom');
        })
        $(".filter-pineapple").click(function () {
            filterPizza('pineapple');
        })
        $(".filter-seafood").click(function () {
            filterPizza('ocean');
        })
        $(".filter-vegan").click(function () {
            filterPizza('Вега піца');
        })

        $(".filter-all").click(function () {
            filterPizza('all');
        })


        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    var pizza_shown_new = []
    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
            if(pizza.type==filter){

                pizza_shown.push(pizza)
            }
            else if(pizza.content.mushroom && filter=='mushroom'){
                pizza_shown.push(pizza);
            }
            else if(pizza.content.pineapple && filter=='pineapple'){
                pizza_shown.push(pizza);
            }
            else if(pizza.content.ocean && filter=='ocean'){
                pizza_shown.push(pizza);
            }
            else if(pizza.id && filter=='all'){
                pizza_shown.push(pizza);
            }


    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
    pizza_shown=[]
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;