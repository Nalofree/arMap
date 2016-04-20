/* hint-sequence */

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
        	//alert(c.substring(name.length,c.length));
        	return c.substring(name.length,c.length);
        }
    }
    return "";
};
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


// var trigger = getCookie("hint");

// if (!trigger && ($(document).width() > 768)) {
// 	//alert(1);

// 	var enjoyhint_instance = new EnjoyHint({});

// 	var enjoyhint_script_steps = [
// 		{
// 			'next .b_filtr-first-block' : 'Задайте фильтр для поиска помещений',
// 			'nextButton' : {className: "myNext", text: "Далее"},
// 			//'skipButton' : {className: "mySkip", text: "Пропустить подсказки"},
// 			'showNext' : true,
// 			'showSkip' : false
// 		},
// 		{
// 			'click .b_filtr-button' : 'Нажмите применить',
// 			'nextButton' : {className: "myNext", text: "Далее"},
// 			//'skipButton' : {className: "mySkip", text: "Пропустить подсказки"},
// 			'showNext' : true,
// 			'showSkip' : false
// 		},
// 		{
// 			'next .ymaps-2-1-38-svg-icon' : 'На карте будут показаны результаты поиска',
// 			'nextButton' : {className: "myNext", text: "Далее"},
// 			//'skipButton' : {className: "mySkip", text: "Я всё знаю!"},
// 			'showNext' : true,
// 			'showSkip' : false
// 		},
// 		{
// 			'next .b_header-nav li:nth-child(2)' : 'Посмотрите все доступные объекты недвижимости',
// 			'nextButton' : {className: "myNext", text: "Спасибо!"},
// 			//'skipButton' : {className: "mySkip", text: "Я всё знаю!"},
// 			'showNext' : true,
// 			'showSkip' : false
// 		}
// 	];

// 	setCookie("hint", 'viewed', 500);

// 	enjoyhint_instance.set(enjoyhint_script_steps);

// 	enjoyhint_instance.run();

// }

$(".hint-trigger").click(function(){
	// setCookie("hint", 'viewed', 500);
	var trigger = getCookie("hint");

	var enjoyhint_instance = new EnjoyHint({});

	var enjoyhint_script_steps = [
		{
			'next .b_filtr-first-block' : 'Задайте фильтр для поиска помещений',
			'nextButton' : {className: "myNext", text: "Далее"},
			//'skipButton' : {className: "mySkip", text: "Пропустить подсказки"},
			'showNext' : true,
			'showSkip' : false
		},
		{
			'click .b_filtr-button' : 'Нажмите применить',
			'nextButton' : {className: "myNext", text: "Далее"},
			//'skipButton' : {className: "mySkip", text: "Пропустить подсказки"},
			'showNext' : true,
			'showSkip' : false
		},
		{
			'next .ymaps-2-1-38-svg-icon' : 'На карте будут показаны результаты поиска',
			'nextButton' : {className: "myNext", text: "Далее"},
			//'skipButton' : {className: "mySkip", text: "Я всё знаю!"},
			'showNext' : true,
			'showSkip' : false
		},
		{
			'next .b_header-nav li:nth-child(2)' : 'Посмотрите все доступные объекты недвижимости',
			'nextButton' : {className: "myNext", text: "Спасибо!"},
			//'skipButton' : {className: "mySkip", text: "Я всё знаю!"},
			'showNext' : true,
			'showSkip' : false
		}
	];

	enjoyhint_instance.set(enjoyhint_script_steps);
	enjoyhint_instance.run();
	//$(this).hide();
});

