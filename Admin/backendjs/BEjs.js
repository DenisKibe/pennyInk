
	$(document).ready(function(){
	
        if ((sessionStorage.getItem('Osession') === null || sessionStorage.getItem('Osession')=="undefined")) {

            window.location = "/Admin";
        }
	$.ajaxSetup({
        headers:{
            'Authorization':sessionStorage.Otype+' '+sessionStorage.Osession
        }
    });
	
	//for the Get outlet account info
	$.ajax({
            url:'https://pennycoreapi.azurewebsites.net/api/Account/UserInfo',
            method:'Get',
            dataType:'json',
            processData:false,
            success:function(ResponseBody){
                console.log(JSON.stringify(ResponseBody));
				$("#id").html(ResponseBody.id);
                $("#name").html(ResponseBody.name);
				$("#nickname").html(ResponseBody.nickname);
				$("#username").html(ResponseBody.username);
                $("#email").html(ResponseBody.email);
                $("#PNum").html(ResponseBody.phoneNumber);
                $("#uId").html(ResponseBody.uId);
                $("#role").html(ResponseBody.role);
                $("#Oid").html(ResponseBody.outletId);

                if(ResponseBody.role=="Customer"){
                    $('#errorMSG').html("You are not allowed to view this page!");
                    $('#ErrorM').modal('show');

                    setTimeout(function(){window.location=("/Admin");},3000);
                }
                
            },
            error:function(error){
                console.log(JSON.stringify(error));
                $('#errorMSG').html("We are experiencing errors.Please try again later");
                $('#ErrorM').modal('show');
            }
        });
		
		//for the log out
		$("#logout").click(function(event){
			event.preventDefault();
			sessionStorage.clear();
			if (sessionStorage.Osession || sessionStorage.Otype) {
			    $('#errorMSG').html("Failed!Please try loging out again.");
			    $('#ErrorM').modal('show');
			} else {
			    $('#successMSG').html("Thank you for Visiting.");
			    $('#SuccessM').modal('show');
				window.location=("/");
			}	
		});
		
		
		
	});
