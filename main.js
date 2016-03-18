var express = require('express'),
    server,
    path = require('path'),
    mysql = require('mysql'),    
    multer = require('multer'),
    arMap = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),    
    multiparty = require('multiparty'),
    sendmail = require('sendmail')(),
    cookieSession = require('cookie-session'),
    // im = require('imagemagick'),
    connection;

connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin_armapuser',
  password : 'HQCbezLWux',
  database : 'admin_armap_db'
});

connection.connect();

var data = {};
var addoffice = {};

arMap.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

arMap.use(function(req,res,next){
	console.log('%s %s', req.method, req.url);
	next();
});

arMap.set('views', path.join(__dirname, 'views/'));
arMap.set('img', path.join(__dirname, 'img/'));
//console.log(__dirname);
arMap.use(express.static(__dirname+'public/'));
arMap.use(bodyParser.urlencoded({extended: true}));

arMap.get('/auth', function(req,res){
	res.render('auth.jade',{title:'auth'});
});

arMap.post('/auth', function(req,res){
	var username = req.body.username,
	password = req.body.pass;
	console.log(req.body);
	connection.query('SELECT * FROM users WHERE user_name="'+username+'"', function(error, result, fields){
		if (error) throw error;
		if (result.length > 0 && password == result[0].user_pass) {
				role = result[0].user_role;
				connection.query('SELECT * FROM roles WHERE role_id='+role, function(error, result, fields){
					if (error) throw error;
					if (result.length > 0){
						req.session.username = username;
						req.session.role = result[0].role_name;
						console.log(req.session.role);
						//res.render('admin.jade', {username: result[0].user_name, role: result[0].role_name});
						//res.send({username: username, role: result[0].role_name});
						res.redirect('/admin');
					};
				});
		} else {
		    res.redirect('/admin');
		};
	});
	//res.render('auth.jade',{title:'auth'});
});

arMap.post('/sendmail', function(req,res){
	var content = 'Коммкнтарий: '+req.body.comment+' Свяжитесь со мной: '+req.body.tel+' '+req.body.email;//123
	sendmail({
	    from: 'no-reply@irkutsk-arenda.ru',
	    //to: 'arenda.38@yandex.ru',
	    to: 'support@t-code.ru',
	    subject: req.body.theme,
	    content: content,
	  }, function(err, reply) {
	    console.log(err && err.stack);
	    console.dir(reply);
	    console.log(req.body);
	    res.send(req.body);
	});
});

arMap.post('/filtred', function(req, res){
	var maxArea = req.body.maxArea, 
			minArea = req.body.minArea,
			maxPrice = req.body.maxPrice, 
			minPrice = req.body.minPrice,
			sign,
			meanings = [];

			if (req.body.meanings) {
				meanings = req.body.meanings;
			}

			if (meanings.length<=0) {
				meaningsExpr = '';
			}else{
				meanings = meanings.join(',');
				meaningsExpr = 'AND meanings_office_meaning IN ('+meanings+')';
			}
	connection.query('SELECT * FROM offices LEFT JOIN meanings_office ON meanings_office_office = office_id\
										WHERE office_area BETWEEN '+minArea+' AND '+maxArea+'\
										AND office_subprice BETWEEN '+minPrice+' AND '+maxPrice+' '+meaningsExpr, function(error, result, fields){
		if (error) throw error;
		var offices = [],
				objects = [],
				officesId = [],
				objectsId = [],
				resultExist;
				console.log(result.length);				
			if (result.length>0) {
				resultExist = true;
				for (var i = result.length - 1; i >= 0; i--) {
					officesId[i] = result[i].office_id;
					objectsId[i] = result[i].office_object;
				};
				for (var i = officesId.length - 1; i >= 0; i--) {
					if (officesId[i] == officesId[i-1]){
						officesId.splice(i, 1);
					};
				};
				if (officesId.length > 1) {
					var officeIdExpr = 'IN ('+officesId.join(',')+')';
				}else{
					var officeIdExpr = '= '+officesId[0];
				};
				for (var i = objectsId.length - 1; i >= 0; i--) {
					if (objectsId[i] == objectsId[i-1]){
						objectsId.splice(i, 1);
					};
				};
				if (objectsId.length > 1) {
					var objectIdExpr = 'IN ('+objectsId.join(',')+')';
				}else{
					var objectIdExpr = '= '+objectsId[0];
				};
				
				var data = {};

				connection.query('SELECT * FROM objects LEFT JOIN images_object ON images_object_object = object_id LEFT JOIN images ON image_id = images_object_image WHERE object_show = 1 AND object_id '+objectIdExpr, function(error, result,fields){
					if (error) throw error;
					for (var i = result.length - 1; i >= 0; i--) {
						objects[i] = {};
						objects[i].object_id = result[i].object_id;
						objects[i].object_name = decodeURI(result[i].object_name);
						objects[i].object_coordinates = result[i].object_coordinates;
						objects[i].object_addres = decodeURI(result[i].object_addres);
						objects[i].object_show = result[i].object_show;
						objects[i].image_name = result[i].image_name;
					};
					data = {resultExist: resultExist, officesId: officesId, objectsId: objectsId, objects: objects, imgFolder: 'img/obj_imgs/'};
					res.send(data);
				});
				
			}else{
				resultExist = false;
				res.send({resultExist: resultExist});
			}
	});
});

arMap.get('/mapobj', function(req, res){
	connection.query('SELECT * FROM objects LEFT JOIN images_object\
										ON images_object_object = object_id LEFT JOIN images\
										ON image_id = images_object_image WHERE object_show = 1', 
		function(error, result, fields){
			if (error) throw error;
		    //console.log(result[0].role_name, result.length);
		    //object = result[0];
		    var objects=[];
		    for (var i = result.length - 1; i >= 0; i--) {
		      	objects[i] = {
		      		object_id: result[i].object_id,
		      		object_name: decodeURI(result[i].object_name),
		      		object_coordinates: result[i].object_coordinates,
		      		object_addres: decodeURI(result[i].object_addres),
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
		res.render('home.jade', {meanings: meanings, ishome: 1});
		//res.send(__dirname);
	});
});

arMap.get('/objects', function(req, res){
	connection.query('SELECT * FROM objects LEFT JOIN images_object\
										ON images_object_object = object_id LEFT JOIN images\
										ON image_id = images_object_image WHERE object_show = 1', 
		function(error, result, fields){
			if (error) throw error;
		    //console.log(result[0].role_name, result.length);
		    //object = result[0];
		    var objects=[];
		    for (var i = result.length - 1; i >= 0; i--) {
		      	objects[i] = {
		      		object_id: result[i].object_id,
		      		object_name: decodeURI(result[i].object_name),
		      		object_coordinates: result[i].object_coordinates,
		      		object_addres: decodeURI(result[i].object_addres),
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
		objectName = decodeURI(result[0].object_name);
		objectAdres = result[0].object_addres;
		connection.query('SELECT * FROM offices	LEFT JOIN images_office ON images_office_office = office_id LEFT JOIN images ON image_id = images_office_image WHERE office_object ='+objectid+' AND image_cover = 1 AND office_status = 1 LIMIT 8', function(error, result, fields){
	  	if (error) throw error;
	  	var offices=[];
	  	if (result.length === 1) {
	  		res.redirect('/currentoffice:'+result[0].office_id);
	  	}
	  	for (var i = result.length - 1; i >= 0; i--) {
	  		offices[i] = {
	  			officeId: result[i].office_id,
	  			officeDescription: decodeURI(result[i].office_description),
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


arMap.post('/loadnext', function(req,res){
	console.log(req.body);
			connection.query('SELECT * FROM offices	LEFT JOIN images_office ON images_office_office = office_id LEFT JOIN images ON image_id = images_office_image WHERE office_object ='+req.body.objectId+' AND image_cover = 1 AND office_status = 1 LIMIT '+req.body.itemsCount+', 8', function(error, result, fields){
		  	if (error) throw error;
		  	var offices=[];
		  	for (var i = result.length - 1; i >= 0; i--) {
		  		offices[i] = {
		  			officeId: result[i].office_id,
		  			officeDescription: decodeURI(result[i].office_description),
		  			officeArea: result[i].office_area,
		  			officePrice: result[i].office_totalprice,
		  			officeSubprice: result[i].office_subprice,
		  			officeStatus: result[i].office_status,
		  			officeImage: result[i].image_name,
		  			//officeObject: result[i].office_object,
		  			//objectName: objectName,
		  			//objectAdres: objectAdres
		  		};
		  	};
			  res.send({n_offices: offices});
	  	});
});


arMap.get('/currentoffice:officeid', function(req, res){
	var officeidarr = req.params.officeid.split(':');
	var officeid = officeidarr[1];
	connection.query('SELECT * FROM offices LEFT JOIN owners ON owner_id = office_owner WHERE office_id = '+officeid, function(error, result, fields){
		var office;
		if (error) throw error;
	  office = {
	  	officeId: result[0].office_id,
	  	officeDescription: decodeURI(result[0].office_description),
	  	officeArea: result[0].office_area,
	  	officePrice: result[0].office_totalprice,
	  	officeSubprice: result[0].office_subprice,
	  	officeStatus: result[0].office_status,
	  	officeObject: result[0].office_object,
	  	officeOwner: result[0].owner_contact
	  };
	  connection.query('SELECT object_name, object_addres FROM objects WHERE object_id ='+office.officeObject, function(error, result, fields){
	  	if (error) throw error;
	  	office.officeAdres = decodeURI(result[0].object_addres);
	  	office.officeObjectName = decodeURI(result[0].object_name);
	  });
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
		  				/*office.officeArea*/
		  				var range;
		  				if ( parseInt(office.officeArea) > 0 && parseInt(office.officeArea) <= 25 ) {
		  					range = " BETWEEN  '0' AND '25' ";
		  				}else if ( parseInt(office.officeArea) > 25 && parseInt(office.officeArea) <= 50 ) {
		  					range = " BETWEEN  '25' AND '50' ";
		  				}else if ( parseInt(office.officeArea) > 50 && parseInt(office.officeArea) <= 100 ) {
		  					range = " BETWEEN  '50' AND '100' ";
		  				}else if ( parseInt(office.officeArea) > 100) {
		  					range = " > 100 ";
		  				}
		  				console.log(range);
		  				var likeasArr = [];
		  				connection.query("SELECT * FROM offices LEFT JOIN images_office ON images_office_office = office_id LEFT JOIN images ON image_id = images_office_image WHERE office_area"+range+" AND image_cover = 1", function(error, result, fields){
		  					if (error) throw error;
		  					if (result) {
		  						for (var i = result.length - 1; i >= 0; i--) {
		  							if (result[i].office_id != office.officeId) {
			  							likeasArr[i] = {
			  								officeId: 		result[i].office_id,
			  								officeImage: 	result[i].image_name
			  							}
			  						}
		  						}
		  						console.log(likeasArr);
		  					}
		  					office.likeas = likeasArr;
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
});



arMap.get('/bmarks', function(req, res){
  res.render('bmarks.jade');
});

arMap.post('/bmarks', function(req, res){
	console.log(req.body.bmarks);
	if(req.body.bmarks){
		connection.query('SELECT * FROM offices	LEFT JOIN images_office ON images_office_office = office_id LEFT JOIN images ON image_id = images_office_image WHERE office_id IN ('+req.body.bmarks+') AND image_cover = 1 AND office_status = 1', function(error, result, fields){
			if (error) throw error;
			var offices=[];
			for (var i = result.length - 1; i >= 0; i--) {
				offices[i] = {
					officeId: result[i].office_id,
					officeDescription: decodeURI(result[i].office_description),
					officeArea: result[i].office_area,
					officePrice: result[i].office_totalprice,
					officeSubprice: result[i].office_subprice,
					officeStatus: result[i].office_status,
					officeImage: result[i].image_name,
					officeObject: result[i].office_object
				};
			};
			res.send({
				offices: offices,
				imgFolder: 'img/obj_imgs/'
			});		  	
		});
	}else{
		res.send("Boockmarks pool is empty");
	};
  //res.render('bmarks.jade');
});

function auth(req, res, next) {
  if (req.session.role) {
  	if (req.session.role == 'admin') {
  		console.log('role: '+req.session.role);
  		next();
  	}else{
  		res.redirect('/auth');
  	};
  }else{
  	res.redirect('/auth');
  };
}

arMap.get('/admin',auth, function(req, res){
	connection.query('SELECT * FROM objects LEFT JOIN images_object\
										ON images_object_object = object_id LEFT JOIN images\
										ON image_id = images_object_image', 
		function(error, result, fields){
			if (error) throw error;
			console.log('rows: '+result.length);
		    var objects=[];
		    //for (var i = result.length - 1; i >= 0; i--) {
		  for (var i = 0; i <= result.length - 1; i++) {
		   	objects[i] = {
		   		object_id: result[i].object_id,
		   		object_name: decodeURI(result[i].object_name),
		   		object_coordinates: result[i].object_coordinates,
		   		object_addres: decodeURI(result[i].object_addres),
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
		  			officeDescription: decodeURI(result[i].office_description),
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
		  		username: req.session.username,
		  		role: req.session.role,
		  		objects: objects,
		  		imgFolder: 'img/obj_imgs/'
		  	});
		  });
		      	
	});
});


arMap.post('/openforeditobject', function(req, res){
	connection.query('SELECT * FROM objects LEFT JOIN images_object ON images_object_object = '+req.body.objectId+' LEFT JOIN images ON image_id = images_object_image WHERE object_id='+req.body.objectId, function(error, result){
		if (error) throw error;
		var objectItem = {
			object_id: result[0].object_id,
			object_name: decodeURI(result[0].object_name),
			object_addres: decodeURI(result[0].object_addres),
			object_coordinates: result[0].object_coordinates,
			image_name: result[0].image_name
		}
		res.send(objectItem);
	})
});

var upload = multer({ storage : storage}).single('objectimage');

arMap.post('/editobject', function(req,res){
	upload(req,res,function(err) {
	        if(err) {
	            return res.end("Error uploading file.");
	        }

	        var objectItem = {
	        	objectId: req.body.objectId,
	        	objectName: encodeURI(req.body.objectname),
	        	objectAdres: encodeURI(req.body.objectadres),
	        	objectCoords: req.body.objectcoords
	        }

	        if (req.file) objectItem.pathImg = req.file.filename;

	        console.log(objectItem);
	        //console.log(req.body);

	        connection.query('UPDATE objects SET object_name ="'+encodeURI(req.body.objectname)+'", object_coordinates ="'+req.body.objectcoords+'", object_addres ="'+encodeURI(req.body.objectadres)+'" WHERE object_id = '+req.body.objectId, 
	        function(error, result, fields){
						if (error) throw error;

						if (req.file) {
							connection.query('SELECT * FROM images_object WHERE images_object_object ='+req.body.objectId, function(error, result,dields){
								if (error) throw error;
								imageId = result[0].images_object_image;
								imageName = encodeURI(req.file.filename);
								connection.query('UPDATE images SET image_name = "'+imageName+'" WHERE image_id ='+imageId, function(error, result, fields){
									if(error) throw error;
									res.redirect('/admin');
								});
							});
						}else{
							res.redirect('/admin');
						}

					});
	    });
});

// delete offices before object deleting

arMap.get('/deleteObject-:objectId', function(req, res){
	var objectId = req.params.objectId;
	connection.query('SELECT office_id FROM offices WHERE office_object = '+objectId, function(error,result,fields){
		if (error) throw error;
		console.log('object #'+objectId+' contains '+result.length+ ' offices');
		if (result.length > 0) {
			// delete all objects that contains current office
			var offices = [];
			for (var i = result.length - 1; i >= 0; i--) {
				offices[i] = result[i].office_id;
			};
			officesJoin = '('+offices.join(',')+')';
			connection.query('DELETE FROM images_office WHERE images_office_office IN '+officesJoin, function(error, result){
				if (error) throw error;
				connection.query('DELETE FROM included_services_office WHERE included_services_office_office IN '+officesJoin, function(error, result){
					if (error) throw error;
					connection.query('DELETE FROM extended_services_office WHERE extended_services_office_office IN '+officesJoin, function(error, result){
						if (error) throw error;
						connection.query('DELETE FROM providers_office WHERE providers_office_office IN '+officesJoin, function(error, result){
							if (error) throw error;
							connection.query('DELETE FROM meanings_office WHERE meanings_office_office IN '+officesJoin, function(error, result){
								if (error) throw error;
								connection.query('DELETE FROM offices WHERE office_id = '+officesJoin, function(error, result){
									if (error) throw error;
									connection.query('DELETE FROM images_object WHERE images_object_object = '+objectId, function(error, result){
										if (error) throw error;
										connection.query('DELETE FROM objects WHERE object_id = '+objectId, function(error, result){
											if (error) throw error;
											res.redirect('/admin');
										});
									});
								});
							});
						});
					});
				});
			});
		}else{
			// delete current office only
			connection.query('DELETE FROM images_object WHERE images_object_object = '+objectId, function(error, result){
				if (error) throw error;
				connection.query('DELETE FROM objects WHERE object_id = '+objectId, function(error, result){
					if (error) throw error;
					res.redirect('/admin');
				});
			});
		};
	});
});

arMap.get('/admin:whatwedoWithObj', function(req, res){
	console.log(req.params.whatwedoWithObj);
	var delOrUpdObj = req.params.whatwedoWithObj.split(':');
	if (delOrUpdObj[1]==='deleteObj') {
		connection.query('SELECT images_object_image FROM images_object WHERE images_object_object = '+delOrUpdObj[2], function(error, result){
			if (error) throw error;
			console.log(error);
			imageId = result[0].images_object_image;
			console.log(imageId);
			connection.query('DELETE FROM images_object WHERE images_object_object = '+delOrUpdObj[2], function(error, result){
				if (error) throw error;
				console.log(error);
				console.log(result);
				connection.query('SELECT office_id FROM offices WHERE office_object = '+delOrUpdObj[2], function(error,result,fields){
					if (error) throw error;
					console.log(error);
					console.log(result);
					if (result.length >0) {
						var offices = [];
						for (var i = result.length - 1; i >= 0; i--) {
							offices[i] = result[i].office_id;
						};
						officesJoin = '('+offices.join(',')+')';
						connection.query('DELETE FROM images_office WHERE images_office_office IN '+officesJoin, function(error, result){
							if (error) throw error;
							connection.query('DELETE FROM included_services_office WHERE included_services_office_office IN '+officesJoin, function(error, result){
								if (error) throw error;
								connection.query('DELETE FROM extended_services_office WHERE extended_services_office_office IN '+officesJoin, function(error, result){
									if (error) throw error;
									connection.query('DELETE FROM providers_office WHERE providers_office_office IN '+officesJoin, function(error, result){
										if (error) throw error;
										connection.query('DELETE FROM meanings_office WHERE meanings_office_office IN '+officesJoin, function(error, result){
											if (error) throw error;
											connection.query('DELETE FROM offices WHERE office_id = '+officesJoin, function(error, result){
												if (error) throw error;
												connection.query('DELETE FROM objects WHERE object_id = '+delOrUpdObj[2], function(error, result){
													if (error) throw error;

												});
											});
										});
									});
								});
							});
						});
					}else{
					//
						connection.query('DELETE FROM objects WHERE object_id = '+delOrUpdObj[2], function(error, result){
							if (error) throw error;
							console.log(error);
							console.log(result);
							connection.query('DELETE FROM images WHERE image_id = '+imageId, function(error, result){
								if (error) throw error;
								console.log(error);
								console.log(result);
								connection.query('UPDATE objects', function(error, result){
									if (error) throw error;
									console.log(error);
									console.log(result);
								});
							});
						});
					};
				});
			});
		});
	};

	if (delOrUpdObj[1]==='deleteOfc') {
		connection.query('SELECT images_office_image FROM images_office WHERE images_office_office = '+delOrUpdObj[2], function(error, result){
			if (error) throw error;
				console.log(error);
				console.log(result);
				imageId = result[0].images_office_image;
				console.log(imageId);

				connection.query('DELETE FROM images_office WHERE images_office_office = '+delOrUpdObj[2], function(error, result){
					if (error) throw error;
						console.log(error);
						console.log(result);

						connection.query('DELETE FROM images WHERE image_id = '+imageId, function(error, result){
							if (error) throw error;
								console.log(error);
								console.log(result);

								connection.query('DELETE FROM included_services_office WHERE included_services_office_office = '+delOrUpdObj[2], function(error, result){
									if (error) throw error;
										console.log(error);
										console.log(result);

										connection.query('DELETE FROM extended_services_office WHERE extended_services_office_office = '+delOrUpdObj[2], function(error, result){
											if (error) throw error;
												console.log(error);
												console.log(result);

												connection.query('DELETE FROM providers_office WHERE providers_office_office = '+delOrUpdObj[2], function(error, result){
													if (error) throw error;
														console.log(error);
														console.log(result);

														connection.query('DELETE FROM meanings_office WHERE meanings_office_office = '+delOrUpdObj[2], function(error, result){
															if (error) throw error;
																console.log(error);
																console.log(result);

																connection.query('DELETE FROM offices WHERE office_id = '+delOrUpdObj[2], function(error, result){
																	if (error) throw error;
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

arMap.post('/admin', function(req,res){
	upload(req,res,function(err) {
		if (err) {
			return res.end("Error uploading file.");
		}else{
			//console.log(req.body);
			var objectData = req.body;
			objectData.imageName = encodeURI(req.file.filename);
			objectData.objectname = encodeURI(objectData.objectname);
			objectData.objectadres = encodeURI(objectData.objectadres);
			console.log(objectData);
			connection.query('INSERT INTO objects (object_name, object_coordinates, object_addres) VALUES ("'+objectData.objectname+'", "'+objectData.objectcoords+'" , "'+objectData.objectadres+'")',	function(error, result, fields){
				if (error) throw error;
				var objectId = result.insertId;
				connection.query('INSERT INTO images (image_name, image_cover) VALUES ("'+objectData.imageName+'", 0)', function(error, result, fields){
					if (error) throw error;
					// im.resize({
					//   srcPath: __dirname + 'views/img/obj_imgs/'+objectData.imageName,
					//   dstPath: __dirname + 'views/img/obj_imgs/'+objectData.imageName,
					//   width:   320
					// }, function(err, stdout, stderr){
					//   if (err) throw err;
					  console.log('resized kittens.jpg to fit within 256x256px');
						var imageId = result.insertId;
						console.log(objectId);
						console.log(imageId);
						connection.query('INSERT INTO images_object (images_object_image, images_object_object) VALUES ('+imageId+', '+objectId+')', function(error, result, fields){
							if (error) throw error;
							res.redirect('/admin');
						});
					//});
				});
			});			
		};
	});	
});

arMap.get('/addoffice', auth, function(req, res){
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

arMap.get('/editoffice-:officeId', function(req,res){
	//res.send(req.params.officeId);
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

										var editoffice = {};
										editoffice.ofiiceId = req.params.officeId;
										editoffice.includes = includes;
										editoffice.extendes = extendes;
										editoffice.providers = providers;
										editoffice.meanings = meanings;
										editoffice.objects = objects;
										//console.log(objects);

										connection.query('SELECT * FROM offices WHERE office_id='+editoffice.ofiiceId, function(error, result, fields){
											if (error) throw error;
											editoffice.ownerId = result[0].office_owner;
											editoffice.officeDescription = decodeURI(result[0].office_description);
											editoffice.officeArea = result[0].office_area;
											editoffice.officeSubprice = result[0].office_subprice;
											editoffice.officeTotalprice = result[0].office_totalprice;
											editoffice.officeObject = result[0].office_object;
											connection.query('SELECT owner_contact FROM owners WHERE owner_id='+editoffice.ownerId, function(error, result, fields){
												if (error) throw error;
												editoffice.ownerContact = result[0].owner_contact;
												connection.query('SELECT * FROM images_office LEFT JOIN images ON image_id = images_office_image  WHERE images_office_office ='+editoffice.ofiiceId, function(error, result, fields){
													if (error) throw error;
													var officeImages = [];
													for (var i = result.length - 1; i >= 0; i--) {
														officeImages[i] = {};
														officeImages[i].imageId = result[i].image_id;
														officeImages[i].imageName = result[i].image_name;
														officeImages[i].imageCover = result[i].image_cover;
													}
													editoffice.officeImages = officeImages;
													editoffice.imageFolder = 'img/obj_imgs/';
													connection.query('SELECT * FROM included_services_office WHERE included_services_office_office='+editoffice.ofiiceId, function(error, result, fields){
														if (error) throw error;
														var existIncludes = [];
														for (var i = result.length - 1; i >= 0; i--) {
															existIncludes[i] = result[i].included_services_office_service;
														}
														editoffice.existIncludes = existIncludes;
														connection.query('SELECT * FROM extended_services_office WHERE extended_services_office_office='+editoffice.ofiiceId, function(error, result, fields){
															if (error) throw error;
															var existExtendes = [];
															for (var i = result.length - 1; i >= 0; i--) {
																existExtendes[i] = result[i].extended_services_office_service;
															}
															editoffice.existExtendes = existExtendes;
															connection.query('SELECT * FROM providers_office WHERE providers_office_office='+editoffice.ofiiceId, function(error, result, fields){
																if (error) throw error;
																var existProviders = [];
																for (var i = result.length - 1; i >= 0; i--) {
																	existProviders[i] = result[i].providers_office_provider;
																}
																editoffice.existProviders = existProviders;
																connection.query('SELECT * FROM meanings_office WHERE meanings_office_office='+editoffice.ofiiceId, function(error, result, fields){
																	if (error) throw error;
																	var existMeanings = [];
																	for (var i = result.length - 1; i >= 0; i--) {
																		existMeanings[i] = result[i].meanings_office_meaning;
																	}
																	editoffice.existMeanings = existMeanings;
																	console.log(editoffice);
																	res.render('editoffice.jade', editoffice);
																});
															});
														});
													});
													// 
													
													// 
												});
											});											
										});
									});
							});
					});
			});
	});
});


arMap.post('/editoffice-:officeId', function(req,res){
	connection.query('UPDATE offices SET office_description = "'+encodeURI(req.body.officename)+'",\
																				 office_area = "'+req.body.officearea+'",\
																				 office_subprice = "'+req.body.officesubprice+'",\
																				 office_totalprice = "'+req.body.officetotalprice+'"\
																				 WHERE office_id ='+req.params.officeId, function(error, result, fields){
		if (error) throw error;
		connection.query('UPDATE owners SET owner_contact = "'+req.body.officeownertel+'" WHERE owner_id ='+req.body.officeownerid, function(error, result, fields){
			if (error) throw error;
			connection.query('DELETE FROM images_office WHERE images_office_office = '+req.params.officeId,function(error, result, fields){
				if (error) throw error;
				connection.query('DELETE FROM meanings_office WHERE meanings_office_office = '+req.params.officeId,function(error, result, fields){
					if (error) throw error;
					connection.query('DELETE FROM providers_office WHERE providers_office_office = '+req.params.officeId,function(error, result, fields){
						if (error) throw error;
						connection.query('DELETE FROM extended_services_office WHERE extended_services_office_office = '+req.params.officeId,function(error, result, fields){
							if (error) throw error;
							connection.query('DELETE FROM included_services_office WHERE included_services_office_office = '+req.params.officeId,function(error, result, fields){
								if (error) throw error;
								var newOfficeId = req.params.officeId;
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
													var officeImagesSet = req.body.officeimage[0] ? '('+req.body.officeimage+')' : '('+req.body.officeimage.join(',')+')';
													connection.query('UPDATE images SET image_cover = 0 WHERE image_id IN '+officeImagesSet, function(error, result, fields){
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
																			res.redirect('/admin');
																		});
																	});
																});
															});
														});
													});					
												});
							});
						});
					});
				});
			});
		});		
	});
});


arMap.get('/unrole',function(req,res){
	req.session.username = '';
	req.session.role = '';
	res.redirect('/admin');
});

arMap.post('/deleteofficeimage', function(req, res){
	connection.query('DELETE FROM images_office WHERE images_office_image ='+req.body.imageId, function(error, result, fields){
		if (error) throw error;
		connection.query('DELETE FROM images WHERE image_id ='+req.body.imageId, function(error, result, fields){
			if (error) throw error;
			res.send(req.body.imageId);
		});
	});
});

arMap.post('/addoffice', function(req,res){
	connection.query('INSERT INTO owners (owner_contact) VALUES ("'+req.body.officeownertel+'")', function(error, result, fields){
		if (error) throw error;
		var newOwnerId = result.insertId;
		var officename = encodeURI(req.body.officename)
		connection.query('INSERT INTO offices (office_description,\
																					 office_area,\
																					 office_subprice,\
																					 office_totalprice,\
																					 office_owner,\
																					 office_object)\
											VALUES ("'+officename+'",\
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


arMap.post('/delincludes', function(req, res){
	console.log(req.body);
	connection.query('DELETE FROM included_services_office WHERE included_services_office_service = '+req.body.includeId, function(error, result, fields){
		if (error) throw error;
		connection.query('DELETE FROM included_services WHERE includes_id = '+req.body.includeId, function(error, result, fields){
			if (error) throw error;
			res.send(result);
		});
	});
});

arMap.post('/delextendes', function(req, res){
	console.log(req.body);
	connection.query('DELETE FROM extended_services_office WHERE extended_services_office_service = '+req.body.extendeId, function(error, result, fields){
		if (error) throw error;
		connection.query('DELETE FROM extended_services WHERE extendes_id = '+req.body.extendeId, function(error, result, fields){
			if (error) throw error;
			res.send(result);
		});
	});
});

arMap.post('/delproviders', function(req, res){
	console.log(req.body);
	connection.query('DELETE FROM providers_office WHERE providers_office_provider = '+req.body.providerId, function(error, result, fields){
		if (error) throw error;
		connection.query('DELETE FROM providers WHERE provider_id = '+req.body.providerId, function(error, result, fields){
			if (error) throw error;
			res.send(result);
		});
	});
});

arMap.post('/delmeanings', function(req, res){
	console.log(req.body);
	connection.query('DELETE FROM meanings_office WHERE meanings_office_meaning = '+req.body.meaningId, function(error, result, fields){
		if (error) throw error;
		connection.query('DELETE FROM meanings WHERE meaning_id = '+req.body.meaningId, function(error, result, fields){
			if (error) throw error;
			res.send(result);
		});
	});
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

arMap.post('/chngeobjectstatus', function(req,res){

	console.log(req.body);
	connection.query('UPDATE objects SET object_show = '+req.body.show+' WHERE object_id = '+req.body.objectId, function(error, result, fields){
		if (error) throw error;
		res.send('Published');
	});
});

server = arMap.listen(80,function(){
  console.log('Listening on port 3000');
});
