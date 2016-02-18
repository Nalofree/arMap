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

var data = {};
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

// arMap.get('/', function(req, res){
// 	connection.query('SELECT * FROM objects LEFT JOIN images_object\
// 										ON images_object_object = object_id LEFT JOIN images\
// 										ON image_id = images_object_image', 
// 		function(error, result, fields){
// 			if (error) throw error;
// 		    //console.log(result[0].role_name, result.length);
// 		    //object = result[0];
// 		    var objects=[];
// 		    for (var i = result.length - 1; i >= 0; i--) {
// 		      	objects[i] = {
// 		      		object_id: result[i].object_id,
// 		      		object_name: result[i].object_name,
// 		      		object_coordinates: result[i].object_coordinates,
// 		      		object_addres: result[i].object_addres,
// 		      		object_show: result[i].object_show,
// 		      		object_image: result[i].image_name
// 		      	}};

// 		    res.render('home.jade', {
// 		    	rows: result.length,
// 		    	objects: objects,
// 		    	imgFolder: 'img/obj_imgs/'
// 		    });

// 				// res.send({
// 		  //   	rows: result.length,
// 		  //   	objects: objects,
// 		  //   	imgFolder: 'img/obj_imgs/'
// 		  //   });
// 	});
// });

arMap.get('/mapobj', function(req, res){
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

		    res.send({
		    	rows: result.length,
		    	objects: objects,
		    	imgFolder: 'img/obj_imgs/'
		    });
	});
});

arMap.get('/', function(req, res){
	connection.query('SELECT * FROM meanings', function(error, result, fields){
		if (error) throw error;
		var meanings = [];
		for (var i = result.length - 1; i >= 0; i--) {
			meanings[i] = {maeningsName: result[i].meaning_name, meaningsId:result[i].meaning_id}
		}
		res.render('home.jade', {meanings: meanings})
	});
});

arMap.get('/objects', function(req, res){
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

		    res.render('objects.jade', {
		    	rows: result.length,
		    	objects: objects,
		    	imgFolder: 'img/obj_imgs/'
		    });
	});
});



arMap.get('/offices:objectid', function(req, res){
	var objectidarr = req.params.objectid.split(':');
	var objectid = objectidarr[1];
	connection.query('SELECT object_name, object_addres FROM objects WHERE object_id='+objectid, function(error,result,fields){
		if (error) throw erroe;
		objectName = result[0].object_name;
		objectAdres = result[0].object_addres;
		connection.query('SELECT * FROM offices	LEFT JOIN images_office ON images_office_office = office_id LEFT JOIN images ON image_id = images_office_image WHERE office_object ='+objectid+' AND image_cover = 1', function(error, result, fields){
	  	if (error) throw error;
	  	var offices=[];
	  	for (var i = result.length - 1; i >= 0; i--) {
	  		offices[i] = {
	  			officeId: result[i].office_id,
	  			officeDescription: result[i].office_description,
	  			officeArea: result[i].office_area,
	  			officePrice: result[i].office_totalprice,
	  			officeSubprice: result[i].office_subprice,
	  			officeStatus: result[i].office_status,
	  			officeImage: result[i].image_name,
	  			officeObject: result[i].office_object,
	  			objectName: objectName,
	  			objectAdres: objectAdres
	  		};
	  	};
	  	connection.query('SELECT * FROM meanings', function(error, result, fields){
	  	if (error) throw error;
	  	var meanings = [];
	  	for (var i = result.length - 1; i >= 0; i--) {
	  		meanings[i] = {maeningsName: result[i].meaning_name, meaningsId:result[i].meaning_id}
	  	}
		  	res.render('offices.jade', {
		  		offices: offices,
		  		meanings: meanings,
		  		imgFolder: 'img/obj_imgs/'
		  	});
		  });
  	});
	});
  //res.send(objectid[1]);
});



arMap.get('/currentoffice:officeid', function(req, res){
	var officeidarr = req.params.officeid.split(':');
	var officeid = officeidarr[1];
	connection.query('SELECT * FROM offices WHERE office_id = '+officeid, function(error, result, fields){
		var office;
		if (error) throw error;
	  office = {
	  	officeId: result[0].office_id,
	  	officeDescription: result[0].office_description,
	  	officeArea: result[0].office_area,
	  	officePrice: result[0].office_totalprice,
	  	officeSubprice: result[0].office_subprice,
	  	officeStatus: result[0].office_status,
	  	officeObject: result[0].office_object,
	  };
	  connection.query('SELECT * FROM images_office LEFT JOIN images ON image_id = images_office_image WHERE images_office_office='+officeid, function(error, result, fields){
	  	if (error) throw error;
	  	var imgs = [];
	  	for (var i = result.length - 1; i >= 0; i--) {
	  		imgs[i] = result[i].image_name;
	  	}
	  	office.images = imgs;
	  	connection.query('SELECT * FROM included_services_office LEFT JOIN included_services ON includes_id = included_services_office_service WHERE included_services_office_office='+officeid, function(error, result, fields){
	  		if (error) throw error;
	  		var includes = [];
	  		for (var i = result.length - 1; i >= 0; i--) {
	  			includes[i] = result[i].includes_name;
	  		}
	  		office.includes = includes;
	  		connection.query('SELECT * FROM extended_services_office LEFT JOIN extended_services ON extendes_id = extended_services_office_service WHERE extended_services_office_office='+officeid, function(error, result, fields){
	  			if (error) throw error;
	  			var extendes = [];
	  			for (var i = result.length - 1; i >= 0; i--) {
	  				extendes[i] = result[i].extendes_name;
	  			}
	  			office.extendes = extendes;
	  			connection.query('SELECT * FROM providers_office LEFT JOIN providers ON provider_id = providers_office_provider WHERE providers_office_office='+officeid, function(error, result, fields){
	  				if (error) throw error;
	  				var providers = [];
	  				for (var i = result.length - 1; i >= 0; i--) {
	  					providers[i] = result[i].provider_name;
	  				}
	  				office.providers = providers;
	  				
	  				res.render('currentoffice.jade', {
	  					office: office,
	  					imgFolder: 'img/obj_imgs/'
	  				});
	  			});
	  		});
	  	});
	  });
	});
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
	connection.query('SELECT * FROM objects LEFT JOIN images_object\
										ON images_object_object = object_id LEFT JOIN images\
										ON image_id = images_object_image', 
		function(error, result, fields){
			if (error) throw error;
		    var objects=[];
		    //for (var i = result.length - 1; i >= 0; i--) {
		  for (var i = 0; i <= result.length - 1; i++) {
		   	objects[i] = {
		   		object_id: result[i].object_id,
		   		object_name: result[i].object_name,
		   		object_coordinates: result[i].object_coordinates,
		   		object_addres: result[i].object_addres,
		   		object_show: result[i].object_show,
		   		object_image: result[i].image_name,
		   		offices: []
		   	};
		   	console.log(result[i]);
		  };
		  connection.query('SELECT * FROM offices', function(error, result, fields){
		  	if (error) throw error;
		  	var offices=[];
		  	for (var i = result.length - 1; i >= 0; i--) {
		  		offices[i] = {
		  			officeId: result[i].office_id,
		  			officeDescription: result[i].office_description,
		  			officeArea: result[i].office_area,
		  			officePrice: result[i].office_totalprice,
		  			officeStatus: result[i].office_status,
		  			officeObject: result[i].office_object
		  		};
		  	};
		  	for (var i = objects.length - 1; i >= 0; i--) {
		  		for (var j = offices.length - 1; j >= 0; j--) {
		  			if (offices[j].officeObject === objects[i].object_id){
		  				objects[i].offices.push(offices[j]);
		  			};
		  			console.log(objects[i].object_name+': '+objects[i].offices.length);
		  		};		  		
		  	};
		  	
		  	res.render('addobject.jade', {
		  		objects: objects,
		  		imgFolder: 'img/obj_imgs/'
		  	});
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

	if (delOrUpdObj[1]==='deleteOfc') {
		connection.query('SELECT images_office_image FROM images_office WHERE images_office_office = '+delOrUpdObj[2], function(error, result){
				console.log(error);
				console.log(result);
				imageId = result[0].images_office_image;
				console.log(imageId);

				connection.query('DELETE FROM images_office WHERE images_office_office = '+delOrUpdObj[2], function(error, result){
						console.log(error);
						console.log(result);

						connection.query('DELETE FROM images WHERE image_id = '+imageId, function(error, result){
								console.log(error);
								console.log(result);

								connection.query('DELETE FROM included_services_office WHERE included_services_office_office = '+delOrUpdObj[2], function(error, result){
										console.log(error);
										console.log(result);

										connection.query('DELETE FROM extended_services_office WHERE extended_services_office_office = '+delOrUpdObj[2], function(error, result){
												console.log(error);
												console.log(result);

												connection.query('DELETE FROM providers_office WHERE providers_office_office = '+delOrUpdObj[2], function(error, result){
														console.log(error);
														console.log(result);

														connection.query('DELETE FROM meanings_office WHERE meanings_office_office = '+delOrUpdObj[2], function(error, result){
																console.log(error);
																console.log(result);

																connection.query('DELETE FROM offices WHERE office_id = '+delOrUpdObj[2], function(error, result){
																		console.log(error);
																		console.log(result);
																});
														});
												});
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
	connection.query('SELECT * FROM included_services ORDER BY includes_id DESC', function(error, result, fields){
		if (error) throw error;
		if (result.length > 0) {
		}
		includes = result;
		connection.query('SELECT * FROM extended_services ORDER BY extendes_id DESC', function(error, result, fields){
				if (error) throw error;
				extendes = result;
				connection.query('SELECT * FROM providers ORDER BY provider_id DESC', function(error, result, fields){
						if (error) throw error;
						providers = result;
						connection.query('SELECT * FROM meanings ORDER BY meaning_id DESC', function(error, result, fields){
								if (error) throw error;
								meanings = result;
								connection.query('SELECT * FROM objects', function(error, result, fields){
										if (error) throw error;
										objects = result;

										var addoffice = {};
										addoffice.includes = includes;
										addoffice.extendes = extendes;
										addoffice.providers = providers;
										addoffice.meanings = meanings;
										addoffice.objects = objects;
										//console.log(objects);
										res.render('addoffice.jade', addoffice);

									});
							});
					});
			});
	});
});


arMap.post('/addoffice', function(req,res){
	connection.query('INSERT INTO owners (owner_contact) VALUES ("'+req.body.officeownertel+'")', function(error, result, fields){
		if (error) throw error;
		var newOwnerId = result.insertId;
		connection.query('INSERT INTO offices (office_description,\
																					 office_area,\
																					 office_subprice,\
																					 office_totalprice,\
																					 office_owner,\
																					 office_object)\
											VALUES ("'+req.body.officename+'",\
															"'+req.body.officearea+'",\
															"'+req.body.officesubprice+'",\
															"'+req.body.officetotalprice+'",\
															"'+newOwnerId+'",\
															"'+req.body.officeaddtoobject+'"\
															)', function(error, result, fields){
				if (error) throw error;
				var newOfficeId = result.insertId;
				var imgValues= '';
				var officeimages = new Array();
					officeimages = req.body.officeimage;
					if (typeof(officeimages) == 'object') {
						for (var i = officeimages.length - 1; i >= 0; i--) {
							imgValues += '("'+officeimages[i]+'", "'+newOfficeId+'"),';
						};
						imgValues = imgValues.substring(0, imgValues.length - 1);
					}else{
						imgValues += '("'+officeimages+'", "'+newOfficeId+'")';
					};
				
				connection.query('INSERT INTO images_office (images_office_image, images_office_office)\
													VALUES '+imgValues, 
				function(error, result, fields){
					if (error) throw error;
					connection.query('UPDATE images SET image_cover = 1 WHERE image_id = '+req.body.useascover,
						function(error, result, fields){
						if (error) throw error;
						var includesValues = '';
						var includes = new Array();
						includes = req.body.includes;
						if (typeof(includes) == 'object') {
							for (var i = includes.length - 1; i >= 0; i--) {
								includesValues += '("'+includes[i]+'", "'+newOfficeId+'"),';
							};
							includesValues = includesValues.substring(0, includesValues.length - 1);
						}else{
							includesValues += '("'+includes+'", "'+newOfficeId+'")';
						};
						connection.query('INSERT INTO included_services_office (included_services_office_service, included_services_office_office)\
													VALUES '+includesValues, function(error, result, fields){
							if (error) throw error;
							var extendesValues = '';
							var extendes = new Array();
							extendes = req.body.extendes;
							if (typeof(extendes) == 'object') {
								for (var i = extendes.length - 1; i >= 0; i--) {
									extendesValues += '("'+extendes[i]+'", "'+newOfficeId+'"),';
								};
								extendesValues = extendesValues.substring(0, extendesValues.length - 1);
							}else{
								extendesValues += '("'+extendes+'", "'+newOfficeId+'")';
							};
							connection.query('INSERT INTO extended_services_office (extended_services_office_service, extended_services_office_office)\
														VALUES '+extendesValues, function(error, result, fields){
								if (error) throw error;
								var providersValues = '';
								var providers = new Array();
								providers = req.body.providers;
								if (typeof(providers) == 'object') {
									for (var i = providers.length - 1; i >= 0; i--) {
										providersValues += '("'+providers[i]+'", "'+newOfficeId+'"),';
									};
									providersValues = providersValues.substring(0, providersValues.length - 1);
								}else{
									providersValues += '("'+providers+'", "'+newOfficeId+'")';
								};
								connection.query('INSERT INTO providers_office (providers_office_provider, providers_office_office)\
															VALUES '+providersValues, function(error, result, fields){
									if (error) throw error;
									var meaningsValues = '';
									var meanings = new Array();
									meanings = req.body.meanings;
									if (typeof(meanings) == 'object') {
										for (var i = meanings.length - 1; i >= 0; i--) {
											meaningsValues += '("'+meanings[i]+'", "'+newOfficeId+'"),';
										};
										meaningsValues = meaningsValues.substring(0, meaningsValues.length - 1);
									}else{
										meaningsValues += '("'+meanings+'", "'+newOfficeId+'")';
									};
									connection.query('INSERT INTO meanings_office (meanings_office_meaning, meanings_office_office)\
																VALUES '+meaningsValues, function(error, result, fields){
										if (error) throw error;
									});
								});
							});
						});
					});					
				});
			});
		});
	//console.log(req.body);
	res.redirect('/admin');
});


arMap.post('/addincludes', function(req, res){
	console.log(req.body);
	connection.query('INSERT INTO included_services (includes_name) VALUES ("'+req.body.val+'")', function(error, result, fields){
		if (error) throw error;
		var newServiceId = result.insertId;
		console.log(newServiceId);
		connection.query('SELECT * FROM included_services WHERE includes_id = '+newServiceId, function(error, result, fields){
				if (error) throw error;
				console.log(result[0]);
				res.send(result[0]);
			});
	});
});

arMap.post('/addextendes', function(req, res){
	console.log(req.body);
	connection.query('INSERT INTO extended_services (extendes_name) VALUES ("'+req.body.val+'")', function(error, result, fields){
		if (error) throw error;
		var newServiceId = result.insertId;
		console.log(newServiceId);
		connection.query('SELECT * FROM extended_services WHERE extendes_id = '+newServiceId, function(error, result, fields){
				if (error) throw error;
				console.log(result[0]);
				res.send(result[0]);
			});
	});
});

arMap.post('/addprovider', function(req, res){
	console.log(req.body);
	connection.query('INSERT INTO providers (provider_name) VALUES ("'+req.body.val+'")', function(error, result, fields){
		if (error) throw error;
		var newServiceId = result.insertId;
		console.log(newServiceId);
		connection.query('SELECT * FROM providers WHERE provider_id = '+newServiceId, function(error, result, fields){
				if (error) throw error;
				console.log(result[0]);
				res.send(result[0]);
			});
	});
});

arMap.post('/addmeaning', function(req, res){
	console.log(req.body);
	connection.query('INSERT INTO meanings (meaning_name) VALUES ("'+req.body.val+'")', function(error, result, fields){
		if (error) throw error;
		var newServiceId = result.insertId;
		console.log(newServiceId);
		connection.query('SELECT * FROM meanings WHERE meaning_id = '+newServiceId, function(error, result, fields){
				if (error) throw error;
				console.log(result[0]);
				res.send(result[0]);
			});
	});
});

var upload1 = multer({ storage : storage}).single('officeimages');

arMap.post('/addofficeimg', function(req, res){
	upload1(req,res,function(err) {
	  if(err) {
	      return res.end("Error uploading file.");
	  }
	  console.log(req.file.filename);
	  connection.query('INSERT INTO images (image_name)\
											VALUES ("'+req.file.filename+'")', 
			function(error, result, fields){
				if (error) throw error;
				var currentImgId = result.insertId;
				connection.query('SELECT * FROM images WHERE image_id = '+currentImgId, function(error, result, fields){
						if (error) throw error;
						var imageData = {
							imageId: result[0].image_id,
							imageName: result[0].image_name,
							imageFolder: 'img/obj_imgs/',
						}
						res.send(imageData);
				});
		});
	});	
});

arMap.post('/changeofficestatus', function(req,res){
	var newStatus;
	if (req.body.status == 0) {
		newStatus = 1;
	}else{
		newStatus = 0;
	};
	console.log(req.body);
	connection.query('UPDATE offices SET office_status = '+newStatus+' WHERE office_id = '+req.body.officeId, function(error, result, fields){
		if (error) throw error;
		res.send('newStatus: '+newStatus);
	});
});

server = arMap.listen(3000,function(){
  console.log('Listening on port 3000');
});
