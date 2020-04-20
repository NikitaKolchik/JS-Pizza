/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');




//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
function addToCart(pizza, size) {
    $("#norders").text(parseInt($("#norders").text()) + 1);

    var enable = false;
    //Додавання однієї піци в кошик покупок
    for(var i = 0; i < Cart.length; i++) {
        if(Cart[i].pizza.id == pizza.id && Cart[i].size == size) {
            Cart[i].quantity++;
            enable = true;
            break;
        }
    }
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!enable) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    //Оновити вміст кошика на сторінці
    $cart.html("");
    Cart.forEach(showOnePizzaInCart)
    updateLocalStorage($("#norders").text(), $("#total").text(), JSON.stringify(Cart));
}

function removeFromCart(cart_item) {
    var norders = $("#norders");

    var html_code = Templates.PizzaCart_OneItem(cart_item);
    norders.text(parseInt(norders.text()) - cart_item.quantity);

    var $node = $(html_code);
    //Видалити піцу з кошика
    updateLocalStorage(norders.text(), total.text(), JSON.stringify(Cart));


    $node.remove();
    return showOnePizzaInCart(Cart[Cart.length]);




    //Після видалення оновити відображення
}

function initialiseCart() {

    var total = localStorage.getItem("total");
    if (total) {
        Cart = JSON.parse(localStorage.getItem("cart"));
        $("#total").text(total);
        $("#norders").text(localStorage.getItem("norders"));
    }
    $cart.html("");
    Cart.forEach(showOnePizzaInCart);
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

//Функція викликається при зміні вмісту кошика
//Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

//Очищаємо старі піци в кошику


function showOnePizzaInCart(cart_item) {

    var html_code = Templates.PizzaCart_OneItem(cart_item);
    var node = $(Templates.PizzaCart_OneItem(cart_item));
    var norders = $("#norders");
    var $node = $(html_code);
    var total = $("#total");

    $node.find(".plus").click(function(){
        //Збільшуємо кількість замовлених піц
        total.text(parseInt(total.text()) + cart_item.pizza[cart_item.size].price);
        cart_item.quantity += 1;
        norders.text(parseInt(norders.text()) + 1);
        updateLocalStorage(norders.text(), total.text(), JSON.stringify(Cart));


        //Оновлюємо відображення
    });
    $node.find(".minus").click(function(){
        if(cart_item.quantity>1) {
            total.text(parseInt(total.text()) - cart_item.pizza[cart_item.size].price);
            norders.text(parseInt(norders.text()) - 1);
            updateLocalStorage(norders.text(), total.text(), JSON.stringify(Cart));

            //lesses кількість замовлених піц
            cart_item.quantity -= 1;
        }
        //Оновлюємо відображення
    });
    $node.find(".remove").click(function () {
        total.text(parseInt(total.text()) - cart_item.pizza[cart_item.size].price*cart_item.quantity);
        for(var i = 0;i<Cart.length; i++) {
            if (Cart[i] == cart_item) {
                $node.remove();
                Cart.splice(i, 1);
                removeFromCart(cart_item, node)
                norders.text(parseInt(0))



            }
        }



    })
    $(".clear-order").click(function () {
        Cart=[]
        $("#cart").html("");

        $(".make-order").css("opacity","0")
        total.text(parseInt(0))
        $("#norders").text(0);
        updateLocalStorage("0", "0", JSON.stringify(Cart));
    })
    $(".make-order").click(function () {
        updateLocalStorage($("#norders").text(), $("#total").text(), JSON.stringify(Cart));

        location.href = "order.html";
    })


    $cart.append($node);
    return node;
}



function updateLocalStorage(norders, total, Cart) {
    localStorage.setItem("norders", norders);
    localStorage.setItem("total", total);
    localStorage.setItem("cart", Cart);
}


exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;