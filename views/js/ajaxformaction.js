


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
  //console.log(files);
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
		      	<input type="checkbox" value="'+data.includes_id+'">\
		      	<span>'+data.includes_name+'</span></div>');
		      $("#addincludes").val('');
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
		      	<input type="checkbox" value="'+data.extendes_id+'">\
		      	<span>'+data.extendes_name+'</span></div>');
		      $("#addextendes").val('');
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
		      	<input type="checkbox" value="'+data.provider_id+'">\
		      	<span>'+data.provider_name+'</span></div>');
		      $("#addprovider").val('');
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
		      	<input type="checkbox" value="'+data.meaning_id+'">\
		      	<span>'+data.meaning_name+'</span></div>');
		      $("#addmeaning").val('');
		  },
		  error: function(status){
		  	console.log(status);
		  }
		});
	};
});