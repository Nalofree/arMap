var map;
ymaps.ready(function(){
	map = new ymaps.Map("b_mainmap", {
		center: [52.282057,104.295219],
		zoom: 14
	});
	map.controls.add('zoomControl', {
		right: 5,
		bottom: 45
	});
	
	map.behaviors.enable('scrollZoom');

	var marker = {
		iconImageClipRect: [[58, 4], [87, 45]],
		iconImageHref: 'img/incons2.png',
        iconImageSize: [29, 41],
        iconImageOffset: [-14, -40]
	}

	$.ajax('/mapobj', {
        type: 'GET',
        dataType: 'json',
        success: function(data) { 
        	//console.log(data);
        	var placemarks = [];
        	for (var i = data.rows - 1; i >= 0; i--) {
        		var coords=data.objects[i].object_coordinates.split(',');
        		//console.log(coords);
        		var coordsInt = [];
        		coordsInt[0] = parseFloat(coords[0]);
        		coordsInt[1] = parseFloat(coords[1]);
        		//console.log(coordsInt);
        		placemarks[i] = new ymaps.Placemark(coordsInt,{
					balloonContentHeader: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div>",		
			        balloonContentBody: "<p><strong>"+data.objects[i].object_addres+"</strong></p> <img src='"+data.imgFolder+data.objects[i].object_image+"' class='map-rouded-img' alt='' width=140 height=140 />",
			        balloonContentFooter: "<a href='/offices:"+data.objects[i].object_id+"'><div class='baloon-more'>Подробнее &gt;</div></a>",
			        hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>"
				},marker);
				map.geoObjects.add(placemarks[i]);
				$('#placemarksCount').val(data.rows);
        	};

        	$(".b_filtr-button").click(function(){
        		for (var i = data.rows - 1; i >= 0; i--) {
        			map.geoObjects.remove(placemarks[i]);
        		};
        	});
        },
        error  : function()     { console.log("fuckup"); }
    });
});

