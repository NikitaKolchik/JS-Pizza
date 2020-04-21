const API = require('../api.js');
const Cart = require('./PizzaCart');
var $cart = $('#cart');


var  private_key = 'sandbox_5r6nidnKyIkNgzINYwlKUdtieOkHfGJvoo42praT'
var public_key = 'sandbox_i50705553059'




function checkData() {
    let validNum = false,
        validName = false,
        validAddress = false;
    let numberPattern = /^(\+380|0)\d{9}$/;
    $('#inputPhone').on('keyup', (function () {
        if (numberPattern.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validNum = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validNum = false;
        }
    }));
    let namePatter = /[a-zA-Zа-яіїєґА-ЯІЇЄҐ]/;
    $('#inputName').on('keyup', function () {
        if (namePatter.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validName = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validName = false;
        }
    });
    let addressPatter = /[a-zA-Zа-яіїєґА-ЯІЇЄҐ]/;
    $('#inputAddress').on('keyup', function () {
        if (addressPatter.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validAddress = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validAddress = false;
        }
    });
    $('#inputAddress').on('click', function () {
        if (addressPatter.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validAddress = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validAddress = false;
        }
    });
    $('.accept-button').click(function () {
        $('#liqpay').css('display', 'block');
        var name = $('input.name').val();
        var address = $('input.address').val();
        var number = $('input.phone').val();
        var orders = JSON.parse(localStorage.getItem('cart'))
        var pizza = [];
        var name_pizza;
        var count;
        var price = 0;
        var current_price;

        for (var i = 0; i < orders.length; i++) {
            name_pizza = orders[i].pizza.title;
            if (orders[i].size === 'big_size') {
                size = 'Велика';
            } else {
                size = 'Мала';
            }
            count = orders[i].quantity;
            current_price = orders[i].price;
            var pizza_info = {
                name_pizza: name_pizza,
                size: size,
                quantity: count,
                price: current_price
            };
            price += orders[i].price;
            pizza.push(pizza_info);
        }
        var order_info = {
            name: name,
            address: address,
            phone: number,
            pizza: pizza,
            price: price
        };
        if (!validName)
            $("#inputName").removeClass('is-invalid').addClass('is-invalid');
        if (!validNum)
            $("#inputPhone").removeClass('is-invalid').addClass('is-invalid');
        if (!validAddress)
            $("#inputAddress").removeClass('is-invalid').addClass('is-invalid');
        if (!(validNum && validName && validAddress))
            alert('Введіть валідні данні')

        else {

            API.createOrder(order_info, function (err, data) {
                if (!err) {
                    LiqPayCheckout.init({
                        data: data.data,
                        signature: data.signature,
                        embedTo: "#liqpay",
                        mode: "embed",
                    }).on("liqpay.callback", function(data){
                        console.log(data.status);
                        console.log(data);
                        alert('Оплата пройшла успішно. Очікуйте доставку.');
                       // $('.contact-form').css('display', 'block');
                        $('#map').css('display', 'block');

                    }).on("liqpay.ready", function(data){
                    }).on("liqpay.close", function(data){
                    });
                }

                else {
                    alert('Неправильно введені дані!');
                }
            });


        }
    });
}

exports.checkData = checkData