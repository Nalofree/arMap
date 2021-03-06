
if ($(".b_filtr").length) {
	$(".b_filtr-item-formfield input[value='3']").parent().parent().hide();
	var slider = document.getElementById('square_slider');

	noUiSlider.create(slider, {
		start: [ 20, 100 ], // Handle start position
		step: 10, // Slider moves in increments of '10'
		margin: 20, // Handles must be more than '20' apart
		connect: true, // Display a colored bar between the handles
		//direction: 'rtl', // Put '0' at the bottom of the slider
		// orientation: 'horisontal', // Orient the slider vertically
		behaviour: 'tap-drag', // Move handle on tap, bar is draggable
		range: { // Slider can select '0' to '100'
			'min': 0,
			'max': 700
		},
		pips: { // Show a scale with the slider
			mode: 'steps',
			density: 100
		}
	});


	var slider1 = document.getElementById('price_slider');

	noUiSlider.create(slider1, {
		start: [ 500, 1500 ], // Handle start position
		step: 10, // Slider moves in increments of '10'
		margin: 20, // Handles must be more than '20' apart
		connect: true, // Display a colored bar between the handles
		//direction: 'rtl', // Put '0' at the bottom of the slider
		// orientation: 'horisontal', // Orient the slider vertically
		behaviour: 'tap-drag', // Move handle on tap, bar is draggable
		range: { // Slider can select '0' to '100'
			'min': 300,
			'max': 2000
		},
		pips: { // Show a scale with the slider
			mode: 'steps',
			density: 100
		}
	});

	
};

$(document).ready(function(){
	/*});	*/
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

	// if ($(".b_filtr").length) {
	// 	$(".noUi-handle").append("<span></span>");
	// 	setSliderSpans("square_slider", slider, "м");
	// 	setSliderSpans("price_slider", slider1, "р");
	// };

	$(".navtrigger").click(function(){
		if ($(this).hasClass("active")) {
			$(".b_header-nav ul").hide();
			$(this).removeClass("active");
		}else{
			$(".b_header-nav ul").css('display', 'flex');
			$(this).addClass("active");
		};
	});
	if ($(".b_filtr").is(':visible')){ 
		$(".b_filtr-buttons-filtr").addClass('active');
		$(".b_filtr-trigger").text("скрыть фильтр");
	}else{
		$(".b_filtr-trigger").text("показать фильтр");
		$(".b_filtr-buttons-filtr").removeClass('active');
	};
	$(".b_filtr-trigger").click(function(){
		if ($(".b_filtr").is(':visible')) {
			$(".b_filtr").hide();
			$(".b_filtr-buttons").hide();
			$(".b_filtr-results").hide();
			$(this).removeClass("active");
			$(this).text("показать фильтр");
		}else{
			$(".b_filtr").show();			
			$(".b_filtr-buttons").show();
			$(this).addClass("active");
			$(".b_filtr-buttons-filtr").addClass("active");
			$(this).text("скрыть фильтр");
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

	function setCurrenSlide(index){
		var imgUrl = $(".b_slider-thumbs-item[thumb-index="+index+"] img").attr('src');
		$(".b_slider-current img").attr("src", imgUrl);
		$(".b_slider-points-item").removeClass("active");
		$(".b_slider-points-item[thumb-index="+index+"]").addClass("active");
		$(".b_slider-thumbs-item").removeClass("active");
		$(".b_slider-thumbs-item[thumb-index="+index+"]").addClass("active");
	}

	$(".b_slider-thumbs-item").click(function(){
		var pointIndex = $(this).attr("thumb-index");
		setCurrenSlide(pointIndex);
	});

	var sliderCount = $(".b_slider-thumbs-item").length;
	for (var i = 0; i < sliderCount; i++) {
		$(".b_slider-points").append("<div class='b_slider-points-item' thumb-index='"+i+"'></div>");
	};

	$(".b_slider-points-item").click(function(){
		var pointIndex = $(this).attr("thumb-index");
		setCurrenSlide(pointIndex);
	});

	$(".b_slider-current img").click(function(){
		var pointIndex = 0;
		var currentIndex = $(".b_slider-thumbs-item.active").attr('thumb-index');
		if (currentIndex < (parseInt(sliderCount)-1)) {
			pointIndex = parseInt(currentIndex)+1;
		}else{
			pointIndex = 0;
		}
		console.log(pointIndex);
		setCurrenSlide(pointIndex);
	});

	$(".b_slider-points-item").eq(0).click();

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
			$(".b_addobject-done").show();
			$(".b_addobject-edit").hide();
			$("#addobject_form").trigger( 'reset' );
			$("#addobject_form").attr('action', '/admin');
			$(".b_addobject-img-field img").attr("src", "img/800x600.png");
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

	// $("#square_slider input[type=text].min").change(function(){
	// 	var value = $(this).val();
	// 	var valueArr = value.match(/\d/gi);
	// 	if (valueArr) {
	// 		var newValue = valueArr.join('');
	// 		var maxValue = $("#square_slider input[type=text].max").val().match(/\d/gi).join('');
	// 		//alert(maxValue);
	// 		if (parseInt(maxValue) <= parseInt(newValue)) {
	// 			newValue = parseInt(maxValue)-1;
	// 		}
	// 		$(this).val(newValue+"м");
	// 	}else{
	// 		$(this).val("0м");
	// 	}
	// });

	// $("#square_slider input[type=text].max").change(function(){
	// 	var value = $(this).val();
	// 	var valueArr = value.match(/\d/gi);
	// 	if (valueArr) {	
	// 		var newValue = valueArr.join('');
	// 		var minValue = $("#square_slider input[type=text].min").val().match(/\d/gi).join('');
	// 		//alert(minValue);
	// 		if (parseInt(minValue) >= parseInt(newValue)) {
	// 			newValue = parseInt(minValue)+1;
	// 		}
	// 		$(this).val(newValue+"м");
	// 	}else{
	// 		var minValue = $("#square_slider input[type=text].min").val().match(/\d/gi).join('');
	// 		$(this).val( parseInt(minValue)+1+"м");
	// 	}
	// });

	// $("#price_slider input[type=text].min").change(function(){
	// 	var value = $(this).val();
	// 	var valueArr = value.match(/\d/gi);
	// 	if (valueArr) {	
	// 		var newValue = valueArr.join('');
	// 		var maxValue = $("#price_slider input[type=text].max").val().match(/\d/gi).join('');
	// 		//alert(maxValue);
	// 		if (parseInt(maxValue) <= parseInt(newValue)) {
	// 			newValue = parseInt(maxValue)-1;
	// 		}
	// 		$(this).val(newValue+"р");
	// 	}else{
	// 		$(this).val("300р");
	// 	}
	// });

	// $("#price_slider input[type=text].max").change(function(){
	// 	var value = $(this).val();
	// 	var valueArr = value.match(/\d/gi);
	// 	if (valueArr) {	
	// 		var newValue = valueArr.join('');
	// 		var minValue = $("#price_slider input[type=text].min").val().match(/\d/gi).join('');
	// 		//alert(minValue);
	// 		if (parseInt(minValue) >= parseInt(newValue)) {
	// 			newValue = parseInt(minValue)+1;
	// 		}
	// 		$(this).val(newValue+"р");
	// 	}else{
	// 		var minValue = $("#price_slider input[type=text].min").val().match(/\d/gi).join('');
	// 		$(this).val( parseInt(minValue)+1+"р");
	// 	}
	// });

	// $(".b_filtr-button").click(function(){
	// 			var maxArea = $('#square_slider .max').val() ? $('#square_slider .max').val() : "";
	// 			var minArea = $('#square_slider .min').val() ? $('#square_slider .min').val() : "";
	// 			var maxPrice = $('#price_slider .max').val() ? $('#price_slider .max').val() : "";
	// 			var minPrice = $('#price_slider .min').val() ? $('#price_slider .min').val() : "";
	// 			var meanings = [];
	// 			$("input[type=checkbox]:checked").each(function(){
	// 				meanings.push($(this).attr('value'));
	// 			});
	// 			console.log(maxArea);
	// 			console.log(minArea);
	// 			console.log(maxPrice);
	// 			console.log(minPrice);
	// 	if(maxArea.length > 0 && minArea.length > 0 && maxPrice.length > 0 && minPrice.length > 0){		
	// 		maxArea = maxArea.substring(0,maxArea.length-1);
	// 		minArea = minArea.substring(0,minArea.length-1);
	// 		maxPrice = maxPrice.substring(0,maxPrice.length-1);
	// 		minPrice = minPrice.substring(0,minPrice.length-1);
	// 		var data = {
	// 				maxArea: maxArea,
	// 				minArea: minArea,
	// 				maxPrice: maxPrice,
	// 				minPrice: minPrice,
	// 				meanings: meanings
	// 			}
	// 			/*console.log(data);*/
	// 			$(".close-layout").show();
	// 			$.ajax({
	// 			  type: "POST",
	// 			  url: '/filtred',
	// 			  data: data,
	// 			  dataType: 'json',
	// 			  timeout: 20000,
	// 			  success: function(data) {
	// 			      /*console.log('success');
	// 			      console.log(data);*/
	// 			      if (data.resultExist) {
	// 			      	// print offices & objects
		
	// 			      $('.b_offices-item a').each(function(){
	// 			      	$(this).parent().hide();
	// 			      });
	// 			      for (var i = data.officesId.length - 1; i >= 0; i--) {
	// 			      	$('.b_offices-item a').each(function(){
	// 			      		officeIdArr = $(this).attr('href').split(':');
	// 			      		officesid = officeIdArr[1];
	// 			      		if (data.officesId[i] == officesid) {
	// 			      			$(this).parent().show();
	// 			      		}
	// 			      	});
	// 			      };
		
	// 			      var marker = {
	// 			      	iconImageClipRect: [[58, 4], [87, 45]],
	// 			      	iconImageHref: 'img/incons2.png',
	// 			      	iconImageSize: [29, 41],
	// 			      	iconImageOffset: [-14, -40]
	// 			      };
	// 			      var placemarks2 = [];
	// 			      if (data.objects && typeof(map) !== "undefined") {
	// 			      	for (var i = data.objects.length-1; i >= 0; i--) {
	// 			      		var coords=data.objects[i].object_coordinates.split(',');
	// 			      		var coordsInt = [];
	// 			      		coordsInt[0] = parseFloat(coords[0]);
	// 			      		coordsInt[1] = parseFloat(coords[1]);
	// 			      		placemarks2[i] = new ymaps.Placemark(coordsInt,{
	// 			      			/*balloonContentHeader: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div>",		
	// 			          	balloonContentBody: "<p><strong>"+data.objects[i].object_addres+"</strong></p> <img src='"+data.imgFolder+data.objects[i].image_name+"' class='map-rouded-img' alt='' width=140 height=140 />",
	// 			          	balloonContentFooter: "<a href='/offices:"+data.objects[i].object_id+"'><div class='baloon-more'>Подробнее &gt;</div></a>",*/
	// 			          	balloonContent: '<div class="balloon-wrap"><div class="balloon-heading">'+data.objects[i].object_name+'</div>\
	// 			          	<div class="balloon-adres"><span class="glyphicon glyphicon-map-marker"></span> '+data.objects[i].object_addres+'</div>\
	// 			          	<div class="balloon-img"><img src="'+data.imgFolder+data.objects[i].image_name+'" alt="" /></div><div class="clearfix"></div>\
	// 			          	<a href="/offices:'+data.objects[i].object_id+'">Подробнее &gt;</a></div>',
	// 			          	hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>"
	// 			      		},marker);
	// 			      		map.geoObjects.add(placemarks2[i]);
	// 			        };
	// 			      };
		
	// 			      }else{
	// 			      	// print offices is empty
	// 			      	$('.b_offices-item a').each(function(){
	// 			      		$(this).parent().hide();
	// 			      	});
	// 			      };
	// 			  //setTimeout('$(".close-layout").toggle()',2000);
	// 			  $(".close-layout").hide();
	// 			  // alert($(".b_filtr-trigger").is(':visible'));
	// 			  if ($(".b_filtr-trigger").is(':visible')) {
	// 			  	$(".b_filtr").toggle();
	// 			  }
	// 			  },
	// 			  error: function(status){
	// 			  	console.log(status);
	// 			  	$(".close-layout").hide();
	// 			  }
	// 			});}else{
	// 				alert("Заполните корректно поля фильтра!")
	// 			}
	// });

	//footer send tel for callback

	$("#footercallbacksend").click(function(e){
		e.preventDefault();
		$(".form-error").hide();
		/*$("#footercallbacksend").attr("disabled","disabled");
		$("#footercallbackfield").attr("disabled","disabled");*/
		var comment = '',
				email = '',
				tel = $("#footercallbackfield").val();
				var data = {email: email, comment: comment, tel: tel, theme: 'Запрос обратного звонка'};
				var validtel = (/[0-9]+/ig.test(tel));
				console.log(validtel);
		if (tel && validtel) {
			$(".close-layout").show();
			console.log('send');
			console.log(data);
			$.ajax({
			  type: "POST",
			  url: '/sendmail',
			  data: data,
			  dataType: 'json',
			  timeout: 20000,
			  success: function(data) {
			      console.log(data);
			      console.log('success');
			      $('.info-field.connect-red').before('<div class="tel-thanks"><h1>Спасибо!</h1>\
			      <p>Запрос принят. В ближайшее время наш оператор с вами свяжется.</p></div>');
			      setTimeout('$(".tel-thanks").hide()', 5000);
			      $(".close-layout").hide();
			      $(".tel-thanks").click(function(){
			      	$(this).hide();
			      });
			      $("#footercallbackfield").val("");

			  },
			  error: function(data, status, error){
			  	console.log(data+' '+status+' '+error);
			  	$(".close-layout").hide();
			  }
			});
			
		}else{
			$("#footercallbackfield").css('background-color', '#fcc');
			$(this).after("<div class='form-error'>Проверьте правильность введенных данных</div>");
			console.log('no send');
			$(".close-layout").hide();
		};

		$("#footercallbackfield").focus(function(){
			$(this).css('background-color', '#fff');
			$(".form-error").hide();
		});
	});

	$("#bodycallbacksend").click(function(e){
		e.preventDefault();		
		$(".form-error").hide();
		var comment = '',
				email = '',
				tel = $("#bodycallbackfield").val();
				var data = {email: email, comment: comment, tel: tel, theme: 'Запрос обратного звонка'};

		var validtel = (/[0-9]+/ig.test(tel));
		console.log(validtel);
		if (tel && validtel) {
			$(".close-layout").show();
			console.log('send');
			console.log(data);
			/*$("#bodycallbacksend").attr("disabled","disabled");
			$("#bodycallbackfield").attr("disabled","disabled");*/
			$.ajax({
			  type: "POST",
			  url: '/sendmail',
			  data: data,
			  dataType: 'json',
			  timeout: 20000,
			  success: function(data) {
			      console.log(data);
			      console.log('success');
			      $(".b_office_params-callback-form").append('<div class="tel-thanks"><h1>Спасибо!</h1>\
			      <p>Запрос принят. В ближайшее время наш оператор с вами свяжется.</p></div>');
			      $(".tel-thanks").css('bottom','0px');
			      $(".tel-thanks").css('height','200px');
			      setTimeout('$(".tel-thanks").hide()', 5000);
			      $(".close-layout").hide();
			      $(".form-error").hide();
			      $(".tel-thanks").click(function(){
			      	$(this).hide();
			      });
			      $("#bodycallbackfield").val("");
			  },
			  error: function(data, status, error){
			  	console.log(data+' '+status+' '+error);
			  	$(".close-layout").hide();
			  }
			});
			
		}else{
			$("#bodycallbackfield").css('background-color', '#fcc');
			$(this).after("<div class='form-error'>Проверьте правильность введенных данных</div>");
			console.log('no send');
			$(".close-layout").hide();
		};

		$("#bodycallbackfield").focus(function(){
			$(this).css('background-color', '#fff');
			$(".form-error").hide();
		});
	});

/*$('.info-field.connect-red').before('<div class="tel-thanks"><h1>Спасибо!</h1>\
			<p>Запрос принят. В ближайшее время наш оператор с вами свяжется.</p></div>');
			setTimeout('$(".tel-thanks").hide()', 2000);*/

	//footer send comment

	$("#footercommentsend").click(function(e){
		e.preventDefault();
		$(".form-error").hide();
		/*$("#footercommentsend").attr("disabled","disabled");
		$("#footercomment").attr("disabled","disabled");
		$("#footercommentemail").attr("disabled","disabled");*/
		var comment = $("#footercomment").val(),
				email = $("#footercommentemail").val(),
				tel = '',
				validemail,
				pattern;

		validemail = (email.search(/.+@.+\..+/i) != -1);

		console.log(validemail);

		if (comment && email && validemail) {
			$(".close-layout").show();
			var data = {email: email, comment: comment, tel: tel, theme: 'Новый комментарий'};
			console.log(data);
			//console.log('send');
					$.ajax({
					  type: "POST",
					  url: '/sendmail',
					  data: data,
					  dataType: 'json',
					  timeout: 20000,
					  success: function(data) {
					      console.log('success');
					      $('textarea#footercomment').before('<div class="tel-thanks"><h1>Спасибо!</h1>\
					      	<p>Письмо отправлено. В ближайшее время мы ответим вам.</p></div>');
					      	setTimeout('$(".tel-thanks").hide()', 2000);
					      	$(".close-layout").hide();
					      	$(".tel-thanks").click(function(){
					      		$(this).hide();
					      	});
					      	$("#footercomment").val("");
							$("#footercommentemail").val("");
					  },
					  error: function(data, status, error){
					  	console.log(data+' '+status+' '+error);
					  	alert('Ошибка. Перезагрузите страницу и попробуйте ещё раз');
					  	$(".close-layout").hide();
					  }
					});
		}else{
			if (!comment) {$("#footercomment").css('background-color', '#fcc');$(this).after("<div class='form-error'>Проверьте правильность введенных данных</div>");};
			if (!email) {$("#footercommentemail").css('background-color', '#fcc');$(this).after("<div class='form-error'>Проверьте правильность введенных данных</div>");};
			if (!validemail) {$("#footercommentemail").css('background-color', '#fcc');$(this).after("<div class='form-error'>Проверьте правильность введенных данных</div>");};
			console.log('no send');
			$(".close-layout").hide();
		};

		$("#footercomment").focus(function(){
			$(this).css('background-color', '#fff');
			$(".form-error").hide();
		});
		$("#footercommentemail").focus(function(){
			$(this).css('background-color', '#fff');
			$(".form-error").hide();
		});

	});
/*	$('textarea#footercomment').before('<div class="tel-thanks"><h1>Спасибо!</h1>\
	<p>Письмо отправлено. В ближайшее время мы ответим вам.</p></div>');
	setTimeout('$(".tel-thanks").hide()', 2000);*/

	/* auth */
	
	$(".login-form input[type=submit]").click(function(e){
		e.preventDefault();
		var username, pass, data;
		username = $(".login-form input[name=username]").val();
		pass = $(".login-form input[name=pass]").val();
		if (username && pass) {
			$("form[name='auth']").submit();
			// data = {username: username, pass: pass}
			// $.ajax({
			// 	type: "POST",
			// 	url: '/auth',
			// 	data: data,
			// 	dataType: 'json',
			// 	success: function(data) {
			// 	  console.log('success');
			// 	  console.log(data);
			// 	},
			// 	error: function(data, status, error){
			// 		console.log(data+' '+status+' '+error);
			// 		$(".login-form input[name=username]").css('background-color', '#fcc');
			// 		$(".login-form input[name=pass]").css('background-color', '#fcc');
			// 	}
			// });
		}else{
			if (!username) {$(".login-form input[name=username]").css('background-color', '#fcc');};
			if (!pass) {$(".login-form input[name=pass]").css('background-color', '#fcc');};
		};		
	});

	$(".login-form input[name=username]").focus(function(){
		$(this).css('background-color', '#fff');
	});
	$(".login-form input[name=pass]").focus(function(){
		$(this).css('background-color', '#fff');
	});

	/*$('.unrole').click(function(){
		alert('unrole');
	});*/

	$("input[name='publish']").each(function(){
		if ($(this).attr("data-title") == '1') {
			$(this).attr("checked","checked")
		}
	});

	$("span.edit-object").click(function(){
		$(".b_addobject").show();
		$("body").animate({"scrollTop":0},"slow");
		$(".b_addobject-edit").show();
		$(".b_addobject-done").hide();
		$("#addobject_form").attr("action","/editobject");
		var objectId = $(this).attr("data-title");
		$.ajax({
			type: "POST",
			url: "/openforeditobject",
			data: {objectId: objectId},
			dataType: "json",
			timeout: 20000,
			success: function(data) {
				console.log('success');
				$("#objectname").val(data.object_name);
				$("#objectadres").val(data.object_addres);
				$("#objectcoords").val(data.object_coordinates);
				$('.b_addobject-img-field img').attr("src", 'img/obj_imgs/'+data.image_name);
				//$(".b_addobject-edit").attr("data-title", data.object_id);
				$("input#objectcoords").after('<input type="text" name="objectId" id="objectId"/>');
				$("input[name='objectId']").val(data.object_id);
			},
			error: function(status){
			 	console.log(status);
			}
		});
	});

	function prepareUpload(event)
{
  files = event.target.files;
  var reader = new FileReader();
  reader.onload = (function(theFile){
  	return function(e){
  		$('.b_addobject-addimgmodal-img img').attr('src',e.target.result);
  		$('.b_addobject-img-field img').attr('src',e.target.result);
  	};  	
  })(files[0]);
  reader.readAsDataURL(files[0]);
}

$(".tel-thanks").click(function(){
	$(this).hide();
});

/* addobject form validation */

function formValidError(formErrorMedege) {
	$(".form-valid-error").show(200, function(){
		setTimeout('$(".form-valid-error").hide(200)', 1500);
	});
	$(".form-valid-error").text(formErrorMedege);
}


	$(".b_addobject-edit").click(function(e){
		e.preventDefault();
		var objImage = $("#objectimage").val();
		if (!objImage) {
			var objectImage = '';
		};
		var objectnameExist = $("#objectname").val(),
				objectadresExist = $("#objectadres").val(),
				objectcoordsExist = $("#objectcoords").val();

		if (objectnameExist && objectadresExist && objectcoordsExist) {
			$("#addobject_form").submit();
		}else{	
			if (!objectcoordsExist) formValidError("Выберете предложенный вариант адреса");
			if (!objectadresExist) formValidError("Введите адрес и выберете предложенный вариант");
			if (!objectnameExist) formValidError("Введите название");
		};
	});

	function get_cookie (cookie_name){
		if (document.cookie)
			alert(document.cookie);
		else
			alert("Не удалось получить cookies");
	}

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
	}

	// $(".bmark-trigger").click(function(){
	// 	if ($(this).hasClass("added")) {
	// 		$(this).removeClass("added");
	// 		$(this).attr("data-title","Добавить в закладки");
	// 	}else{
	// 		$(this).addClass("added");
	// 		$(this).attr("data-title","Удалить из закладок");
	// 	};
	// });

	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function delete_cookie (cookie_name){
		var cookie_date = new Date (); 
		cookie_date.setTime (cookie_date.getTime() - 1);
		document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
	}

	$(".b_bmarks").ready(function(){
		//alert("bmarks is ready!");
		var bmarks = getCookie("bmarks");
		var bmarksArr = bmarks.split(',');
		//alert(bmarksArr);
		//
		if (bmarks) {
			$(".close-layout").show();
			$.ajax({
				type: 'POST',
				url: '/bmarks',
				data: {bmarks: bmarks},
				dataType: 'json',
				timeout: 20000,
				success: function(data) {
					console.log('success');
					console.log(data);
					$(".close-layout").hide();
					if (data.offices) {
						for (var i = data.offices.length - 1; i >= 0; i--) {
							//$(".b_bmarks").append(data.offices[i].officeDescription+", ");
							$(".b_bmarks").append('<div class="b_bmarks-item"><a href="/currentoffice:'+data.offices[i].officeId+'">\
								<div class="b_bmarks-item-img"><img src="'+data.imgFolder+data.offices[i].officeImage+'" alt="" /></div></a>\
								<div class="b_offices-item-text"><a href="/currentoffice:'+data.offices[i].officeId+'">\
								<div class="b_offices-item-heading">'+data.offices[i].officeDescription+'</div></a>\
								<div class="bmark-trigger added" data-title="Удалить из закладок"></div>\
								<hr /><div class="b_offices-item-description"><span class="price">Цена за м<sup>2</sup>:\
								<span class="price-num">'+data.offices[i].officeSubprice+'p</span></span>\
								<span class="square">Площадь: <span class="square-num">'+data.offices[i].officeArea+' м<sup>2</sup></span></span></div></div></div>');
							
						}
					};
					var bmarks = getCookie("bmarks");
					var bmarksArr = bmarks.split(',');
					var bmarksColumn = bmarks.length>0 ? bmarksArr.length : "0";
					$(".mark-ind").text(bmarksColumn);
					$(".b_bmarks-item .bmark-trigger").click(function(){
						var officeIdArr = $(this).parent().children('a').attr('href').split(":");
						console.log(officeIdArr);
						var officeId = officeIdArr[1];
						if ($(this).hasClass('added')){
							$(this).removeClass("added");
							$(this).attr("data-title","Добавить в закладки");
							var bmarks = getCookie("bmarks");
							var bmarksArr = bmarks.split(',');
							bmarksArr.splice(bmarksArr.indexOf(officeId),1);
							bmarks = bmarksArr.join(',');
							delete_cookie("bmarks");
							setCookie("bmarks", bmarks, 30);
							getCookie("bmarks");
							console.log(document.cookie);
						}else{
							$(this).addClass("added");
							$(this).attr("data-title","Удалить из закладок");

							var bmarks = getCookie("bmarks");
							if (bmarks) {
								setCookie("bmarks", bmarks+','+officeId, 30);
								console.log(document.cookie);
							}else{
								setCookie("bmarks", officeId, 30);
								console.log(document.cookie);
							};
						};
						var bmarks = getCookie("bmarks");
						var bmarksArr = bmarks.split(',');
						var bmarksColumn = bmarks.length>0 ? bmarksArr.length : "0";
						$(".mark-ind").text(bmarksColumn);
						$(this).parent().parent().hide();
					});
					if($(".mark-ind").text() == "0"){
						$(".mark-ind").hide();
					}else{
						$(".mark-ind").show();
					}				
				},
				error: function(status){
				 	console.log(status);
				 	$(".close-layout").hide();
				}
			});
		}else{
			$(".delete-coockie").text("Закладок нет");
		}
	});

	var bmarks = getCookie("bmarks");
	var bmarksArr = bmarks.split(',');
	var bmarksColumn = bmarks.length>0 ? bmarksArr.length : "0";
	$(".mark-ind").text(bmarksColumn);

	if ($("a").is(".b_offices-item a")) {
		$(".b_offices-item").each(function(){
			var officeIdArr = $(this).children('a').attr('href').split(":");
			console.log(officeIdArr);
			var officeId = officeIdArr[1];
			console.log(officeId);
			if (bmarksArr.indexOf(officeId) >= 0) {
				$(this).children(".b_offices-item-text").children(".bmark-trigger").addClass("added");
			}
		});
	};


	if (bmarksArr.indexOf($(".b_office_params .bmark-trigger").attr("id")) >= 0) {
		$(".b_office_params .bmark-trigger").addClass("added");
	}
	/*$(".b_offices-item").each(function(){
		var officeIdArr = $(this).children('a').attr('href').split(":");
		console.log(officeIdArr);
		var officeId = officeIdArr[1];
		console.log(officeId);
		if (bmarksArr.indexOf(officeId) >= 0) {
			$(this).children(".b_offices-item-text").children(".bmark-trigger").addClass("added");
		}
	});*/

	var date = new Date(new Date().getTime()+30*24*60*60*1000);
	$(".b_offices-item-text .bmark-trigger").click(function(){
		var officeIdArr = $(this).parent().children('a').attr('href').split(":");
		console.log(officeIdArr);
		var officeId = officeIdArr[1];
		if ($(this).hasClass('added')){
			$(this).removeClass("added");
			$(this).attr("data-title","Добавить в закладки");
			var bmarks = getCookie("bmarks");
			var bmarksArr = bmarks.split(',');
			bmarksArr.splice(bmarksArr.indexOf(officeId),1);
			bmarks = bmarksArr.join(',');
			delete_cookie("bmarks");
			setCookie("bmarks", bmarks, 30);
			getCookie("bmarks");
			console.log(document.cookie);
		}else{
			$(this).addClass("added");
			$(this).attr("data-title","Удалить из закладок");

			var bmarks = getCookie("bmarks");
			if (bmarks) {
				setCookie("bmarks", bmarks+','+officeId, 30);
				console.log(document.cookie);
			}else{
				setCookie("bmarks", officeId, 30);
				console.log(document.cookie);
			};
		};
		var bmarks = getCookie("bmarks");
		var bmarksArr = bmarks.split(',');
		var bmarksColumn = bmarks.length>0 ? bmarksArr.length : "0";
		$(".mark-ind").text(bmarksColumn);
		if($(".mark-ind").text() == "0"){
			$(".mark-ind").hide();
		}else{
			$(".mark-ind").show();
		}
	});

	$(".b_office_params .bmark-trigger").click(function(){
		var officeId = $(this).attr("id");
		if ($(this).hasClass('added')){
			$(this).removeClass("added");
			$(this).attr("data-title","Добавить в закладки");
			var bmarks = getCookie("bmarks");
			var bmarksArr = bmarks.split(',');
			bmarksArr.splice(bmarksArr.indexOf(officeId),1);
			bmarks = bmarksArr.join(',');
			delete_cookie("bmarks");
			setCookie("bmarks", bmarks, 30);
			getCookie("bmarks");
			console.log(document.cookie);
		}else{
			$(this).addClass("added");
			$(this).attr("data-title","Удалить из закладок");

			var bmarks = getCookie("bmarks");
			if (bmarks) {
				setCookie("bmarks", bmarks+','+officeId, 30);
				console.log(document.cookie);
			}else{
				setCookie("bmarks", officeId, 30);
				console.log(document.cookie);
			};
		};
		var bmarks = getCookie("bmarks");
		var bmarksArr = bmarks.split(',');
		var bmarksColumn = bmarks.length>0 ? bmarksArr.length : "0";
		$(".mark-ind").text(bmarksColumn);
		if($(".mark-ind").text() == "0"){
			$(".mark-ind").hide();
		}else{
			$(".mark-ind").show();
		}
	});

	$(".delete-coockie").click(function(){
		//$(".close-layout").toggle();
		delete_cookie("bmarks");
		var bmarks = getCookie("bmarks");
		var bmarksArr = bmarks.split(',');
		var bmarksColumn = bmarks.length>0 ? bmarksArr.length : "0";
		$(".mark-ind").text(bmarksColumn);
		$(".b_bmarks-item").empty();
		$(".b_bmarks").ready(function(){
			//alert("bmarks is ready!");
			var bmarks = getCookie("bmarks");
			var bmarksArr = bmarks.split(',');
			//alert(bmarksArr);
			//
			if (bmarks) {
				$.ajax({
					type: 'POST',
					url: '/bmarks',
					data: {bmarks: bmarks},
					dataType: 'json',
					timeout: 20000,
					success: function(data) {
						console.log('success');
						console.log(data);
						if (data.offices) {
							for (var i = data.offices.length - 1; i >= 0; i--) {
								//$(".b_bmarks").append(data.offices[i].officeDescription+", ");
								$(".b_bmarks").append('<div class="b_bmarks-item"><a href="/currentoffice:'+data.offices[i].officeId+'">\
									<div class="b_bmarks-item-img"><img src="'+data.imgFolder+data.offices[i].officeImage+'" alt="" /></div></a>\
									<div class="b_offices-item-text"><a href="/currentoffice:'+data.offices[i].officeId+'">\
									<div class="b_offices-item-heading">'+data.offices[i].officeDescription+'</div></a>\
									<div class="bmark-trigger added" data-title="Добавить в закладки"></div>\
									<hr /><div class="b_offices-item-description"><span class="price">Цена за м<sup>2</sup>:\
									<span class="price-num">'+data.offices[i].officeSubprice+'p</span></span>\
									<span class="square">Площадь: <span class="square-num">'+data.offices[i].officeArea+' м<sup>2</sup></span></span></div></div></div>');
								
							}
						};
						if($(".mark-ind").text() == "0"){
							$(".mark-ind").hide();
						}else{
							$(".mark-ind").show();
						}
					},
					error: function(status){
					 	console.log(status);
					}
				});
			}
		});
	});
});

//alert($(".min").val());

// $(".b_filtr").ready(function(){
// 	if ($(".b_filtr").length) {
// 		var minPrField = $("#price_slider .min").val() == "" ? $("#price_slider .min").val() : "00";
// 		var minSqField = $("#square_slider .min").val() == "" ? $("#square_slider .min").val() : "00";
// 		var maxPrField = $("#price_slider .max").val() == "" ? $("#price_slider .max").val() : "00";
// 		var maxSqField = $("#square_slider .max").val() == "" ? $("#square_slider .max").val() : "00";
// 		console.log(minPrField+", "+minSqField+", "+maxPrField+", "+maxSqField);
// 		var minPrice = minPrField.substring(0,minPrField.length-1) * minSqField.substring(0,minSqField.length-1);
// 		var maxPrice = maxPrField.substring(0,maxPrField.length-1) * maxSqField.substring(0,maxSqField.length-1);
// 		$(".min-price").text(minPrice+'p');
// 		$(".max-price").text(maxPrice+'p');
// 		slider.noUiSlider.on('update', function() {
// 			setSliderSpans("square_slider", slider, "м");
// 			var minPrField = $("#price_slider .min").val();
// 				var minSqField = $("#square_slider .min").val();
// 				var maxPrField = $("#price_slider .max").val();
// 				var maxSqField = $("#square_slider .max").val();
// 			var minPrice = minPrField.substring(0,minPrField.length-1) * minSqField.substring(0,minSqField.length-1);
// 			var maxPrice = maxPrField.substring(0,maxPrField.length-1) * maxSqField.substring(0,maxSqField.length-1);
// 			$(".min-price").text(minPrice+'p');
// 			$(".max-price").text(maxPrice+'p');
// 		});
// 		slider1.noUiSlider.on('update', function() {
// 			setSliderSpans("price_slider", slider1, "р");
// 				var minPrField = $("#price_slider .min").val();
// 				var minSqField = $("#square_slider .min").val();
// 				var maxPrField = $("#price_slider .max").val();
// 				var maxSqField = $("#square_slider .max").val();
// 			var minPrice = minPrField.substring(0,minPrField.length-1) * minSqField.substring(0,minSqField.length-1);
// 			var maxPrice = maxPrField.substring(0,maxPrField.length-1) * maxSqField.substring(0,maxSqField.length-1);
// 			$(".min-price").text(minPrice+'p');
// 			$(".max-price").text(maxPrice+'p');
// 		});
// 		$("#square_slider .min").focusout(function(){
// 			if (!$(this).val()){
// 				var minSqField = $("#square_slider .min").val();
// 				slider.noUiSlider.set(minSqField.substring(0,minSqField.length-1));
// 			}		
// 		});
// 		$("#square_slider .max").focusout(function(){
// 			if (!$(this).val()){
// 				var maxSqField = $("#square_slider .min").val();
// 				slider.noUiSlider.set(maxSqField.substring(0,maxSqField.length-1));
// 			}		
// 		});
// 		$("#price_slider .min").focusout(function(){
// 			if (!$(this).val()){
// 				var minPrField = $("#price_slider .min").val();
// 				slider1.noUiSlider.set(minPrField.substring(0,minPrField.length-1));
// 			}		
// 		});
// 		$("#price_slider .max").focusout(function(){
// 			if (!$(this).val()){
// 				var maxPrField = $("#price_slider .min").val();
// 				slider1.noUiSlider.set(maxPrField.substring(0,maxPrField.length-1));
// 			}		
// 		});
// 		$("#square_slider .min").change(function(){
// 			if (!$(this).val()){
// 				var minSqField = $("#square_slider .min").val();
// 				slider.noUiSlider.set(minSqField.substring(0,minSqField.length-1));
// 			}		
// 		});
// 		$("#square_slider .max").change(function(){
// 			if (!$(this).val()){
// 				var maxSqField = $("#square_slider .min").val();
// 				slider.noUiSlider.set(maxSqField.substring(0,maxSqField.length-1));
// 			}		
// 		});
// 		$("#price_slider .min").change(function(){
// 			if (!$(this).val()){
// 				var minPrField = $("#price_slider .min").val();
// 				slider1.noUiSlider.set(minPrField.substring(0,minPrField.length-1));
// 			}		
// 		});
// 		$("#price_slider .max").change(function(){
// 			if (!$(this).val()){
// 				var maxPrField = $("#price_slider .min").val();
// 				slider1.noUiSlider.set(maxPrField.substring(0,maxPrField.length-1));
// 			}		
// 		});
		


// 		// var minSqField = $("#square_slider .min").val();
// 		// var minSq = minSqField.substring(0,minSqField.length-1);
// 		// var maxSqField = $("#square_slider .min").val();
// 		// maxSq = maxSqField.substring(0,maxSqField.length-1);
// 		// var minPrField = $("#price_slider .min").val();
// 		// minPr = minPrField.substring(0,minPrField.length-1);
// 		// var maxPrField = $("#price_slider .min").val();
// 		// maxPr = maxPrField.substring(0,maxPrField.length-1);

// 		// if (maxSqField >= slider.range.max) {}
// 	}
// });

$(".load-next a").click(function(e){
	e.preventDefault();
	$(".close-layout").toggle();
	var itemsCount = $(".b_offices-item").length;
	var objectId = $(".load-next a").attr('data-title');
	//alert(objectId);
	data = {itemsCount: itemsCount, objectId: objectId};
	console.log(data);
	$.ajax({
		type: 'POST',
		url: '/loadnext',
		data: data,
		dataType: 'json',
		timeout: 20000,
		success: function(data) {
			console.log('success');
			console.log(data);
			for (var i = 0; i < data.n_offices.length; i++) {
				$(".b_offices").append('<div class="b_offices-item"><a href="/currentoffice:'+data.n_offices[i].officeId+'">\
    		<div class="b_offices-item-img"><img src="img/obj_imgs/'+data.n_offices[i].officeImage+'" alt=""/></div></a>\
  			<div class="b_offices-item-text"><a href="/currentoffice:'+data.n_offices[i].officeId+'">\
      	<div class="b_offices-item-heading">'+data.n_offices[i].officeDescription+'</div></a>\
    		<div data-title="Добавить в закладки" class="bmark-trigger"></div>\
    		<hr/>\
    		<div class="b_offices-item-description"><span class="price">Цена за м<sup>2</sup>: <span class="price-num">'+data.n_offices[i].officeSubprice+'p</span></span><span class="square">Площадь: <span class="square-num">'+data.n_offices[i].officeArea+'м<sup>2</sup></span></span></div>\
  			</div>\
				</div>');
			};
			if ($(".b_offices-item").length%8!=0) {
				$(".load-next a").hide();
			}
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

			function delete_cookie (cookie_name){
				var cookie_date = new Date (); 
				cookie_date.setTime (cookie_date.getTime() - 1);
				document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
			}
			$(".b_offices-item-text .bmark-trigger").click(function(){
				var officeIdArr = $(this).parent().children('a').attr('href').split(":");
				console.log(officeIdArr);
				var officeId = officeIdArr[1];
				if ($(this).hasClass('added')){
					$(this).removeClass("added");
					$(this).attr("data-title","Добавить в закладки");
					var bmarks = getCookie("bmarks");
					var bmarksArr = bmarks.split(',');
					bmarksArr.splice(bmarksArr.indexOf(officeId),1);
					bmarks = bmarksArr.join(',');
					delete_cookie("bmarks");
					setCookie("bmarks", bmarks, 30);
					getCookie("bmarks");
					console.log(document.cookie);
				}else{
					$(this).addClass("added");
					$(this).attr("data-title","Удалить из закладок");

					var bmarks = getCookie("bmarks");
					if (bmarks) {
						setCookie("bmarks", bmarks+','+officeId, 30);
						console.log(document.cookie);
					}else{
						setCookie("bmarks", officeId, 30);
						console.log(document.cookie);
					};
				};
				var bmarks = getCookie("bmarks");
				var bmarksArr = bmarks.split(',');
				var bmarksColumn = bmarks.length>0 ? bmarksArr.length : "0";
				$(".mark-ind").text(bmarksColumn);
			});
			if($(".mark-ind").text() == "0"){
				$(".mark-ind").hide();
			}else{
				$(".mark-ind").show();
			}
			$(".close-layout").toggle();
		},
		error: function(status,error){
			console.log('error');
		 	console.log(status);
		}
	});
});
	
	$(document).ready(function(){
		if($(".mark-ind").text() == "0"){
			$(".mark-ind").hide();
		}else{
			$(".mark-ind").show();
		}
	});


/* FILTR RANGE SLIDER */

if ($(".b_filtr").length) {

	var points, sliderItem, sliderId;

	function setSliderSpans(sliderId, sliderItem, points){
		var handleLower = $("#" + sliderId + " .min"),
			handleUpper = $("#" + sliderId + " .max"),
			values = sliderItem.noUiSlider.get();
			handleUpper.val(parseInt(values[1])+points);
			handleLower.val(parseInt(values[0])+points);
	}

	function getSliderVals(sliderItem){
		var values = sliderItem.noUiSlider.get();
		return values;
	}

	function setSliderValues(valueMin, valueMax, sliderItem){
		var values = new Array;
		values.push(valueMin);
		values.push(valueMax);
		//alert(values);
		sliderItem.noUiSlider.set(values);
	}

	function getPrices(slider, slider1){
		prices = slider1.noUiSlider.get();
		squares = slider.noUiSlider.get();
		maxPrice = prices[1] * squares[1];
		minPrice = prices[0] * squares[0];
		$(".min-price").text(minPrice+'p');
		$(".max-price").text(maxPrice+'p');
	}

	// squareSliderMaxValue = $("#square_slider .noUi-value-large:last").html();
	// priceSliderMaxValue = $("#price_slider .noUi-value-large:last").html();

	var searchAreaMore = 0, searchPriceMore = 0;

	function maxMoreSqare(sliderItem,valueMaxFloat) {
		var SliderMaxValue = $("#square_slider .noUi-value-large:last").html(),
			SliderMaxValueFloat = parseFloat(SliderMaxValue);
		if (valueMaxFloat == SliderMaxValueFloat) {
			$("#square_slider .max").val(">"+$("#square_slider .max").val());
			searchAreaMore = 1;
		}else{
			searchAreaMore = 0;
		}
	}

	function maxMorePrice(sliderItem,valueMaxFloat) {
		var SliderMaxValue = $("#price_slider .noUi-value-large:last").html(),
			SliderMaxValueFloat = parseFloat(SliderMaxValue);
		if (valueMaxFloat == SliderMaxValueFloat) {
			$("#price_slider .max").val(">"+$("#price_slider .max").val());
			searchPriceMore = 1;
		}else{
			searchPriceMore = 0;
		}
	}

	$("#square_slider .min").change(function(){
		var valueMin = $(this).val(),
			valueMinFloat = parseFloat(valueMin),
			valueMax = $("#square_slider .max").val(),
			valueMaxFloat = parseFloat(valueMax);
			setSliderValues(valueMinFloat,valueMaxFloat,slider);
			maxMoreSqare(slider,valueMaxFloat);
			getPrices(slider, slider1);
	});

	$("#square_slider .max").change(function(){
		var valueMin = $("#square_slider .min").val(),
			valueMinFloat = parseFloat(valueMin),
			valueMax = $(this).val(),
			valueMaxFloat = parseFloat(valueMax);
			setSliderValues(valueMinFloat,valueMaxFloat,slider);
			maxMoreSqare(slider,valueMaxFloat);
			getPrices(slider, slider1);
	});

	$("#price_slider .min").change(function(){
		var valueMin = $(this).val(),
			valueMinFloat = parseFloat(valueMin),
			valueMax = $("#price_slider .max").val(),
			valueMaxFloat = parseFloat(valueMax);
			setSliderValues(valueMinFloat,valueMaxFloat,slider1);
			maxMorePrice(slider1,valueMaxFloat);
			getPrices(slider, slider1);
	});

	$("#price_slider .max").change(function(){
		var valueMin = $("#price_slider .min").val(),
			valueMinFloat = parseFloat(valueMin),
			valueMax = $(this).val(),
			valueMaxFloat = parseFloat(valueMax);
			setSliderValues(valueMinFloat,valueMaxFloat,slider1);
			maxMorePrice(slider1,valueMaxFloat);
			getPrices(slider, slider1);
	});

	slider.noUiSlider.on('update', function() {
		setSliderSpans('square_slider', slider, 'м');
		var valueMax = $("#square_slider .max").val(),
		valueMaxFloat = parseFloat(valueMax);
		maxMoreSqare(slider, valueMaxFloat);
		getPrices(slider, slider1);
	});

	slider1.noUiSlider.on('update', function() {
		setSliderSpans('price_slider', slider1, 'р');
		var valueMax = $("#price_slider .max").val(),
		valueMaxFloat = parseFloat(valueMax);
		maxMorePrice(slider1,valueMaxFloat);
		getPrices(slider, slider1);
	});

	$("#square_slider .min").focus(function(){
		$(this).val("");
	});

	$("#square_slider .min").focusout(function(){
		setSliderSpans('square_slider', slider, 'м');
		var valueMax = $("#square_slider .max").val(),
		valueMaxFloat = parseFloat(valueMax);
		maxMoreSqare(slider, valueMaxFloat);
		getPrices(slider, slider1);
	});

	$("#square_slider .max").focus(function(){
		$(this).val("");
	});

	$("#square_slider .max").focusout(function(){
		setSliderSpans('square_slider', slider, 'м');
		var valueMax = $("#square_slider .max").val(),
		valueMaxFloat = parseFloat(valueMax);
		maxMoreSqare(slider, valueMaxFloat);
		getPrices(slider, slider1);
	});

	$("#price_slider .min").focus(function(){
		$(this).val("");
	});

	$("#price_slider .min").focusout(function(){
		setSliderSpans('price_slider', slider1, 'р');
		var valueMax = $("#price_slider .max").val(),
		valueMaxFloat = parseFloat(valueMax);
		maxMorePrice(slider1,valueMaxFloat);
		getPrices(slider, slider1);
	});

	$("#price_slider .max").focus(function(){
		$(this).val("");
	});

	$("#price_slider .max").focusout(function(){
		setSliderSpans('price_slider', slider1, 'р');
		var valueMax = $("#price_slider .max").val(),
		valueMaxFloat = parseFloat(valueMax);
		maxMorePrice(slider1,valueMaxFloat);
		getPrices(slider, slider1);
	});

	$(".b_filtr-button").click(function(){
		var sliderValues = getSliderVals(slider);
		minArea = sliderValues[0];
		maxArea = sliderValues[1];
		var slider1Values = getSliderVals(slider1);
		minPrice = slider1Values[0];
		maxPrice = slider1Values[1];

		var meanings = [];
		$("input[name='meaningId']:checked").each(function(){
			meanings.push($(this).attr('value'));
		});

		var data = {
			minArea: minArea,
			maxArea: maxArea,
			minPrice: minPrice,
			maxPrice: maxPrice,
			meanings: meanings,
			searchAreaMore: searchAreaMore,
			searchPriceMore: searchPriceMore
		};

		//console.log(data);

		$(".close-layout").show();
		$.ajax({
		  type: "POST",
		  url: '/filtred',
		  data: data,
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      //console.log('success');
		      console.log(data);
		      if (data.resultExist) {
		      	// print offices & objects		
		      $('.b_offices-item a').each(function(){
		      	$(this).parent().hide();
		      });
		      for (var i = data.officesId.length - 1; i >= 0; i--) {
		      	$('.b_offices-item a').each(function(){
		      		officeIdArr = $(this).attr('href').split(':');
		      		officesid = officeIdArr[1];
		      		if (data.officesId[i] == officesid) {
		      			$(this).parent().show();
		      		}
		      	});
		      };
		      // map.geoObjects.removeAll();

		      $(".b_filtr-button").click(function(){
		          for (var i = placemarks.length - 1; i >= 0; i--) {
		              map.geoObjects.remove(placemarks[i]);
		          };
		          //map.geoObjects.removeAll()
		      });


		      //clusterer.remove(placemarks);

		      // map.geoObjects.remove(clusterer);

		      $(".b_filtr-button").click(function(){
		      	if (typeof(map) !== "undefined") map.geoObjects.remove(clusterer);
		      });

		      placemarks = [];
		      if (data.objects && (typeof(map) !== "undefined")) {
		      	for (var i = data.objects.length-1; i >= 0; i--) {
		      		var coords=data.objects[i].object_coordinates.split(',');
		      		var coordsInt = [];
		      		coordsInt[0] = parseFloat(coords[0]);
		      		coordsInt[1] = parseFloat(coords[1]);
		      		placemarks[i] = new ymaps.Placemark(coordsInt,{
		          		balloonContent: '<div class="balloon-wrap"><div class="balloon-text"><a href="/offices:'+data.objects[i].object_id+'" class="balloon-heading">'+data.objects[i].object_name+'</a>\
		          		<div class="balloon-adres"><span class="glyphicon glyphicon-map-marker"></span> '+data.objects[i].object_addres+'</div>\
		          		</div>\
		          		<div class="balloon-img"><a href="/offices:'+data.objects[i].object_id+'"><img src="'+data.imgFolder+data.objects[i].image_name+'" alt="" /></a></div>\
		          		<p><a class="blue-link" href="/offices:'+data.objects[i].object_id+'">Найдено '+data.objects[i].offices.length+' помещений</a></p>\
		          		<p><a href="/offices:'+data.objects[i].object_id+'" class="red-link">Подробнее &gt;</a></p><div class="clearfix"></div></div>',
		          		//hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>",
		          		hintContent: "<a href='/offices:"+data.objects[i].object_id+"' class='baloon-heading'>"+data.objects[i].object_name+"</a><p><strong><a href='/offices:"+data.objects[i].object_id+"'>"+data.objects[i].object_addres+"</a></strong></p>\
                    	<p><a href='/offices:"+data.objects[i].object_id+"'>Найдено "+data.objects[i].offices.length+" помещений</a></p>",
                    	clusterCaption: data.objects[i].object_name,
		      		},
		      		{
                    	preset: 'islands#redDotIcon'
                	});
		      		map.geoObjects.add(placemarks[i]);
		      		map.events.add('click', function (e) {  
		      		    map.balloon.close();
		      		});
		        };
		        $(".ymaps-map").hide().fadeIn("fast");
		      };
		      if (data.objects && (typeof(map) !== "undefined")){
			      var clusterer;
			      clusterer = new ymaps.Clusterer({ hasBalloon: true, disableClickZoom: true});
			      clusterer.add(placemarks);
			      map.geoObjects.add(clusterer);
			  }

		      $(".empty-result").hide();
		      }else{
		      	// print offices is empty
		      	$('.b_offices-item a').each(function(){
		      		$(this).parent().hide();
		      	});
		      	$(".empty-result").show();
		      };
		      //console.log(data);
		  //setTimeout('$(".close-layout").toggle()',2000);
		  $(".close-layout").hide();
		  // alert($(".b_filtr-trigger").is(':visible'));
		  if ($(".b_filtr-trigger").is(':visible')) {
		  	$(".b_filtr").hide();
		  	$(".b_filtr-results").show();
		  }
		  if (placemarks[0]) placemarks[0].hint.open();
		  if (typeof(map) !== "undefined") map.events.add('click', function (e) {  
		      map.balloon.close();
		  });
		  $(".b_filtr-results").empty();
            for (var i = 0; i < data.objects.length; i++) {
                var appendString = "<div class='b_filtr-results-object'>";
                if (data.objects[i].offices.length > 1) appendString = appendString + "<p class='b_filtr-results-objectname'>"+data.objects[i].object_name+", "+data.objects[i].object_addres+"</p>";
                for (var j = 0; j < data.objects[i].offices.length; j++) {
                    appendString = appendString + "<a href='/offices:"+data.objects[i].object_id+"'>";
                    if (data.objects[i].offices.length > 1) appendString = appendString + "<div class='b_filtr-results-office'>";
                        appendString = appendString + "<div class='b_filtr-results-office-description'>";
                            appendString = appendString + "<div class='b_filtr-results-office-description-name'>"+data.objects[i].offices[j].office_description+"</div>";
                            appendString = appendString + "<div class='b_filtr-results-office-description-addres'><span class='glyphicon glyphicon-map-marker'></span> "+data.objects[i].object_addres+"</div>";
                        appendString = appendString + "</div>";
                        appendString = appendString + "<div class='b_filtr-results-office-img'>";
                            appendString = appendString + "<img src='"+data.imgFolder+data.objects[i].offices[j].office_image+"' width=100 height=75>";
                        appendString = appendString + "</div>";
                        appendString = appendString + "<div class='clearfix'></div>";
                        appendString = appendString + "<div class='b_filtr-results-office-numbers'>";
                            appendString = appendString + "<div>Цена за м<sup>2</sup>: <span class='b_filtr-results-office-numbers-blue'>"+data.objects[i].offices[j].office_subprice+" р</span></div>";
                            appendString = appendString + "<div class='b_filtr-results-office-numbers-area'>Площадь: <span class='b_filtr-results-office-numbers-blue'>"+data.objects[i].offices[j].office_area+" м<sup>2</sup></span></div>";
                            appendString = appendString + "<div class='clearfix'></div>";
                        appendString = appendString + "</div>";
                        appendString = appendString + "<div class='clearfix'></div>";
                    if (data.objects[i].offices.length > 1) appendString = appendString + "</div>";
                    appendString = appendString + "</a>";
                }
                if (data.objects[i].offices.length > 1) appendString = appendString + "<div class='b_filtr-results-object-viewall'><a href='/offices:"+data.objects[i].object_id+"'>Просмотреть всё по этому адресу</a></div>"
                appendString = appendString + "</div>";
                $(".b_filtr-results").append(appendString);
            }

		  },
		  error: function(status){
		  	console.log(status);
		  	$(".close-layout").hide();
		  }
		});
	});

	$(".b_filtr-results").hide();
	$(".b_filtr-buttons-results").click(function(){
		$(".b_filtr").hide();
		$(".b_filtr-results").show();
		$(this).addClass("active");
		$(".b_filtr-buttons-filtr").removeClass("active");
	});

	$(".b_filtr-buttons-filtr").click(function(){
		$(".b_filtr-results").hide();
		$(".b_filtr").show();
		$(this).addClass("active");
		$(".b_filtr-buttons-results").removeClass("active");
	});

}

var allCount = $(".load-next").attr('data-title');
allCount = parseInt(allCount);


if ($(".b_offices-item").length == allCount) {
	$(".load-next a").hide();
}

// $(".b_filtr input[type=text]").focus(function(){
// 	$(this).val("");
// });


$("span.dei-modal-trigger").click(function(){
	$(".dei-modal").hide();
	$(this).next(".dei-modal").show();
});

$("span.dei-modal-cancel").click(function(){
	$(".dei-modal").hide();
	$(this).next(".dei-modal").hide();
});

