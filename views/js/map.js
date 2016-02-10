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

	var marker = {
		iconImageClipRect: [[58, 4], [87, 45]],
		iconImageHref: 'img/incons2.png',
        iconImageSize: [29, 41],
        iconImageOffset: [-14, -40]
	}

	var placemark = new ymaps.Placemark([52.282057,104.295219],{
		balloonContentHeader: "<div class='baloon-heading'>ТЦ 'Рублёв'</div>",		
        balloonContentBody: "<p><strong>г. Иркутск ул. Чехова д. 19</strong></p> <p>Бизнес центр, 6 этажей</p><img src='img/DSC04629.jpg' class='map-rouded-img' alt='' width=140 height=140 />",
        balloonContentFooter: "<div class='baloon-more'>Подробнее &gt;</div>",
        hintContent: "<div class='baloon-heading'>ТЦ 'Рублёв'</div><p><strong>г. Иркутск ул. Чехова д. 19</strong></p>"
	},marker);

	var placemark2 = new ymaps.Placemark([52.280000,104.290000],{
		balloonContentHeader: "<div class='baloon-heading'>ТЦ 'Рублёв'</div>",		
        balloonContentBody: "<p><strong>г. Иркутск ул. Чехова д. 19</strong></p> <p>Бизнес центр, 6 этажей</p><img src='img/DSC04629.jpg' class='map-rouded-img' alt='' width=140 height=140 />",
        balloonContentFooter: "<div class='baloon-more'>Подробнее &gt;</div>",
        hintContent: "<div class='baloon-heading'>ТЦ 'Рублёв'</div><p><strong>г. Иркутск ул. Чехова д. 19</strong></p>"
	},marker);

	map.geoObjects.add(placemark);
	map.geoObjects.add(placemark2);
	// placemark.balloon.open();
	console.log(placemark.balloonContentBody);
});

