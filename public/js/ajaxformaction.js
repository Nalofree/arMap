


var files;

$('#objectimage').on('change', prepareUpload);

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

$(".b_addobject-done").click(function(e){	
	e.preventDefault();
	var objectImageExist = $('#objectimage').val(),
			objectnameExist = $("#objectname").val(),
			objectadresExist = $("#objectadres").val(),
			objectcoordsExist = $("#objectcoords").val();

	if (objectImageExist && objectnameExist && objectadresExist && objectcoordsExist) {
		$(this).attr("disabled","disabled")
		$("#addobject_form").submit();
	}else{	
		if (!objectImageExist) formValidError("Добавьте изображение");
		if (!objectcoordsExist) formValidError("Выберете предложенный вариант адреса");
		if (!objectadresExist) formValidError("Введите адрес и выберете предложенный вариант");
		if (!objectnameExist) formValidError("Введите название");
	};
});

var formValArr = [];

function formElementIsValid(formElement, regexp, elementPlace){
	var badUserBad = {},
	isRight,
	mesageToBadUser = "";
	if (formElement.attr("type") == "text") {
		if (formElement.val()) {
			if (regexp) {
				isRight = regexp.test(formElement.val());
				if (!isRight) {
					mesageToBadUser = "Проверьте правильность введенных данных";
				};
			} else {
				isRight = true;
			};			
		} else {
			isRight = false;
			mesageToBadUser = "Заполните поле";
		};
	} else {
		if (formElement.length > 0) {
			isRight = true;
		} else {
			isRight = false;
			mesageToBadUser = "Добавьте элемент в набор";
		};
	};
	badUserBad = {
		formElement: formElement, 
		isRight: isRight, 
		mesageToBadUser: mesageToBadUser,
		elementPlace: elementPlace
	};
	formValArr.push(badUserBad);
	console.log(formValArr);
	return badUserBad;
};

$('.b_addoffice-done').click(function(e){
	e.preventDefault();
	var formValid = true;
	// var valiArr=[];
	formElementIsValid($("#officename"),'','');
	formElementIsValid($("#officearea"),/^[0-9]+\,?\.?[0-9]+$/gi,'');
	formElementIsValid($("#officesubprice"),/^[0-9]+\,?\.?[0-9]+$/gi,'');
	formElementIsValid($("#officetotalprice"),/^[0-9]+\,?\.?[0-9]+$/gi,'');
	formElementIsValid($("#officeownertel"),/^[0-9]+\s?\-?[0-9]+$/gi,'');
	formElementIsValid($(".b_adding-first-body-item"),'','images');
	formElementIsValid($("#useascover:checked"),'','images');
	formElementIsValid($("input[name=includes]:checked"),'','includes');
	formElementIsValid($("input[name=extendes]:checked"),'','extendes');
	formElementIsValid($("input[name=providers]:checked"),'','providers');
	formElementIsValid($("input[name=meanings]:checked"),'','meanings');

	for (var i = formValArr.length - 1; i >= 0; i--) {
		if (!formValArr[i].isRight) {
			formValArr[i].formElement.after('<div class="input-err">'+formValArr[i].mesageToBadUser+'</div>');
			if (formValArr[i].elementPlace == "images") {
				$(".b_adding-first-body").append('<div class="input-err">'+formValArr[i].mesageToBadUser+'</div>');
			}
			if (formValArr[i].elementPlace == "includes") {
				$("input[name=includes]:last").after('<div class="input-err">'+formValArr[i].mesageToBadUser+'</div>');
			}
			if (formValArr[i].elementPlace == "extendes") {
				$("input[name=extendes]:last").after('<div class="input-err">'+formValArr[i].mesageToBadUser+'</div>');
			}
			if (formValArr[i].elementPlace == "providers") {
				$("input[name=providers]:last").after('<div class="input-err">'+formValArr[i].mesageToBadUser+'</div>');
			}
			if (formValArr[i].elementPlace == "meanings") {
				$("input[name=meanings]:last").after('<div class="input-err">'+formValArr[i].mesageToBadUser+'</div>');
			}
			var formValid = false;
		};
	};
	$("input[type=radio]").click(function(){
		$('.input-err').remove();
	});
	formValArr = [];
	if (formValid) {$('.b_addoffice-done').attr("disabled","disabled");$('#addofficeform').submit();}
});

$("#officename").focus(function(){
	$('.input-err').remove();
});
$("#officearea").focus(function(){
	$('.input-err').remove();
});
$("#officesubprice").focus(function(){
	$('.input-err').remove();
});
$("#officetotalprice").focus(function(){
	$('.input-err').remove();
});
$("#officeownertel").focus(function(){
	$('.input-err').remove();
});
$(".b_addobject-input-caption-modaltrigger").click(function(){
	$('.input-err').remove();
});
$("input[type=checkbox]").click(function(){
	$('.input-err').remove();
});

/*$(".b_adding-first-body-item").ready(function(){
	$(".b_adding-first-body-item").click(function(){
		$('.input-err').remove();
	});
});

$(".b_adding-first-body-item").click(function(){
	$('.input-err').remove();
});*/

$("#officeimages").change(function(event){
	files = event.target.files;
	console.log(files[0]);
	var reader = new FileReader();
	reader.onload = (function(theFile){
		return function(e){
			$('.b_addobject-addimgmodal-img img').attr('src',e.target.result);
		};  	
	})(files[0]);
	reader.readAsDataURL(files[0]);

	var formData = new FormData();
	var file = files[0];
	    formData.append('officeimages', file);

	    console.log(formData);
	    
	    var xhr = new XMLHttpRequest();
	    xhr.open('post', '/addofficeimg', true);
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState == 4) {
	        if(xhr.status == 200) {
	        console.log(xhr.responseText);
	          imageData = JSON.parse(xhr.responseText);
	          console.log(imageData);
	          $(".b_adding-first-body").append("<div class='b_adding-first-body-item'>\
						<div class='b_adding-first-body-item-img' id='"+imageData.imageId+"'><img src='"+imageData.imageFolder+imageData.imageName+"' alt='' /></div>\
						<div class='b_adding-first-body-item-feaches'>\
						<input type='radio' id='useascover' name='useascover' value='"+imageData.imageId+"' />\
						<input type='hidden' name='officeimage' value='"+imageData.imageId+"'/>\
						<span class='b_adding-first-body-item-feaches-choose'>Выбрать обложкой</span>\
						<span class='b_adding-first-body-item-feaches-delete'>Удалить</span></div></div>");
						autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
						$("input[name='useascover']").click(function(){
							autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
						});
						$(".b_adding-first-body-item-feaches-delete").click(function(){
							var imageItem = $(this).parent().parent();
							var imageCount = $(".b_adding-first-body-item").length;
							if (imageCount < 2) {
								alert("Нельзя удалять последнюю фотографию из набора");
							}else{
								var imageId = $(this).parent().children("input[name=officeimage]").val();
								$.ajax({
									type: "POST",
									url: '/deleteofficeimage',
									data: {imageId: imageId},
									dataType: 'json',
									timeout: 20000,
									success: function(data) {
									  console.log('success');
									  console.log(data);
									  imageItem.remove();
									  autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
									  $("input[name='useascover']").click(function(){
									  	autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
									  });
									},
									error: function(status){
										console.log('error');
										console.log(status);
									}
								});
							};
						});
	        }
	      }
	    };
	    xhr.send(formData);
});

$(".b_adding-first-body-item-feaches-delete").click(function(){
	var imageItem = $(this).parent().parent();
	var imageCount = $(".b_adding-first-body-item").length;
	if (imageCount < 2) {
		alert("Нельзя удалять последнюю фотографию из набора");
	}else{
		var imageId = $(this).parent().children("input[name=officeimage]").val();
		$.ajax({
			type: "POST",
			url: '/deleteofficeimage',
			data: {imageId: imageId},
			dataType: 'json',
			timeout: 20000,
			success: function(data) {
			  console.log('success');
			  console.log(data);
			  imageItem.remove();
			  autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
			  $("input[name='useascover']").click(function(){
			  	autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
			  });
			},
			error: function(status){
				console.log('error');
				console.log(status);
			}
		});
	};
});

// $(doucment).ready(function(){
// 	$(".b_adding-first-body-item-feaches-delete").click(function(){
// 		var imageCount = $(".b_adding-first-body-item").length;
// 		if (imageCount < 2) {
// 			alert("Нельзя удалять последнюю фотографию из набора");
// 		}else{
// 			var imageId = $(this).parent().children("input[name=officeimage]").val();
// 			$.ajax({
// 				type: "POST",
// 				url: '/deleteofficeimage',
// 				data: {imageId: imageId},
// 				dataType: 'json',
// 				success: function(data) {
// 				  console.log('success');
// 				  console.log(data);
// 				  //$("#"+imageId+".b_adding-first-body-item-img").parent().empty();
// 				  $(this).parent().parent().remove();
// 				  //$("#"+imageId+".b_adding-first-body-item-img").parent().detach();
// 				  //alert($(".b_adding-first-body-item").length);
// 				},
// 				error: function(status){
// 					console.log('error');
// 					console.log(status);
// 				}
// 			});
// 		};
// 	});
// });

// $("#officename").keyup(function(){
// 	var officename = $(this).val();
// 	$(".b_office_params-heading").text(officename);
// });

//autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));

function autoaddcover(img,aim){
	img.each(function(){
		if ($(this).prop("checked")) {
			var imgSrc = $(this).parent().prev().children("img").attr('src');
			aim.attr('src', imgSrc);
		};
	});
};

autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
$("input[name='useascover']").click(function(){
	autoaddcover($("input[name='useascover']"),$(".b_offices-item-img img"));
});


function autoinput (prefix, origin, aim, points){
	origin.keyup(function(){
		var inputText = $(this).val();
		aim.html(prefix+inputText+points);
	});
}

autoinput('',$("#officename"),$(".b_office_params-heading"),'');
autoinput('',$("#officename"),$(".b_offices-item-heading"),'');
autoinput('',$("#officearea"),$(".b_office_params-description-square span"),' м<sup>2</sup>');
autoinput('',$("#officearea"),$(".square-num"),' м<sup>2</sup>');
autoinput('',$("#officesubprice"),$(".b_office_params-description-price span"),' p.');
autoinput('',$("#officesubprice"),$(".price-num"),' p.');
autoinput('Цена за всю площадь: ',$("#officetotalprice"),$(".b_office_params-totalprice"),' p.');
autoinput('',$("#officeownertel"),$(".b_office_params-description-tel span"),'');

function autoaddservice(prefix, service, aim){
	aim.empty();
	service.each(function(){
		if ($(this).prop("checked")){
			var thisFor = $(this).attr("id");
			var text = $("label[for="+thisFor+"]").text();
			aim.append('<li>'+prefix+text+'</li>');
		};
	});
};


autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
$("input[name=includes]").click(function(){
	autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
});
autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
$("input[name=extendes]").click(function(){
	autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
});
autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
$("input[name=providers]").click(function(){
	autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
});

$(".include-del").click(function(){
	var includeId = $(this).attr("id"),
			delitem = $(this).parent(".b_adding-second-body-formitem-body");
	if ($(".include-del").length >= 2) {
		$.ajax({
		  type: "POST",
		  url: '/delincludes',
		  data: {includeId: includeId},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      delitem.empty();
		      autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      $("input[name=includes]").click(function(){
		      	autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      });
		      autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      $("input[name=extendes]").click(function(){
		      	autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      });
		      autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      $("input[name=providers]").click(function(){
		      	autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      });
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	}else{
		alert('Нельзя удалять последний элемент в наборе');
	};
});

$(".extende-del").click(function(){
	var extendeId = $(this).attr("id"),
			delitem = $(this).parent(".b_adding-second-body-formitem-body");
	if ($(".extende-del").length >= 2) {
		$.ajax({
		  type: "POST",
		  url: '/delextendes',
		  data: {extendeId: extendeId},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      delitem.empty();
		      autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      $("input[name=includes]").click(function(){
		      	autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      });
		      autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      $("input[name=extendes]").click(function(){
		      	autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      });
		      autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      $("input[name=providers]").click(function(){
		      	autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      });
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	}else{
		alert('Нельзя удалять последний элемент в наборе');
	};
});

$(".provider-del").click(function(){
	var providerId = $(this).attr("id"),
			delitem = $(this).parent(".b_adding-second-body-formitem-body");
	if ($(".provider-del").length >= 2) {
		$.ajax({
		  type: "POST",
		  url: '/delproviders',
		  data: {providerId: providerId},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      delitem.empty();
		      autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      $("input[name=includes]").click(function(){
		      	autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      });
		      autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      $("input[name=extendes]").click(function(){
		      	autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      });
		      autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      $("input[name=providers]").click(function(){
		      	autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      });
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	}else{
		alert('Нельзя удалять последний элемент в наборе');
	};
});

$(".meaning-del").click(function(){
	var meaningId = $(this).attr("id"),
			delitem = $(this).parent(".b_adding-second-body-formitem-body");
	if ($(".meaning-del").length >= 2) {
		$.ajax({
		  type: "POST",
		  url: '/delmeanings',
		  data: {meaningId: meaningId},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      delitem.empty();
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	}else{
		alert('Нельзя удалять последний элемент в наборе');
	};
});

$("#addincludessubmit").click(function(e){
	e.preventDefault();
	var addincludes = $("#addincludes").val();
	if (addincludes) {
		$.ajax({
		  type: "POST",
		  url: '/addincludes',
		  data: {val: addincludes},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#includes ").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="includes" id="includes-"'+data.includes_id+'" value="'+data.includes_id+'">\
		      	<label for="includes-"'+data.includes_id+'"><span> '+data.includes_name+' </span></label><span class="glyphicon glyphicon-remove include-del" id="'+data.includes_id+'"></span></div>');
		      $("#addincludes").val('');
		      $(".include-del").click(function(){
		      	var includeId = $(this).attr("id"),
		      			delitem = $(this).parent(".b_adding-second-body-formitem-body");
		      	if ($(".include-del").length >= 2) {
		      		$.ajax({
		      		  type: "POST",
		      		  url: '/delincludes',
		      		  data: {includeId: includeId},
		      		  dataType: 'json',
		      		  success: function(data) {
		      		      console.log('success');
		      		      console.log(data);
		      		      delitem.empty();
		      		  },
		      		  error: function(status){
		      		  	console.log(status);
		      		  }
		      		});
		      	}else{
		      		alert('Нельзя удалять последний элемент в наборе');
		      	};
		      });
		      autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      $("input[name=includes]").click(function(){
		      	autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
		      });
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	};
});

$("#addextendessubmit").click(function(e){
	e.preventDefault();
	var addextendes = $("#addextendes").val();
	if (addextendes) {
		$.ajax({
		  type: "POST",
		  url: '/addextendes',
		  data: {val: addextendes},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#extendes ").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="extendes" id="extendes-"'+data.extendes_id+'" value="'+data.extendes_id+'">\
		      	<label for="extendes-"'+data.extendes_id+'"><span> '+data.extendes_name+' </span></label><span class="glyphicon glyphicon-remove extende-del" id="'+data.extendes_id+'"></span></div>');
		      $("#addextendes").val('');
		      
		      $(".extende-del").click(function(){
		      	var extendeId = $(this).attr("id"),
		      			delitem = $(this).parent(".b_adding-second-body-formitem-body");
		      	if ($(".extende-del").length >= 2) {
		      		$.ajax({
		      		  type: "POST",
		      		  url: '/delextendes',
		      		  data: {extendeId: extendeId},
		      		  dataType: 'json',
		      		  success: function(data) {
		      		      console.log('success');
		      		      console.log(data);
		      		      delitem.empty();
		      		  },
		      		  error: function(status){
		      		  	console.log(status);
		      		  }
		      		});
		      	}else{
		      		alert('Нельзя удалять последний элемент в наборе');
		      	};
		      });
		      autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      $("input[name=extendes]").click(function(){
		      	autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
		      });
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	};
});

$("#addprovidersubmit").click(function(e){
	e.preventDefault();
	var addprovider = $("#addprovider").val();
	if (addprovider) {
		$.ajax({
		  type: "POST",
		  url: '/addprovider',
		  data: {val: addprovider},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#provider").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="providers" id="providers-'+data.provider_id+'" value="'+data.provider_id+'">\
		      	<label for="providers-'+data.provider_id+'"><span> '+data.provider_name+' </span></label><span class="glyphicon glyphicon-remove provider-del" id="'+data.provider_id+'"></span></div>');
		      $("#addprovider").val('');
		      $(".provider-del").click(function(){
		      	var providerId = $(this).attr("id"),
		      			delitem = $(this).parent(".b_adding-second-body-formitem-body");
		      	if ($(".provider-del").length >= 2) {
		      		$.ajax({
		      		  type: "POST",
		      		  url: '/delproviders',
		      		  data: {providerId: providerId},
		      		  dataType: 'json',
		      		  success: function(data) {
		      		      console.log('success');
		      		      console.log(data);
		      		      delitem.empty();
		      		  },
		      		  error: function(status){
		      		  	console.log(status);
		      		  }
		      		});
		      	}else{
		      		alert('Нельзя удалять последний элемент в наборе');
		      	};
		      });
		      autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      $("input[name=providers]").click(function(){
		      	autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      });
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	};
});

$("#addmeaningsubmit").click(function(e){
	e.preventDefault();
	var addmeaning = $("#addmeaning").val();
	if (addmeaning) {
		$.ajax({
		  type: "POST",
		  url: '/addmeaning',
		  data: {val: addmeaning},
		  dataType: 'json',
		  timeout: 20000,
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#meaning").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="meanings" id="meanings-"'+data.meaning_id+'" value="'+data.meaning_id+'">\
		      	<label for="meanings-"'+data.meaning_id+'"><span> '+data.meaning_name+' </span></label><span class="glyphicon glyphicon-remove meaning-del" id="'+data.meaning_id+'"></span></div>');
		      $("#addmeaning").val('');
		      $(".meaning-del").click(function(){
		      	var meaningId = $(this).attr("id"),
		      			delitem = $(this).parent(".b_adding-second-body-formitem-body");
		      	if ($(".meaning-del").length >= 2) {
		      		$.ajax({
		      		  type: "POST",
		      		  url: '/delmeanings',
		      		  data: {meaningId: meaningId},
		      		  dataType: 'json',
		      		  success: function(data) {
		      		      console.log('success');
		      		      console.log(data);
		      		      delitem.empty();
		      		  },
		      		  error: function(status){
		      		  	console.log(status);
		      		  }
		      		});
		      	}else{
		      		alert('Нельзя удалять последний элемент в наборе');
		      	};
		      });
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	};
});

$(".b_admobject-office-field-isfree").click(function(e){
	//e.preventDefault();
	if ($(this).hasClass('free')) {
		var status = 1;
	}else{
		var status = 0;
	};
	var officeId = $(this).parent().children('.b_admobject-office-field-number').children('#hiddenOfficeId').attr('value');
	$.ajax({
		type: 'POST',
		url: '/changeofficestatus',
		data: {officeId: officeId, status: status},
		dataType: 'json',
		timeout: 20000,
		success: function(data) {
			console.log('success');
		},
		error: function(status){
		 	console.log(status);
		}
	});
});

$("input[name='publish']").change(function(){
	var objectId = $(this).prop("id");
	if ($(this).prop("checked")) {
		var show = '1';
	}else{
		var show = '0';
	}
	$.ajax({
		type: 'POST',
		url: '/chngeobjectstatus',
		data: {objectId: objectId, show: show},
		dataType: 'json',
		timeout: 20000,
		success: function(data) {
			console.log('success');
		},
		error: function(status){
		 	console.log(status);
		}
	});
});