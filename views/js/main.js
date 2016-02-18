
if ($(".b_filtr").length) {
var slider = document.getElementById('square_slider');

noUiSlider.create(slider, {
	start: [ 100, 700 ], // Handle start position
	step: 10, // Slider moves in increments of '10'
	margin: 20, // Handles must be more than '20' apart
	connect: true, // Display a colored bar between the handles
	//direction: 'rtl', // Put '0' at the bottom of the slider
	// orientation: 'horisontal', // Orient the slider vertically
	behaviour: 'tap-drag', // Move handle on tap, bar is draggable
	range: { // Slider can select '0' to '100'
		'min': 0,
		'max': 1000
	},
	pips: { // Show a scale with the slider
		mode: 'steps',
		density: 100
	}
});


var slider1 = document.getElementById('price_slider');

noUiSlider.create(slider1, {
	start: [ 660, 1660 ], // Handle start position
	step: 10, // Slider moves in increments of '10'
	margin: 20, // Handles must be more than '20' apart
	connect: true, // Display a colored bar between the handles
	//direction: 'rtl', // Put '0' at the bottom of the slider
	// orientation: 'horisontal', // Orient the slider vertically
	behaviour: 'tap-drag', // Move handle on tap, bar is draggable
	range: { // Slider can select '0' to '100'
		'min': 0,
		'max': 2000
	},
	pips: { // Show a scale with the slider
		mode: 'steps',
		density: 100
	}
});


var points, sliderItem, sliderId;

};

function setSliderSpans(sliderId, sliderItem, points){
	var handleLower = $("#" + sliderId + " .noUi-handle-lower span"),
		handleUpper = $("#" + sliderId + " .noUi-handle-upper span"),
		values = sliderItem.noUiSlider.get();
		handleUpper.html(parseInt(values[1])+points);
		handleLower.html(parseInt(values[0])+points);
}

$(document).ready(function(){
	$(".b_header-info").click(function(){
		if ($(".b_header-info").hasClass("active")) {
			$(".b_header-info").animate({"margin-left":"-200"},300);
			/*$(".b_header-info a").hide();*/
			$(this).removeClass("active");
			$("footer.search").show();
		}else{
			$(".b_header-info").animate({"margin-left":"0"},300);
			/*$(".b_header-info a").show();*/
			$(this).addClass("active");
		};
	});
	$(".b_header-info-mobile").click(function(){
		$("footer.search").show();
	});

	$(".close-footer").click(function(){
		$("footer.search").hide();
	});

	if ($(".b_filtr").length) {
		$(".noUi-handle").append("<span></span>");
		setSliderSpans("square_slider", slider, "м<sup>2</sup>");
		setSliderSpans("price_slider", slider1, "р");
	};

	$(".navtrigger").click(function(){
		if ($(this).hasClass("active")) {
			$(".b_header-nav ul").hide();
			$(this).removeClass("active");
		}else{
			$(".b_header-nav ul").css('display', 'flex');
			$(this).addClass("active");
		};
	});

	$(".b_filtr-trigger").click(function(){
		if ($(this).hasClass("active")) {
			$(".b_filtr").hide();
			$(this).removeClass("active");
			$(this).text("показать фильтр");
		}else{
			$(".b_filtr").show();
			$(this).addClass("active");
			$(this).text("скрыть фильтр");
		};
	});

	$(".bmark-trigger").click(function(){
		if ($(this).hasClass("added")) {
			$(this).removeClass("added");
			$(this).attr("data-title","Добавить в закладки");
		}else{
			$(this).addClass("added");
			$(this).attr("data-title","Удалить из закладок");
		};
	});

	$(".b_office_params-callback-container").click(function(){
		if ($(this).hasClass("active")) {
			$(".b_office_params-callback-form").hide();
			$(this).removeClass("active");
			$(".likeas-container").css("margin-left","380px");
		}else{
			$(".b_office_params-callback-form").show();
			$(this).addClass("active");
			$(".likeas-container").css("margin-left","40px");
		};
	});

	$(".slide-item").click(function(){
		var imgSrc;
		imgSrc = $(this).children("img").attr("src");
		$(".slide-item").removeClass("active");
		$(this).addClass("active");
		$(".slide img").attr("src", imgSrc);
	});
	
	$(".top-trigger").click(function(){
		$(".slide-item.active").prev(".slide-item").addClass("active");
	});

	$(".bottom-trigger").click(function(){
		$(".slide-item.active").next(".slide-item").addClass("active");
		$(".b_slider-pull li").first(".slide-item.active").removeClass("active");
	});

	/* B_SLIDER */

	function ruleIsDis(){
		var silderContainerSize,
			sliderWrapSize,
			sliderWrapPosition;

		silderContainerSize=parseInt($(".b_slider-thumbs-container").height());
		sliderWrapSize = parseInt($(".b_slider-thumbs-wrap").height());
		sliderWrapPosition = parseInt($(".b_slider-thumbs-wrap").css("margin-top"));

		if (sliderWrapPosition < 0) {
			$(".totop").removeClass("dis");
		}else{
			$(".totop").addClass("dis");
		};

		if (silderContainerSize < sliderWrapSize-Math.abs(sliderWrapPosition)) {
			$(".todown").removeClass("dis");
		}else{
			$(".todown").addClass("dis");
		};
	}

	ruleIsDis();

	$(".todown").click(function(){
		var sliderStep,
			silderContainerSize,
			sliderWrapSize,
			sliderWrapPosition;

		sliderStep = -1*(parseInt($(".b_slider-thumbs-item").height())+parseInt($(".b_slider-thumbs-item").css("margin-top")));
		silderContainerSize=parseInt($(".b_slider-thumbs-container").height());
		sliderWrapSize = parseInt($(".b_slider-thumbs-wrap").height());
		sliderWrapPosition = parseInt($(".b_slider-thumbs-wrap").css("margin-top"));
		if (silderContainerSize < sliderWrapSize-Math.abs(sliderWrapPosition)) {
			$(".b_slider-thumbs-wrap").css("margin-top", sliderWrapPosition+sliderStep);
		};
		ruleIsDis();
	});

	$(".totop").click(function(){
		var sliderStep,
			silderContainerSize,
			sliderWrapSize,
			sliderWrapPosition;

		sliderStep = (parseInt($(".b_slider-thumbs-item").height())+parseInt($(".b_slider-thumbs-item").css("margin-top")));
		silderContainerSize=parseInt($(".b_slider-thumbs-container").height());
		sliderWrapSize = parseInt($(".b_slider-thumbs-wrap").height());
		sliderWrapPosition = parseInt($(".b_slider-thumbs-wrap").css("margin-top"));
		if (sliderWrapPosition < 0) {
			$(".b_slider-thumbs-wrap").css("margin-top", sliderWrapPosition+sliderStep);
		};
		ruleIsDis();
	});

	$(".b_slider-thumbs-item").click(function(){
		$(".b_slider-current img").attr("src",  $(this).children("img").attr("src"));
		$(".b_slider-thumbs-item").removeClass("active");
		$(this).addClass("active");
	});

	var sliderCount = $(".b_slider-thumbs-item").length;
	for (var i = sliderCount - 1; i >= 0; i--) {
		$(".b_slider-points").append("<div class='b_slider-points-item' point-index='"+(sliderCount-i-1)+"'></div>");
	};

	$(".b_slider-points-item").first().addClass("active");
	$(".b_slider-container .b_slider-points-item").first().addClass("active");

	var CurrentSlide = $(".b_slider-thumbs-item").eq(0);
		$(".b_slider-current img").attr("src", CurrentSlide.children("img").attr("src"));

	$(".b_slider-points-item").click(function(){
		var pointIndex = $(this).attr("point-index");
		var CurrentSlide = $(".b_slider-thumbs-item").eq(pointIndex);
		$(".b_slider-current img").attr("src", CurrentSlide.children("img").attr("src"));
		$(".b_slider-points-item").removeClass("active");
		$(this).addClass("active");
	});

	/* ADMINKA */

	$(".b_admobject-item-body-toggle-trigger").click(function(){
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).children("span").text("Развернуть");
			$(this).parent().next(".b_admobject-office-table").toggle(300);
		}else{
			$(this).addClass("active");
			$(this).children("span").text("Свернуть");
			$(this).parent().next(".b_admobject-office-table").toggle(300);
		};
	});

	$(".b_admheader-adding").click(function(){
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(".b_addobject").toggle();
		}else{
			$(this).addClass("active");
			$(".b_addobject").toggle();
		};
	});

	$(".b_addobject-input-caption-modaltrigger").click(function(e){
		e.preventDefault();
		$(".b_addobject-addimgmodal").toggle();
	});

	$(".b_addobject-addimgmodal-img-ok").click(function(e){
		e.preventDefault();
		$(".b_addobject-addimgmodal").toggle();
	});

	/* AUTOCOMPLETE */

	var objectAdres = $('#objectadres').val();

	$('#objectadres').keyup(function(){

		// function getObjectProp() {
		// 	$('.obj-addr-autoshow').show();
		// }

		// var runTimeOut;

		// runTimeOut = setTimeout(getObjectProp, 300);

		// if ($('#objectadres').val()!=objectAdres) {
		// 	runTimeOut;
		// }
		//setTimeout(getObjectProp, 300);

		//$('.obj-addr-autoshow').text('another adres')
		//alert('123');
		
		//function getObjectProp() {
			var myGeocoder = ymaps.geocode('Иркутск, '+$(this).val()),
			autoaddres,
			autoccordinates;

			myGeocoder.then(
			    function (res) {
			    	autoaddres = res.geoObjects.get(0).properties.get('name');
			    	$('.obj-addr-autoshow').show();
			    	$('.obj-addr-autoshow').text(autoaddres);
			        autoccordinates = res.geoObjects.get(0).geometry.getCoordinates();
			        $('#objectcoords').val(autoccordinates);
			        //alert('Координаты объекта :' + res.geoObjects.get(0).geometry.getCoordinates() + ' ' +res.geoObjects.get(0).properties.get('name'));
			    },
			    function (err) {
			        console.log(err); //alert('Ошибка');
			    }
			);
		//}
		//setTimeout(getObjectProp, 200);
		//alert($(this).val());
	});

	$('.obj-addr-autoshow').click(function(){
		$('#objectadres').val($(this).text());
		$(this).hide();
		//alert($('#objectcoords').val());
	});
	$('.b_admobject-office-field-isfree').click(function(){
		if ($(this).hasClass('free')){
			$(this).text('Занято');
		}else{
			$(this).text('Свободно');
		};
		$(this).toggleClass("free");
	});
	

});

if ($(".b_filtr").length) {
	slider.noUiSlider.on('update', function() {
		setSliderSpans("square_slider", slider, "м<sup>2</sup>");
	});
	slider1.noUiSlider.on('update', function() {
		setSliderSpans("price_slider", slider1, "р");
	});

};


