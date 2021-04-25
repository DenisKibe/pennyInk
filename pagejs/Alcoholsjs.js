
sessionStorage.OPassEn="9a8b7c6d5e";var OutAuthP;sessionStorage.OName="U2FsdGVkX19db19/l9WrPhELJLZW74bbvw0dZC3ilW1RG4fISbLIAgo3nllBAVcQ";var OutAuthN;sessionStorage.OPass="U2FsdGVkX1+tg2/0WmWeVXDcQbAHi/p3PcTpVoEJaUk=";sessionStorage.ONameEn="1z2y3x4w5v";

//for the timer
(function ( $ ) {
	function pad(n) {
	    return (n < 10) ? ("0" + n) : n;
	}

	$.fn.showclock = function(Year,Month,Day,Hour,Mins,Sec) {

	    var currentDate=new Date();
	    //var fieldDate=$(this).data('date').split('-');
	    var futureDate=new Date(Year,Month,Day,Hour,Mins,Sec);
		var seconds=futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

	    if(seconds<=0 || isNaN(seconds)){
	    	this.hide();
	    	return this;
	    }

	    var days=Math.floor(seconds/86400);
	    seconds=seconds%86400;

	    var hours=Math.floor(seconds/3600);
	    seconds=seconds%3600;

	    var minutes=Math.floor(seconds/60);
	    seconds=Math.floor(seconds%60);

	    var html="";

	    if(days!=0){
		    html+="<span class='countdown-value days-bottom'>"+pad(days)+"d:</span>";

		}

	    html+="<span class='countdown-value hours-bottom'>"+pad(hours)+"h:</span>";

	    	html+="<span class='countdown-value minutes-bottom'>"+pad(minutes)+"m:</span>";

	    	html+="<span class='countdown-value seconds-bottom'>"+pad(seconds)+"s</span>";


	    this.html(html);
	};

	$.fn.countdown = function(Year,Month,Day,Hour,Mins,Sec) {
		var el=$(this);
		el.showclock(Year,Month,Day,Hour,Mins,Sec);
		setInterval(function(){
			el.showclock(Year,Month,Day,Hour,Mins,Sec);
		},1000);

	}

}(jQuery));


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

	//check if data saved in the local storage is available
	if(localStorage.session && localStorage.type){
		 window.location = "AlcoholsProducts.html";
	}
	if (sessionStorage.getItem('session') != null && sessionStorage.getItem('session')!="undefined") {
		window.location = "AlcoholsProducts.html";
	}


	$(document).ready(function(){

		var outletResponse;
		var userResponse;
		var pname;
		OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
		OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);

		//for the products in the splash screen
		$.ajax({
			url:"https://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

			method:'POST',
			dataType:'json',
			headers:{
				'Content-Type':'application/json'
			},
			data:JSON.stringify({'username':OutAuthN,'password':OutAuthP}),
			success:function(ResponseBody){

                outletResponse =JSON.parse(JSON.stringify(ResponseBody));
                sessionStorage.Osession=outletResponse.access_token;
				console.log(JSON.stringify(ResponseBody));
			},
			error:function(error){
				console.log(JSON.stringify(error));
			},
			complete:function(){

				$.ajax({
				    url: 'http://127.0.0.1/api/products?state=ACTIVE&category=142f0009-91cc-4160-9d80-2141f712f7cb',
					method:'Get',
					dataType:'json',
					headers:{
						'Content-Type':'application/json',
						'Authorization':outletResponse.token_type+' '+outletResponse.access_token
					},
					data:{'state':'ACTIVE','category':'142f0009-91cc-4160-9d80-2141f712f7cb'},
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
						$('#products').html('');
						var z=0;
						for (var key in ResponsePC) {
						    if (ResponsePC.hasOwnProperty(key)) {
								z++;
								var extime;
									extime=ResponsePC[key].expiryDate;
									var date;
									Sep=extime.indexOf('T');
									date=extime.slice(0,Sep);
									date=date.split('-');
									var mwaka=date[0];
									var mwezi=date[1]-1;
									var siku=date[2];

									var time;
									time=extime.slice((Sep+1),extime.length);
									time=time.split(':');
									var saa=time[0];
									var dakika=time[1];
									var sekunde=time[2];
									var expc=new Date().getTime()/1000;
									var newd=new Date(mwaka,mwezi,siku,saa,dakika,sekunde).getTime()/1000;
									if(expc>newd){
										continue;
									}
						        $("#products").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-3 mb-4 " style="display:flex;"><!--card--><div class="card card-cascade wider pb-2 card-ecommerce wow flipInX" data-wow-delay="1.1" data-toggle="modal" data-target="#modalRform"><!--card image--><div class="view view-cascade overlay"><img src="' + ResponsePC[key].imageUrl + '" alt="' + ResponsePC[key].name + '" class="card-img-top" /><a><div class="mask rgba-white-slight"></div></a></div> <!--card image--><!--card content--><div class="card-body card-body-cascade text-center"><!--Title--> <h4 class="card-title"> <strong> ' + ResponsePC[key].name + '</strong></h4><!--Description--><p class="card-text">' + ResponsePC[key].description + '</p><!--card footer--><hr><div class="px-1"><span class="float-left font-weight-bold"><strong>' + ResponsePC[key].auctionPrice + ' Denari</strong></span><span class="float-right font-weight-bold"><strong id="expire'+z+'"></strong></span></div></div><!--card content--></div><!--card--></div><!--Grid column-->');
								jQuery("#expire"+z).countdown(mwaka,mwezi,siku,saa,dakika,sekunde);
							}
						}
					},
					error:function(error){
					    console.log(JSON.stringify(error));
						$('#products').html('');
					    $('#errorMSG').html("An error occurred.Please try again later!");
					    $('#ErrorM').modal('show');
					}
				});
			}
		});


		//on focus show password hint
		$('#PwordL').focus(function(){
			$("#phint").removeClass('invisible');
		});
		//onfocus autocomplete
		$('#Email').focus(function(){
			if(localStorage.Uname){
				$('#Email').val(localStorage.Uname);
			}
		});
		$('#PwordL').focus(function(){
			if(localStorage.Pword){
				$('#PwordL').val(localStorage.Pword);
			}
		});

		//for the login
		$('#SubmitL').click(function(event){
			event.preventDefault();
			var username=$('#Email').val();
			var password=$('#PwordL').val();
			var Remember=$('#RembMe').prop('checked');
			var saveD=$('#RembD').prop('checked');
			if(username==""){
				$('#errorMSG').html("Please input an email!");
			    $('#ErrorM').modal('show');
				$('#Email').focus();
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

								$('#SubmitL').addClass('disabled');
								$('#SubmitL').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');

			                    $.ajax({
			                        url: "https://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

			                        method: 'POST',
			                        dataType: 'json',
			                        headers: {
			                            'Content-Type': 'application/json'
			                        },
			                        data: JSON.stringify({ 'username': username, 'password': password }),
			                        success: function (ResponseBody) {

			                            console.log(JSON.stringify(ResponseBody));

			                            userResponse = JSON.parse(JSON.stringify(ResponseBody));
			                            if (userResponse.access_token != "") {
			                                if (typeof (Storage) !== "undefined") {
			                                    sessionStorage.session = userResponse.access_token;
			                                    sessionStorage.type = userResponse.token_type;

												if(saveD){
													localStorage.Uname=username;
													localStorage.Pword=password;
												}

												if(Remember){
													localStorage.session=userResponse.access_token;
													localStorage.type=userResponse.token_type;
													var TTE=userResponse.expires_in *1000;
													var ExTime=new Date().getTime() + TTE;
													localStorage.ExpTime=ExTime;
												}

			                                    if (sessionStorage.session!=null && sessionStorage.session!='undefined') {
			                                        window.location = "productPage.html";
			                                    } else {
													$('#SubmitL').removeClass('disabled');
													$('#SubmitL').html('Log in');
			                                        $('#errorMSG').html("Invalid Login Details.");
			                                        $('#ErrorM').modal('show');
			                                        return false;
			                                    }

			                                } else {
												$('#SubmitL').removeClass('disabled');
												$('#SubmitL').html('Log in');
			                                    $('#errorMSG').html("please use a modern browser!");
			                                    $('#ErrorM').modal('show');
			                                    return false;
			                                }
			                            } else {
											$('#SubmitL').removeClass('disabled');
											$('#SubmitL').html('Log in');
			                                $('#errorMSG').html("Failed! Your Email or password is invalid");
			                                $('#ErrorM').modal('show');
			                                return false;
			                            }
			                        },
			                        error: function (error) {
			                            console.log(JSON.stringify(error));
										$('#SubmitL').removeClass('disabled');
										$('#SubmitL').html('Log in');
			                            $('#errorMSG').html("Failed!Please try again later.");
			                            $('#ErrorM').modal('show');
			                        }
			                    });
			                } else {
			                    $('#PwordL').focus();
			                    return false;
			                }
			            } else {
			                $('#PwordL').focus();
			                return false;
			            }
			        } else {
			            $('#PwordL').focus();
			            return false;
			        }
			    } else {
			        $('#PwordL').focus();
			        return false;
			    }
			} else {
			    $('#PwordL').focus();
			    return false;
			}
		});

		//on focus show password hint
		$("#PwordS").focus(function(){
			$("#phints").removeClass('invisible');
		});

		//for the signup area
		var password;
        var confirmPassword;
		$('#SubmitS').click(function(event){
			event.preventDefault();
			if(!$('#TC').prop('checked')){
				$('#errorMSG').html("Please Read and Accept our Terms and Conditions to continue!");
			    $('#ErrorM').modal('show');

				$('#TC').focus();
				return false;
			}
			password=$('#PwordS').val();
			confirmPassword=$('#Cpword').val();

			if (password != confirmPassword) {
			    $('#errorMSG').html("Password does not much!");
			    $('#ErrorM').modal('show');

				$('#Cpword').focus();
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

								$('#SubmitS').addClass('disabled');
								$('#SubmitS').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');


			                            var email = $('#EmailS').val();
			                            var fName = $('#firstname').val();
			                            var lName = $('#lastname').val();

			                            $.ajax({
			                                url: "https://pennycoreapi.azurewebsites.net/api/Account/RegisterUser",

			                                method: 'POST',
			                                dataType: 'json',
			                                headers: {
			                                    'Content-Type': 'application/json',
			                                    'Authorization':'bearer ' + sessionStorage.Osession
			                                },
			                                data: JSON.stringify({ 'email': email, 'fName': fName, 'lName': lName, 'password': password, 'confirmPassword': confirmPassword }),
			                                success: function (ResponseBody) {
			                                    console.log(JSON.stringify(ResponseBody));
												$('#SubmitS').removeClass('disabled');
												$('#SubmitS').html('Sign up');

			                                    $('#successMSG').html("Success! User is now Registered.\n You can now login.");
			                                    $('#SuccessM').modal('show');
			                                },
			                                error: function (error) {
			                                    console.log(JSON.stringify(error));
												$('#SubmitS').removeClass('disabled');
												$('#SubmitS').html('Sign up');

			                                    var errorState = JSON.parse(JSON.stringify(error));
			                                    $('#errorMSG').html("Could Not Register User!Check if User already Exist.");
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

		//for the forgot password
		$("#changeP").click(function (event) {
		    event.preventDefault();

		    var username = $('#Email').val();

		    if (username == "") {
		        $('#errorMSG').html("please fill out this field.");
		        $('#ErrorM').modal('show');

				$("#Email").focus();


				return false;
			}
			$("#Pm").html("Sending password reset Link..")
			$("#ProcessM").modal('show');
			$.ajax({
				url:"https://pennycoreapi.azurewebsites.net/api/Account/ResetPassword",
				method:'Put',
				dataType:'json',
				data:{'username':username,'resetPasswordEndpoint':'https://www.pennyinc.co.ke/resetPassword.html'},
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));
					$("#ProcessM").modal('hide');

				    $('#successMSG').html("Password Reset link sent to your Email!");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
					console.log(JSON.stringify(error));
					$("#ProcessM").modal('hide');
				    $('#errorMSG').html("failed! Action could not be completed at this time. please try again later");
				    $('#ErrorM').modal('show');
				}

			});
		});

		//for the view password in login field
		$('#LPV').click(function(event){
			event.preventDefault();
			if($('#PwordL').attr('type')=='password'){
				$('#PwordL').removeAttr('type');
				$('#PwordL').attr('type','text');
			}else{
				$('#PwordL').removeAttr('type');
				$('#PwordL').attr('type','password');
			}
		});

		//for the view password in sign up field
		$('#SPV').click(function(event){
			event.preventDefault();
			if($('#PwordS').attr('type')=='password'){
				$('#PwordS').removeAttr('type');
				$('#PwordS').attr('type','text');
			}else{
				$('#PwordS').removeAttr('type');
				$('#PwordS').attr('type','password');
			}
		});
		//for the view confirm password in signup field
		$('#SCPV').click(function(event){
			event.preventDefault();
			if($('#Cpword').attr('type')=='password'){
				$('#Cpword').removeAttr('type');
				$('#Cpword').attr('type','text');
			}else{
				$('#Cpword').removeAttr('type');
				$('#Cpword').attr('type','password');
			}
        });

        //To send emails
    $("#Msend").click(function (event) {
        event.preventDefault();
        var Mname = $('#Mname').val();
        var Memail = $('#Memail').val();
        var Msubject = $('#Msubject').val();
        var Mmessage = $('#Mmessage').val();

        if (Mname == "" || Memail == "" || Msubject == "" || Mmessage == "") {
            $('#errorMSG').html("Fill out all fields.");
            $('#ErrorM').modal('show');
            $('#mail').modal('hide');
            return false;
        }
        $('#Msend').addClass('disabled');
        $('#Msend').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');


                $.ajax({
                    url: 'https://pennycoreapi.azurewebsites.net/api/Account/SendEmail',
                    method: 'POST',
                    dataType: 'json',
                    headers: { 'Authorization':'bearer '+sessionStorage.Osession },
                    data: { "emailAdress": "support@pennyinc.co.ke", "subject": Msubject, "emailBody": "Name: " + Mname + " \n " + " Email: " + Memail + " \n " + " Message: " + Mmessage },
                    success: function (ResponseBody) {
                        console.log(JSON.stringify(ResponseBody));
                        $('#mail').modal('hide');
                        $('#Msend').removeClass('disabled');
                        $('#Msend').html('Send <i class="fa fa-paper-plane-o ml-1"></i>');
                        $('#successMSG').html("Feed back received.Check your Email for further communications.");
                        $('#SuccessM').modal('show');
                    },
                    error: function (error) {
                        console.log(JSON.stringify(error));
                        $('#mail').modal('hide');
                        $('#Msend').removeClass('disabled');
                        $('#Msend').html('Send <i class="fa fa-paper-plane-o ml-1"></i>');
                        $('#errorMSG').html("Failed.Please try again later.");
                        $('#ErrorM').modal('show');
                    }
                });
    });
});
