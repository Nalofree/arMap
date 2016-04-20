var map, clusterer;
var placemarks = [];
ymaps.ready(function(){
	map = new ymaps.Map("b_mainmap", {
		center: [52.304595,104.247358],
		zoom: 12,
        controls: ["fullscreenControl"]
	});
    
   map.controls.add("zoomControl",{
        position: {
            right: 5,
            bottom: 45
        }
    });

   map.controls.add("fullscreenControl",{
        position: {
            top: 55,
            right: 5
        }
    });

	map.behaviors.enable('scrollZoom')
    
	$.ajax('/mapobj', {
        type: 'GET',
        dataType: 'json',
        timeout: 10000,
        success: function(data) { 
        	//console.log(data);
        	
        	for (var i = data.rows - 1; i >= 0; i--) {
        		var coords=data.objects[i].object_coordinates.split(',');
        		//console.log(coords);
        		var coordsInt = [];
        		coordsInt[0] = parseFloat(coords[0]);
        		coordsInt[1] = parseFloat(coords[1]);
        		//console.log(coordsInt);
        		placemarks[i] = new ymaps.Placemark(coordsInt,{
                    balloonContent: '<div class="balloon-wrap"><div class="balloon-text"><a href="/offices:'+data.objects[i].object_id+'" class="balloon-heading">'+data.objects[i].object_name+'</a>\
                        <div class="balloon-adres"><span class="glyphicon glyphicon-map-marker"></span> '+data.objects[i].object_addres+'</div>\
                        </div>\
                        <div class="balloon-img"><a href="/offices:'+data.objects[i].object_id+'"><img src="'+data.imgFolder+data.objects[i].object_image+'" alt="" /></a></div>\
                        <p><a class="blue-link" href="/offices:'+data.objects[i].object_id+'">Найдено '+data.objects[i].offices.length+' помещений</a></p>\
                        <p><a href="/offices:'+data.objects[i].object_id+'" class="red-link">Подробнее &gt;</a></p><div class="clearfix"></div></div>',
                        //hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>",
                        hintContent: "<a href='/offices:"+data.objects[i].object_id+"' class='baloon-heading'>"+data.objects[i].object_name+"</a><p><strong><a href='/offices:"+data.objects[i].object_id+"'>"+data.objects[i].object_addres+"</a></strong></p>\
                        <p><a href='/offices:"+data.objects[i].object_id+"'>Найдено "+data.objects[i].offices.length+" помещений</a></p>",
                        clusterCaption: data.objects[i].object_name,

                    /*balloonContent: '<div class="balloon-wrap"><a href="/offices:'+data.objects[i].object_id+'" class="balloon-heading">'+data.objects[i].object_name+'</a>\
                    <div class="balloon-adres"><span class="glyphicon glyphicon-map-marker"></span> '+data.objects[i].object_addres+'</div>\
                    <a href="/offices:'+data.objects[i].object_id+'" class="balloon-img"><img src="'+data.imgFolder+data.objects[i].object_image+'" alt="" /></a><div class="clearfix"></div>\
                    <!--p><a class="blue-link" href="/offices:'+data.objects[i].object_id+'">Найдено '+data.objects.length+' помещений</a></p-->\
                    <a href="/offices:'+data.objects[i].object_id+'">Подробнее &gt;</a></div>',
                    //hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>"
					balloonContentHeader: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div>",		
			        balloonContentBody: "<p><strong>"+data.objects[i].object_addres+"</strong></p> <img src='"+data.imgFolder+data.objects[i].object_image+"' class='map-rouded-img' alt='' width=140 height=140 />",
			        balloonContentFooter: "<a href='/offices:"+data.objects[i].object_id+"'><div class='baloon-more'>Подробнее &gt;</div></a>",
                    balloonContent: '<div class="balloon-wrap"><a href="/offices:'+data.objects[i].object_id+'" class="balloon-heading">'+data.objects[i].object_name+'</a>\
                    <div class="balloon-adres"><span class="glyphicon glyphicon-map-marker"></span> '+data.objects[i].object_addres+'</div>\
                    <a href="/offices:'+data.objects[i].object_id+'" class="balloon-img"><img src="'+data.imgFolder+data.objects[i].object_image+'" alt="" /></a><div class="clearfix"></div>\
                    <a href="/offices:'+data.objects[i].object_id+'">Подробнее &gt;</a></div>',
			        hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>",
                    //hasBalloon: false,
                    //href: "/offices:"+data.objects[i].object_id,
                    hintContent: "<div class='baloon-heading'>"+data.objects[i].object_name+"</div><p><strong>"+data.objects[i].object_addres+"</strong></p>\
                    <p><a href='/offices:"+data.objects[i].object_id+"'>Найдено "+data.objects.length+" помещений</a></p>",
                    //clusterCaption: 'Object #'+data.objects[i].object_id
                    clusterCaption: data.objects[i].object_name,*/
				},{
                    preset: 'islands#blueDotIcon',
                    href: "/offices:"+data.objects[i].object_id,
                    coords: coordsInt
                });
                placemarks[i].events.add('click', function(e){
                    //location = e.get('target').options.get('href');
                    //console.log(e.get('target').options);
                    //console.log(e.get('target').options._options.href);
                    //window.location.href = e.get('target').options._options.href;
                });

                map.geoObjects.add(placemarks[i]);
                $('#placemarksCount').val(data.rows);
                map.events.add('click', function (e) {  
                    map.balloon.close();
                });

        	};
            /*var myGeoObjects = [];

            for (var i = 0; i<placemarks.length; i++) {
              myGeoObjects[i] = new ymaps.GeoObject({
                geometry: {
                  type: "Point",
                  coordinates: placemarks[i].options._options.coords
                }
              });
            }

            var myClusterer = new ymaps.Clusterer();
            myClusterer.add(myGeoObjects);
            map.geoObjects.add(myClusterer);*/

        	$(".b_filtr-button").click(function(){
        		for (var i = placemarks.length - 1; i >= 0; i--) {
        			map.geoObjects.remove(placemarks[i]);
        		};
                $('.b_filtr-buttons-results').click();
                //map.geoObjects.removeAll()
        	});
            var clusterer = new ymaps.Clusterer({ hasBalloon: true, disableClickZoom: true});
            clusterer.add(placemarks);
            map.geoObjects.add(clusterer);
            
            $(".b_filtr-button").click(function(){
                map.geoObjects.remove(clusterer);
            });
            placemarks[0].hint.open();
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
        error  : function()     { console.log("fuckup"); }
    });
            $(".b_filtr-button").click(function(){
                for (var i = placemarks.length - 1; i >= 0; i--) {
                    map.geoObjects.remove(placemarks[i]);
                };
                //map.geoObjects.removeAll()
            });

});

