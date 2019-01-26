

//password validator


function lengthValidator(pass) {
    if (pass.length >= 8) {
        return true;
    } else {
        $('#errorMSG').html("password must be greater than 8 characters!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function capitalValidator(pass) {
    const upperCaseLetters = /[A-Z]/g;
    if (pass.match(upperCaseLetters)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast one upperCaseLetter!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function lowercaseValidator(pass) {
    const lowerCaseLetters = /[a-z]/g;
    if (pass.match(lowerCaseLetters)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast lowerCaseLetters!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function numberValidator(pass) {
    const numbers = /[0-9]/g;
    if (pass.match(numbers)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast one number!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function symbolValidator(pass) {
    const symbols = /[$-/:-?{-~!"^_`\[\]@#.]/;
    if (pass.match(symbols)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast one symbol eg $-/:-?^_@#");
        $('#ErrorM').modal('show');
        return false;
    }
};


	$(document).ready(function(){


//The login area
$('#submitBE').click(function(event){
	event.preventDefault();
	var username=$('#Uname').val();
	var password=$('#Pword').val();
    
        
		
	var lengthValid = lengthValidator(password);

	if (lengthValid) {
	    var capsValid = capitalValidator(password);
	    if (capsValid) {
	        var lowerValid = lowercaseValidator(password);
	        if (lowerValid) {
	            var numberValid = numberValidator(password);
	            if (numberValid) {
	                var symbolValid = symbolValidator(password);
	                if (symbolValid) {

	                    $('#submitBE').addClass('disabled');
	                    $('#submitBE').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');

	$.ajaxSetup({
		headers:{
			'Content-Type':'application/json'
		}
	});
      
	$.ajax({
		url:"https://pennycoreapi.azurewebsites.net/oAuth2/GetToken",
      
		method:'POST',
		dataType:'json',
		data:JSON.stringify({'username':username,'password':password}),
		success:function(ResponseBody){
          
			console.log(JSON.stringify(ResponseBody));
          
			userResponse =JSON.parse(JSON.stringify(ResponseBody));
			if(userResponse.access_token!=""){
				if(typeof(Storage)!=="undefined"){
					sessionStorage.Osession=userResponse.access_token;
					sessionStorage.Otype=userResponse.token_type;
				
					$('#successMSG').html("Login successful!");
					$('#SuccessM').modal('show');
					$('#submitBE').removeClass('disabled');
					$('#submitBE').html('Log in');
					window.location="optimusbackend.html";
				} else {
				    $('#submitBE').removeClass('disabled');
				    $('#submitBE').html('Log in');
				    $('#errorMSG').html("please use a modern browser!");
				    $('#ErrorM').modal('show');
					return false;
				}
			
           
           
			} else {
			    $('#submitBE').removeClass('disabled');
			    $('#submitBE').html('Log in');
			    $('#errorMSG').html("Failed! Your Email or password is invalid");
			    $('#ErrorM').modal('show');
			}
        
		}, 
		error:function(error){
		    console.log(JSON.stringify(error));
		    $('#submitBE').removeClass('disabled');
		    $('#submitBE').html('Log in');
		    $('#errorMSG').html("Failed!Please try again later.");
		    $('#ErrorM').modal('show');
		}
	});
	                } else {
	                    $('#PwordS').focus();
	                    return false;
	                }
                } else {
                    $('#PwordS').focus();
                    return false;
                }
            } else {
                $('#PwordS').focus();
                return false;
            }
        } else {
            $('#PwordS').focus();
            return false;
        }
    } else {
        $('#PwordS').focus();
        return false;
    }
    
});
});

