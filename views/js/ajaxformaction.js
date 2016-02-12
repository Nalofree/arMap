


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