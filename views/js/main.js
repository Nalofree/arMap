
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

	$(".b_filtr-button").click(function(){
		//$("#filtrform").submit();
		var maxArea = $('#square_slider .noUi-handle-upper span').text();
		maxArea = maxArea.substring(0,maxArea.length-2);
		var minArea = $('#square_slider .noUi-handle-lower span').text();
		minArea = minArea.substring(0,minArea.length-2);
		var maxPrice = $('#price_slider .noUi-handle-upper span').text();
		maxPrice = maxPrice.substring(0,maxPrice.length-1);
		var minPrice = $('#price_slider .noUi-handle-lower span').text();
		minPrice = minPrice.substring(0,minPrice.length-1);
		var meanings = [];
		$("input[type=checkbox]:checked").each(function(){
			meanings.push($(this).attr('value'));
		});
		var data = {
			maxArea: maxArea,
			minArea: minArea,
			maxPrice: maxPrice,
			minPrice: minPrice,
			meanings: meanings
		}
		console.log(data);
		$.ajax({
		  type: "POST",
		  url: '/filtred',
		  data: data,
		  dataType: 'json',
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $('.b_offices-item a').each(function(){
		      	$(this).parent().hide();
		      });
		      for (var i = data.offices.length - 1; i >= 0; i--) {
		      	if (data.offices[i] == data.offices[i-1]){
		      		data.offices.splice(i, 1)
		      	};
		      }
		      var splOffices = data.offices;
		      for (var i = splOffices.length - 1; i >= 0; i--) {
		      	$('.b_offices-item a').each(function(){
		      		officeIdArr = $(this).attr('href').split(':');
		      		officesid = officeIdArr[1];
		      		if (splOffices[i] == officesid) {
		      			$(this).parent().show();
		      		}
		      	});
		      };

		      var marker = {
		      	iconImageClipRect: [[58, 4], [87, 45]],
		      	iconImageHref: 'img/incons2.png',
		        iconImageSize: [29, 41],
		        iconImageOffset: [-14, -40]
		      }

		      var placemarks2 = [];
        	for (var i = data.objects.length-1; i >= 0; i--) {
        		var coords=data.objects[i].object_coordinates.split(',');
        		var coordsInt = [];
        		coordsInt[0] = parseFloat(coords[0]);
        		coordsInt[1] = parseFloat(coords[1]);
        		placemarks2[i] = new ymaps.Placemark(coordsInt,{
							balloonContentHeader: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div>",		
			        balloonContentBody: "<p><strong>"+data.objects[i].object_addres+"</strong></p> <img src='"+data.imgFolder+data.objects[i].object_image+"' class='map-rouded-img' alt='' width=140 height=140 />",
			        balloonContentFooter: "<a href='/offices:"+data.objects[i].object_id+"'><div class='baloon-more'>Подробнее &gt;</div></a>",
			        hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>"
						},marker);
						map.geoObjects.add(placemarks2[i]);
        	};
        	

		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	});

	//footer send tel for callback

	$("#footercallbacksend").click(function(e){
		e.preventDefault();
		var comment = '',
				email = '',
				tel = $("#footercallbackfield").val();
				var data = {email: email, comment: comment, tel: tel, theme: 'Запрос обратного звонка'};
		if (tel) {
			console.log('send');
			console.log(data);
			$.ajax({
			  type: "POST",
			  url: '/sendmail',
			  data: data,
			  dataType: 'json',
			  success: function(data) {
			      console.log(data);
			      console.log('success');
			      $('.info-field.connect-red').before('<div class="tel-thanks"><h1>Спасибо!</h1>\
			      <p>Запрос принят. В ближайшее время наш оператор с вами свяжется.</p></div>');
			      setTimeout('$(".tel-thanks").hide()', 2000);
			  },
			  error: function(data, status, error){
			  	console.log(data+' '+status+' '+error);
			  }
			});
			
		}else{
			$("#footercallbackfield").css('background-color', '#fcc');
			console.log('no send');
		};

		$("#footercallbackfield").focus(function(){
			$(this).css('background-color', '#fff');
		});
	});

	$("#bodycallbacksend").click(function(e){
		e.preventDefault();
		var comment = '',
				email = '',
				tel = $("#bodycallbackfield").val();
				var data = {email: email, comment: comment, tel: tel, theme: 'Запрос обратного звонка'};
		if (tel) {
			console.log('send');
			console.log(data);
			$.ajax({
			  type: "POST",
			  url: '/sendmail',
			  data: data,
			  dataType: 'json',
			  success: function(data) {
			      console.log(data);
			      console.log('success');
			      $('.b_office_params-callback-form-text').after('<div class="tel-thanks"><h1>Спасибо!</h1>\
			      <p>Запрос принят. В ближайшее время наш оператор с вами свяжется.</p></div>');
			      setTimeout('$(".tel-thanks").hide()', 2000);
			  },
			  error: function(data, status, error){
			  	console.log(data+' '+status+' '+error);
			  }
			});
			
		}else{
			$("#bodycallbackfield").css('background-color', '#fcc');
			console.log('no send');
		};

		$("#bodycallbackfield").focus(function(){
			$(this).css('background-color', '#fff');
		});
	});

/*$('.info-field.connect-red').before('<div class="tel-thanks"><h1>Спасибо!</h1>\
			<p>Запрос принят. В ближайшее время наш оператор с вами свяжется.</p></div>');
			setTimeout('$(".tel-thanks").hide()', 2000);*/

	//footer send comment

	$("#footercommentsend").click(function(e){
		e.preventDefault();
		var comment = $("#footercomment").val(),
				email = $("#footercommentemail").val(),
				tel = '',
				validemail,
				pattern;

		validemail = (email.search(/.+@.+\..+/i) != -1);

		console.log(validemail);

		if (comment && email && validemail) {
			var data = {email: email, comment: comment, tel: tel, theme: 'Новый комментарий'};
			console.log(data);
			//console.log('send');
					$.ajax({
					  type: "POST",
					  url: '/sendmail',
					  data: data,
					  dataType: 'json',
					  success: function(data) {
					      console.log('success');
					      $('textarea#footercomment').before('<div class="tel-thanks"><h1>Спасибо!</h1>\
					      	<p>Письмо отправлено. В ближайшее время мы ответим вам.</p></div>');
					      	setTimeout('$(".tel-thanks").hide()', 2000);
					  },
					  error: function(data, status, error){
					  	console.log(data+' '+status+' '+error);
					  }
					});
		}else{
			if (!comment) {$("#footercomment").css('background-color', '#fcc');};
			if (!email) {$("#footercommentemail").css('background-color', '#fcc');};
			if (!validemail) {$("#footercommentemail").css('background-color', '#fcc');};
			console.log('no send');
		};

		$("#footercomment").focus(function(){
			$(this).css('background-color', '#fff');
		});
		$("#footercommentemail").focus(function(){
			$(this).css('background-color', '#fff');
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
		$.ajax({
			type: 'POST',
			url: '/bmarks',
			data: {bmarks: bmarks},
			dataType: 'json',
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
			},
			error: function(status){
			 	console.log(status);
			}
		});
	});

	var bmarks = getCookie("bmarks");
	var bmarksArr = bmarks.split(',');
	var bmarksColumn = bmarksArr.length ? bmarksArr.length : "0";
	//alert(bmarksColumn);
	/* bamerks column indication */
	$(".mark-ind").text(bmarksColumn);
	$(".b_offices-item").each(function(){
		var officeIdArr = $(this).children('a').attr('href').split(":");
		console.log(officeIdArr);
		var officeId = officeIdArr[1];
		console.log(officeId);
		if (bmarksArr.indexOf(officeId) >= 0) {
			$(this).children(".b_offices-item-text").children(".bmark-trigger").addClass("added");
		}
	});

	var date = new Date(new Date().getTime()+30*24*60*60*1000);
	$(".bmark-trigger").click(function(){
		var officeIdArr = $(this).parent().children('a').attr('href').split(":");
		console.log(officeIdArr);
		var officeId = officeIdArr[1];
		if ($(this).hasClass('added')){
			$(this).removeClass("added");
			$(this).attr("data-title","Добавить в закладки");
			//alert('set cookie add bmark: '+officeId);
			//get_cookie("bmarks["+officeId+"]");
			//alert('set cookie del bmark: '+officeId);
			var bmarks = getCookie("bmarks");
			var bmarksArr = bmarks.split(',');
			bmarksArr.splice(bmarksArr.indexOf(officeId),1);
			bmarks = bmarksArr.join(',');
			delete_cookie("bmarks");
			setCookie("bmarks", bmarks, 30);
			getCookie("bmarks");
			console.log(document.cookie);
			//alert(document.cookie);
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
			//alert(document.cookie);
		};
		// alert(document.cookie);
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


