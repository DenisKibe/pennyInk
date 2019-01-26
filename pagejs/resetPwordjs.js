var locate;
var ud;
var xc;
locate=window.location.href;
sessionStorage.OPassEn="9a8b7c6d5e";var OutAuthP;sessionStorage.OName="U2FsdGVkX19db19/l9WrPhELJLZW74bbvw0dZC3ilW1RG4fISbLIAgo3nllBAVcQ";var OutAuthN;sessionStorage.OPass="U2FsdGVkX1+tg2/0WmWeVXDcQbAHi/p3PcTpVoEJaUk=";sessionStorage.ONameEn="1z2y3x4w5v";

//password validator

function lengthValidator(pass){
    if (pass.length >= 8) {
        return true;
    } else {
        $('#errorMSG').html("password must be greater than 8 characters!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function capitalValidator(pass){
    const upperCaseLetters = /[A-Z]/g;
    if (pass.match(upperCaseLetters)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast one upperCaseLetter!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function lowercaseValidator(pass){
    const lowerCaseLetters = /[a-z]/g;
    if (pass.match(lowerCaseLetters)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast lowerCaseLetters!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function numberValidator(pass){
    const numbers = /[0-9]/g;
    if (pass.match(numbers)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast one number!");
        $('#ErrorM').modal('show');
        return false;
    }
};

function symbolValidator(pass){
    const symbols = /[$-/:-?{-~!"^_`\[\]@#.]/;
    if (pass.match(symbols)) {
        return true;
    } else {
        $('#errorMSG').html("password must contain atleast one symbol eg $-/:-?^_@#");
        $('#ErrorM').modal('show');
        return false;
    }
};


var finds=/[?]/;
if (locate.match(finds)) {
   
	var pos=locate.indexOf('?');
	var pos=pos;
	
	var Qparm = locate.slice(pos, locate.length);
	
	locate= locate.slice(0,pos);
	
	var sep=Qparm.indexOf('&');
	
	ud=Qparm.slice(4,sep);
	
	var sep=sep+4;
	xc=Qparm.slice(sep,Qparm.length);
	
	
    }

    $(document).ready(function(){
		var password;
		var confirmPassword;
		
		OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
		OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
		
		$("#RPsubmit").click(function(event){
		event.preventDefault();
		
		 password=$("#RPpass").val();
		confirmPassword=$("#RCcpass").val();
		var email=$("#RPuname").val();
		
			
		if (password != confirmPassword) {
		    $('#errorMSG').html("password does not much");
		    $('#ErrorM').modal('show');
			$('#RCcpass').focus();
			return false;

		}
		
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
							
							$('#addInfo').addClass('disabled');
							$('#addInfo').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
							
		                    $.ajax({
		                        url: "https://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

		                        method: 'POST',
		                        dataType: 'json',
		                        headers: {
		                            'Content-Type': 'application/json'
		                        },
		                        data: JSON.stringify({ 'username': OutAuthN, 'password': OutAuthP }),
		                        success: function (ResponseBody) {

		                            outletResponse = JSON.parse(JSON.stringify(ResponseBody));
		                            console.log(JSON.stringify(ResponseBody));
		                        },
		                        error: function (error) {
		                            console.log(JSON.stringify(error));
		                        },
		                        complete: function () {

		                            $.ajax({
		                                url: 'https://pennycoreapi.azurewebsites.net/api/Account/ResetPassword',
		                                method: 'POST',
		                                headers: { 'Authorization': outletResponse.token_type + ' ' + outletResponse.access_token },
		                                dataType: 'json',
		                                data: { 'email': email, 'password': password, 'confirmPassword': confirmPassword, 'code': xc },
		                                success: function (ResponseBody) {
		                                    console.log(JSON.stringify(ResponseBody));
											
		                                    $('#successMSG').html("Password changed successfully.You can now login.");
		                                    $('#SuccessM').modal('show');

		                                    window.location = "https://www.pennyinc.co.ke/";
		                                },
		                                error: function (error) {
		                                    console.log(JSON.stringify(error));
											$('#addInfo').removeClass('disabled');
											$('#addInfo').html('Reset Password');
		                                    $('#errorMSG').html("Failed!Please try again later.");
		                                    $('#ErrorM').modal('show');
		                                   
		                                }
		                            });
		                        }
		                    });
		                } else {
		                    $("#RPpass").focus();
		                    return false;
		                }
		            } else {
		                $("#RPpass").focus();
		                return false;
		            }
		        } else {
		            $("#RPpass").focus();
		            return false;
		        }
		    } else {
		        $("#RPpass").focus();
		        return false;
		    }
		} else {
		    $("#RPpass").focus();
		    return false;
		}
		
	});
});