var express = require('express'),
    server,
    mysql = require('mysql'),    
    multer = require('multer'),
    arMap = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),    
    multiparty = require('multiparty'),
    connection;

connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin_armapuser',
  password : 'HQCbezLWux',
  database : 'admin_armap_db'
});

connection.connect();



var data = {
  home: 12,
  title: 'Поиск'
}

var objects = {
	img: 'img/DSC04629.jpg',
	heading: 'ТЦ "Рублёв" торгово-офисный центр',
	description: 'Чехова, 19',
	title: 'Объекты недвижимости'
}

var offices = {
	img: 'img/DSC04629.jpg',
	heading: 'Office #333, 3 stage ',
	description: {
		price: '9999',
		square: '9999'
	},
	title: 'Офисы'
}

var currentoffice = {
	imgs: [
		'img/DSC04629.jpg',
		'img/DSC04589.jpg',
		'img/DSC04588.jpg',
		'img/DSC04587.jpg',
		'img/DSC04629.jpg',
		'img/DSC04589.jpg',
		'img/DSC04588.jpg',
		'img/DSC04587.jpg'
	],
	heading: 'Office #333, 3 stage ',
	square: 26,
	description: {
		price: '9999',
		square: '9999'
	},
	title: 'Офисы',
	master: '+7 950 668 25 32'
}

	// var rows,
	// 		objects = [];

	//   connection.query('SELECT * FROM objects', function(error, result, fields){
	//   	if (error) throw err;
	//       rows = result.length;
	//       for (var i = result.length - 1; i >= 0; i--) {
	//       	objects[i] = {
	//       		object_id: result[i].object_id,
	//       		object_name: result[i].object_name,
	//       		object_coordinates: result[i].object_coordinates,
	//       		object_addres: result[i].object_addres,
	//       		object_show: result[i].object_show,
	//       		object_image: result[i].object_image
	//       	}
	//       	//result[i]
	//       };
	//       console.log(objects);
	//   });


	

var addoffice = {};


arMap.use(function(req,res,next){
	console.log('%s %s', req.method, req.url);
	next();
});

// arMap.use('/admin',function(req,res,next){
// 	var addobject = {};
// 	console.log(addobject);
// 	res.send(addobject);
// 	next();
// });

// connection.query('SELECT * FROM roles', function(error, result, fields){
// 	if (error) throw error;
//     console.log(result[0].role_name, result.length);
// });

//connection.end();

arMap.use(express.static(__dirname + '/views'));
arMap.use(bodyParser.urlencoded({extended: true}));

/*arMap.get('/admin', function(req,res,next){
	console.log('admin');
	next();
});*/

// arMap.use(function(req, res, next){
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
// 	res.header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept,Authorization');
// 	res.header('Access-Control-Allow-Credentials', 'true');
// });

arMap.get('/', function(req, res){
  res.render('home.jade', data);
});

arMap.get('/objects', function(req, res){
  res.render('objects.jade', objects);
});

arMap.get('/offices', function(req, res){
  res.render('offices.jade', offices);
});

arMap.get('/currentoffice', function(req, res){
  res.render('currentoffice.jade', currentoffice);
});

arMap.get('/bmarks', function(req, res){
  res.render('bmarks.jade', offices);
});

// arMap.use('/admin', function(req, res, next){
// 	var object;
// 	connection.query('SELECT * FROM roles', function(error, result, fields){
// 		if (error) throw error;
// 	    console.log(result[0].role_name, result.length);
// 	    object = result[0];
// 	});
// 	next();
// });

arMap.get('/admin', function(req, res){

	//console.log('debug: ' + object);

	connection.query('SELECT * FROM objects LEFT JOIN images_object\
										ON images_object_object = object_id LEFT JOIN images\
										ON image_id = images_object_image', 
		function(error, result, fields){
			if (error) throw error;
		    //console.log(result[0].role_name, result.length);
		    //object = result[0];
		    var objects=[];
		    for (var i = result.length - 1; i >= 0; i--) {
		      	objects[i] = {
		      		object_id: result[i].object_id,
		      		object_name: result[i].object_name,
		      		object_coordinates: result[i].object_coordinates,
		      		object_addres: result[i].object_addres,
		      		object_show: result[i].object_show,
		      		object_image: result[i].image_name
		      	}};

		    res.render('addobject.jade', {
		    	rows: result.length,
		    	objects: objects,
		    	imgFolder: 'img/obj_imgs/'
		    });
	});
});

arMap.get('/admin:whatwedoWithObj', function(req, res){
	console.log(req.params.whatwedoWithObj);
	var delOrUpdObj = req.params.whatwedoWithObj.split(':');
	if (delOrUpdObj[1]==='deleteObj') {
		connection.query('SELECT images_object_image FROM images_object WHERE images_object_object = '+delOrUpdObj[2], function(error, result){
				console.log(error);
				imageId = result[0].images_object_image;
				console.log(imageId);

				connection.query('DELETE FROM images_object WHERE images_object_object = '+delOrUpdObj[2], function(error, result){
						console.log(error);
						console.log(result);

						connection.query('DELETE FROM objects WHERE object_id = '+delOrUpdObj[2], function(error, result){
								console.log(error);
								console.log(result);

								connection.query('DELETE FROM images WHERE image_id = '+imageId, function(error, result){
										console.log(error);
										console.log(result);

										connection.query('UPDATE objects', function(error, result){
												console.log(error);
												console.log(result);
											});
									});
							});
					});
			});
	};
	res.redirect('/admin');
});

var storage =   multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'views/img/obj_imgs');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});

var upload = multer({ storage : storage}).single('objectimage');

arMap.post('/admin', function(req, res) {
	upload(req,res,function(err) {
	        if(err) {
	            return res.end("Error uploading file.");
	        }

	        var objectItem = {
	        	objectName: req.body.objectname,
	        	objectAdres: req.body.objectadres,
	        	objectCoords: req.body.objectcoords,
	        	pathImg: req.file.filename
	        }

	        console.log(objectItem);
	        //console.log(req.body);

	        connection.query('INSERT INTO objects (object_name,\
	         									object_coordinates,\
	         									object_addres)\
	         									VALUES ("'+objectItem.objectName+'",\
	         									"'+objectItem.objectCoords+'",\
	         									"'+objectItem.objectAdres+'")', 
	        function(error, result, fields){
						if (error) throw error;
							var currentObjId = result.insertId;
							console.log(currentObjId);

						connection.query('INSERT INTO images (image_name)\
												 			VALUES ("'+objectItem.pathImg+'")', 
							   function(error, result, fields){
							if (error) throw error;
								var currentImgId = result.insertId;
								console.log(currentImgId);

							connection.query('INSERT INTO images_object (images_object_image,\
																images_object_object)\
													 			VALUES ("'+currentImgId+'","'+currentObjId+'")', 
								   function(error, result, fields){
								if (error) throw error;
									var currentImgId = result.insertId;
									console.log(currentImgId);
							});

						});

					});

	        res.redirect('/admin');
	    });
	
});

arMap.get('/addoffice', function(req, res){
  res.render('addoffice.jade', addoffice);
});

server = arMap.listen(3000,function(){
  console.log('Listening on port 3000');
});
