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

    var enable = false;
    //Додавання однієї піци в кошик покупок
    for(var i = 0; i < Cart.length; i++) {
        if(Cart[i].pizza.id == pizza.id && Cart[i].size == size) {
            ++Cart[i].quantity;
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
   // var order = $cartup.find(".orange-icon").text();
    //var price = $cartup.find(".text-price2").text();
    //order = parseInt(order)+1;


  //  if(size == "small_size")
       // price = parseInt(price) + parseInt(pizza.small_size.price);
   // else
     //   price = parseInt(price) + parseInt(pizza.big_size.price);

  //  $(".orange-icon").text(order);
   // $cartup.find(".text-price2").text(price);

    //$("#button-buy").css("opacity",  "1");
    //$("#button-buy").css("pointer-events", "all");
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    var html_code = Templates.PizzaCart_OneItem(cart_item);

    var $node = $(html_code);
    //Видалити піцу з кошика


     $node.remove();




    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...


    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {

        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            if(cart_item.quantity>1) {
                //lesses кількість замовлених піц
                cart_item.quantity -= 1;
            }
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".remove").click(function () {
            var new_Cart=[]
            for(var i = 0;i<Cart.length; i++) {
                if (Cart[i] == cart_item) {

                    $node.remove();
                    Cart.splice(i, 1);


                }
            }
            updateCart();

        })
        $(".clear-order").click(function () {
            Cart=[]
            $(".make-order").css("opacity","0")
            updateCart()
        })

            $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;