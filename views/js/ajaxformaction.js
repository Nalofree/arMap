


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
		$("#addobject_form").submit();
	}else{	
		if (!objectImageExist) formValidError("Добавьте изображение");
		if (!objectcoordsExist) formValidError("Выберете предложенный вариант адреса");
		if (!objectadresExist) formValidError("Введите адрес и выберете предложенный вариант");
		if (!objectnameExist) formValidError("Введите название");
	};
});


function formFielsdIsEmpty(field){
	var textOfficeformValid;
	fieldVal = field.val();
	if (!fieldVal) {
		field.after('<div class="form-valid-error">Заполните поле</div>')
		$(".form-valid-error").show(200, function(){
			setTimeout('$(".form-valid-error").hide(200)', 1500);
		});
		field.css('background-color','#ffdddd');
		textOfficeformValid = false;
	}else{
		textOfficeformValid = true;
	};
	return textOfficeformValid;
};



function expectedElementExist (element) {
	var isExist;
	if (element.length >= 1) {
		isExist = true;
	}else{
		isExist = false;
	};
	return isExist;
}

$('.b_addoffice-done').click(function(e){
	e.preventDefault();
	var formValid = true;
	var valiArr=[];
	valiArr.push(formFielsdIsEmpty($("#officename")));
	valiArr.push(formFielsdIsEmpty($("#officearea")));
	valiArr.push(formFielsdIsEmpty($("#officesubprice")));
	valiArr.push(formFielsdIsEmpty($("#officetotalprice")));
	valiArr.push(formFielsdIsEmpty($("#officeownertel")));
	valiArr.push(expectedElementExist($(".b_adding-first-body-item")));
	valiArr.push(expectedElementExist($("#useascover:checked")));
	valiArr.push(expectedElementExist($("input[name=includes]:checked")));
	valiArr.push(expectedElementExist($("input[name=extendes]:checked")));
	valiArr.push(expectedElementExist($("input[name=providers]:checked")));
	valiArr.push(expectedElementExist($("input[name=meanings]:checked")));
	console.log(valiArr);
	for (var i = valiArr.length - 1; i >= 0; i--) {
		if (valiArr[i] === false) formValid = false;
	};
	console.log(formValid);
	if (formValid) {$('#addofficeform').submit();}
});

$("#officename").focus(function(){
	$(this).css('background-color', '#fff');
});
$("#officearea").focus(function(){
	$(this).css('background-color', '#fff');
});
$("#officesubprice").focus(function(){
	$(this).css('background-color', '#fff');
});
$("#officetotalprice").focus(function(){
	$(this).css('background-color', '#fff');
});
$("#officeownertel").focus(function(){
	$(this).css('background-color', '#fff');
});

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
	        }
	      }
	    };
	    xhr.send(formData);
});

$(".b_adding-first-body-item-feaches-delete").click(function(){
	//alert('click');
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
			success: function(data) {
			  console.log('success');
			  console.log(data);
			  //$("#"+imageId+".b_adding-first-body-item-img").parent().empty();
			  $(this).parent().parent().remove();
			  //$("#"+imageId+".b_adding-first-body-item-img").parent().detach();
			  //alert($(".b_adding-first-body-item").length);
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

function autoaddservice(prefix, originservice, aimservice){
	originservice.each(function(){
		if ($(this).prop("checked")){
			aimservice.append('<li>'+prefix+$(this).next('span').text()+'</li>');
		}else{
			$('li:contains('+prefix+$(this).next('span').text()+')').remove();
		}
	});
}

autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));

$("input[name=includes]").click(function(){
	$(".b_office_params-options-jkh").empty();
	autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
	autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
	//autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
});
$("input[name=extendes]").click(function(){
	$(".b_office_params-options-jkh").empty();
	autoaddservice('',$("input[name=includes]"),$(".includes .b_office_params-options-jkh"));
	autoaddservice('',$("input[name=extendes]"),$(".extendes .b_office_params-options-jkh"));
	//autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
});
$("input[name=providers]").click(function(){
	$(".b_office_params-options-network").empty();
	// autoaddservice('',$("input[name=includes]"),$(".b_office_params-options-jkh"));
	// autoaddservice('',$("input[name=extendes]"),$(".b_office_params-options-jkh"));
	autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
});

function autoaddcover(originservice, aimservice){
	originservice.click(function(){
		if ($(this).prop("checked")){
			coverImage = $(this).parent().prev('.b_adding-first-body-item-img').children('img').attr('src');
			//alert(coverImage);
			aimservice.attr('src', coverImage);
		}
	});
}

autoaddcover($("input[name='useascover']"),$(".b_offices-item-img"));

// $("#addofficedone").click(function(){
// 	$("#addofficeform").submit();
// });
  	//  $.ajax({
  	//   type: "POST",
  	//   url: '/addofficeimg',
  	//   data: {file: officeimg[0]},
  	//   cache: false,
  	//   contentType: 'application/x-www-form-urlencoded',
  	//   processData: false,
  	//   dataType: 'json',
  	//   success: function(data) {
  	//     console.log('success');
  	//     console.log(data);
  	//   },
  	//   error: function(xhr,status,error, data){
  	//   	console.log(xhr,status,error);
  	//   	console.log(data);
  	//   }
  	// });

//$(".b_adding-first-body").append("<div class='b_adding-first-body-item'>\
// 	  			<div class='b_adding-first-body-item-img'><img src='"+e.target.result+"' alt='' /></div>\
// 	  			<div class='b_adding-first-body-item-feaches'>\
// 	  			<input type='checkbox' id='useascover' name='useascover' />\
// 	  			<span class='b_adding-first-body-item-feaches-choose'>Выбрать обложкой</span>\
// 	  			<span class='b_adding-first-body-item-feaches-delete'>Удалить</span></div></div>");

$(".include-del").click(function(){
	var includeId = $(this).attr("id"),
			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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

$(".extende-del").click(function(){
	var extendeId = $(this).attr("id"),
			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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

$(".provider-del").click(function(){
	var providerId = $(this).attr("id"),
			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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

$(".meaning-del").click(function(){
	var meaningId = $(this).attr("id"),
			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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

$("#addincludessubmit").click(function(e){
	e.preventDefault();
	var addincludes = $("#addincludes").val();
	if (addincludes) {
		$.ajax({
		  type: "POST",
		  url: '/addincludes',
		  data: {val: addincludes},
		  dataType: 'json',
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#includes ").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="includes" value="'+data.includes_id+'">\
		      	<span> '+data.includes_name+' <span class="glyphicon glyphicon-remove include-del" id="'+data.includes_id+'"></span></span></div>');
		      $("#addincludes").val('');
		      autoaddservice('',$("input[name=includes]"),$(".b_office_params-options-jkh"));
		      $(".include-del").click(function(){
		      	var includeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".extende-del").click(function(){
		      	var extendeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".provider-del").click(function(){
		      	var providerId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".meaning-del").click(function(){
		      	var meaningId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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

$("#addextendessubmit").click(function(e){
	e.preventDefault();
	var addextendes = $("#addextendes").val();
	if (addextendes) {
		$.ajax({
		  type: "POST",
		  url: '/addextendes',
		  data: {val: addextendes},
		  dataType: 'json',
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#extendes ").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="extendes" value="'+data.extendes_id+'">\
		      	<span> '+data.extendes_name+' <span class="glyphicon glyphicon-remove extende-del" id="'+data.extendes_id+'"></span></span></div>');
		      $("#addextendes").val('');
		      autoaddservice('',$("input[name=extendes]"),$(".b_office_params-options-jkh"));
		      $(".include-del").click(function(){
		      	var includeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".extende-del").click(function(){
		      	var extendeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".provider-del").click(function(){
		      	var providerId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".meaning-del").click(function(){
		      	var meaningId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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

$("#addprovidersubmit").click(function(e){
	e.preventDefault();
	var addprovider = $("#addprovider").val();
	if (addprovider) {
		$.ajax({
		  type: "POST",
		  url: '/addprovider',
		  data: {val: addprovider},
		  dataType: 'json',
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#provider").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="providers" value="'+data.provider_id+'">\
		      	<span> '+data.provider_name+' <span class="glyphicon glyphicon-remove provider-del" id="'+data.provider_id+'"></span></span></div>');
		      $("#addprovider").val('');
		      autoaddservice('-',$("input[name=providers]"),$(".b_office_params-options-network"));
		      $(".include-del").click(function(){
		      	var includeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".extende-del").click(function(){
		      	var extendeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".provider-del").click(function(){
		      	var providerId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".meaning-del").click(function(){
		      	var meaningId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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

$("#addmeaningsubmit").click(function(e){
	e.preventDefault();
	var addmeaning = $("#addmeaning").val();
	if (addmeaning) {
		$.ajax({
		  type: "POST",
		  url: '/addmeaning',
		  data: {val: addmeaning},
		  dataType: 'json',
		  success: function(data) {
		      console.log('success');
		      console.log(data);
		      $("#meaning").append('<div class="b_adding-second-body-formitem-body">\
		      	<input type="checkbox" name="meanings" value="'+data.meaning_id+'">\
		      	<span> '+data.meaning_name+' <span class="glyphicon glyphicon-remove meaning-del" id="'+data.meaning_id+'"></span></span></div>');
		      $("#addmeaning").val('');
		      $(".include-del").click(function(){
		      	var includeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".extende-del").click(function(){
		      	var extendeId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".provider-del").click(function(){
		      	var providerId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		      $(".meaning-del").click(function(){
		      	var meaningId = $(this).attr("id"),
		      			delitem = $(this).parent().parent(".b_adding-second-body-formitem-body");
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
		success: function(data) {
			console.log('success');
		},
		error: function(status){
		 	console.log(status);
		}
	});
});