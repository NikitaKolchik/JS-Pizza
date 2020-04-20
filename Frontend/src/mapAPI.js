
function	initMap()	{
//Тут починаємо працювати з картою
    var mapProp =	{
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom:	11
    };
    var html_element =	document.getElementById("map");
    var map	=	new	google.maps.Map(html_element,	 mapProp);
//Карта створена і показана
}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window,	 'load',	initMap);




LiqPayCheckout.init({
    data:	"Дані...",
    signature:	"Підпис...",
    embedTo:	"#liqpay",
    mode:	"popup"	//	embed	||	popup
}).on("liqpay.callback",	function(data){
    console.log(data.status);
    console.log(data);
}).on("liqpay.ready",	function(data){
//	ready
}).on("liqpay.close",	function(data){
//	close
});

var order	=	{
    version:	3,
    public_key:	'sandbox_i50705553059',
    action:	"pay",
    amount:	568.00,
    currency:	"UAH",
    description:	"Опис транзакції",
    order_id:	Math.random(),
//!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
    sandbox:	1
};
var data	=	base64(JSON.stringify(order));
var signature	=	sha1('sandbox_5r6nidnKyIkNgzINYwlKUdtieOkHfGJvoo42praT'	+	data	+	'sandbox_5r6nidnKyIkNgzINYwlKUdtieOkHfGJvoo42praT');