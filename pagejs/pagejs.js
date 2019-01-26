var locate;
var ud;
var xc;
locate=window.location.href;
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


var linkR=/[#]/;
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
	
	
	}else if(locate.match(linkR)){
	
		locate=locate.replace("#"," ");
	}else{
	
		locate=window.location.href;
	}


if (locate == "http://gadgets.pennyinc.co.ke/" || locate == "http://gadgets.pennyinc.co.ke/index.html") {
	
	if(localStorage.session && localStorage.type){
		 window.location = "productPage.html";
	}
	if (sessionStorage.getItem('session') != null && sessionStorage.getItem('session')!="undefined") {
		window.location = "productPage.html";
	}
	
	
	$(document).ready(function(){
	
		var outletResponse;
		var userResponse;
		var pid;
		var pname;
		OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
		OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
		
		//for the products in the splash screen
		$.ajax({
			url:"http://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

			method:'POST',
			dataType:'json',
			headers:{
				'Content-Type':'application/json'
			},
			data:JSON.stringify({'username':OutAuthN,'password':OutAuthP}),
			success:function(ResponseBody){

				outletResponse =JSON.parse(JSON.stringify(ResponseBody));
				console.log(JSON.stringify(ResponseBody));
			},
			error:function(error){
				console.log(JSON.stringify(error));
			},
			complete:function(){
 
				$.ajax({
				    url: 'http://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=ACTIVE&category=edf78def-783b-459f-83dd-013f10c1e79f',
					method:'Get',
					dataType:'json',
					headers:{
						'Content-Type':'application/json',
						'Authorization':outletResponse.token_type+' '+outletResponse.access_token
					},
					data:{'state':'ACTIVE','category':'edf78def-783b-459f-83dd-013f10c1e79f'},
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
			                        url: "http://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

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
			                    $.ajax({
			                        url: "http://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

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

			                            var email = $('#EmailS').val();
			                            var fName = $('#firstname').val();
			                            var lName = $('#lastname').val();

			                            $.ajax({
			                                url: "http://pennycoreapi.azurewebsites.net/api/Account/RegisterUser",

			                                method: 'POST',
			                                dataType: 'json',
			                                headers: {
			                                    'Content-Type': 'application/json',
			                                    'Authorization': outletResponse.token_type + ' ' + outletResponse.access_token
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
			                                    $('#errorMSG').html("Could Not Register User!User alerdy Exist.");
			                                    $('#ErrorM').modal('show');
			                                }
			                            });
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
				url:"http://pennycoreapi.azurewebsites.net/api/Account/ResetPassword",
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
		
    });

}


//To be used only when the user is loged in
else if (locate == "http://gadgets.pennyinc.co.ke/productPage.html") {
if ((sessionStorage.getItem('session') === null || sessionStorage.getItem('session')=="undefined") && (localStorage.getItem('session')===null || localStorage.getItem('session')=="undefined")) {

        window.location = "/";
    }
	else if(localStorage.session && localStorage.type){
		var nowT=new Date().getTime();
		if (nowT > localStorage.ExpTime) {
		    localStorage.removeItem("session");
		    localStorage.removeItem("type");
		    localStorage.removeItem("ExpTime");
			$('#errorMSG').html("Your session expired!You have to login again.");
            $('#ErrorM').modal('show');
			
			window.location = "/";
		}else{
			sessionStorage.session = localStorage.session;
			sessionStorage.type = localStorage.type;
		}
	}
	

	$(document).ready(function(){

		//synchornous function to get top most bidder
		function getRank(actionid){
			var result=null;
			
			$.ajax({
				url:'http://pennycoreapi.azurewebsites.net/Auction/GetBidderRanking?auctionId='+auctionid,
				method:'Get',
				headers:{
					'Content-Type':'application/json',
					'Authorization':'bearer '+sessionStorage.Osession
				},
				async:false,
				dataType:'json',
				global:false,
				data:{'auctionId':actionid},
				success:function(ResponseBody){
				  console.log(JSON.stringify(ResponseBody));
						  result=ResponseBody[0].userName
				},
				error:function(error){
					console.log(JSON.stringify(error));
				}
			});
			return result;
		}(jQuery);


	$.ajaxSetup({
			headers:{
				'Content-Type':'application/json',
				'Authorization':sessionStorage.type+' '+sessionStorage.session
			}
		});
	var confirmEmail;
	var confirmPnum;
	var Phonenumber;
	//ajaxs for account user info
        $.ajax({
            url:'http://pennycoreapi.azurewebsites.net/api/Account/UserInfo',
            method:'Get',
            dataType:'json',
            processData:false,
            success:function(ResponseBody){
                console.log(JSON.stringify(ResponseBody));

                var Name = ResponseBody.name;
                $("#name").html(Name);
                var Nickname = ResponseBody.nickname;
                $("#nickname").html(Nickname);
                var Username = ResponseBody.username;
                $("#username").html(Username);
                var EMail = ResponseBody.email;
				$("#email").html(EMail);
				var profilePic=ResponseBody.ProfilePic;
				if(profilePic===null){}
				else{
				$("#Ppic").attr("src",profilePic);
				}
                Phonenumber = ResponseBody.phoneNumber;
                $("#PNum").html(Phonenumber);
                var Idnumber = ResponseBody.idNumber;
                $("#idNum").html(Idnumber);
                var Gender = ResponseBody.gender;
                $("#gen").html(Gender);
                $("#dob").html(ResponseBody.dob);
                confirmEmail = ResponseBody.emailConfirmed;
                confirmPnum = ResponseBody.phoneNumberConfirmed;
                if (ResponseBody.emailConfirmed) {
                    $("#CE").html("<span class='fa fa-check'></span>");
                } else {
                    $("#CE").html("<span class='fa fa-close'></span>");

                    //send confirmation email 
                    $.ajax({
                        url: 'http://pennycoreapi.azurewebsites.net/api/Account/SendEmailConfirmation',
                        method: 'POST',
                        dataType: 'json',
                        data: JSON.stringify({ 'confirmationEndpoint': 'https://www.pennyinc.co.ke/confirmEmail.html', 'appName': 'Denari Gadgets' }),
                        success: function (Response) {
                            console.log(JSON.stringify(Response));
                            $('#successMSG').html("An Email has been sent to your Email Address.\n Please veryify Your Email.");
                            $('#SuccessM').modal('show');
                        },
                        error: function (error) {
                            console.log(JSON.stringify(error));
                            $('#errorMSG').html("We are experiencing errors. Please try again later.");
                            $('#ErrorM').modal('show');
                        }
                    });

                }
                if (ResponseBody.phoneNumberConfirmed) {
                    $("#CP").html("<span class='fa fa-check'></span>");

                } else {
                    $("#CP").html("<span class='fa fa-close'></span>");
                    $("#bonusL").html("<span class='fa fa-lock'></span>");
                }

            },
            error:function(error){
                console.log(JSON.stringify(error));
                $('#errorMSG').html("We are experiencing errors. Please try again later.");
                $('#ErrorM').modal('show');
            }
        });
	
	var outletResponse;
	var ResponsePC;
	var BtnId;
	var price;
	var pid;
	var pname;
	
	
	$("#bonusL").click(function () {
	    $('#errorMSG').html("Bonus will be unlocked on Your first Deposite.");
	    $('#ErrorM').modal('show');
	});

		
		
		OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
		OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);

		$.ajax({
			url:"http://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

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

				//for the Auctioning products
				$.ajax({
					url:'http://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=ACTIVE&category=edf78def-783b-459f-83dd-013f10c1e79f',
					method:'Get',
					dataType:'json',
					headers:{
						'Content-Type':'application/json',
						'Authorization':outletResponse.token_type+' '+outletResponse.access_token
					},
					data:{'state':'ACTIVE','category':'edf78def-783b-459f-83dd-013f10c1e79f'},
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
						$('#content').empty();
						var i = 0;
						
						for (var key in ResponsePC) {
						    if (ResponsePC.hasOwnProperty(key)) {
						        i++;
								var Aid=ResponsePC[key].id;
								var rank=getRank(Aid);
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
									if(expc > newd){
										continue;
									}
						        $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 " style="display:flex;"><div class="card mb-3 text-center pb-2 hoverable wow zoomInRight" data-wow-delay="1.0"><p><b>'+rank+'</b></p><div class="view view-cascade overlay"><!--featured image--><div class=" view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p><a class="lead" data-toggle="collapse" href="#Description' + i + '" aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' + i + '"><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span><span id="expires'+i+'"></span></strong></h5><button class="btn btn-outline-deep-purple btn-sm float-left waves-effect" type="button" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].auctionPrice + '">Bid Now</button><button class="btn btn-success btn-sm float-right" type="Rank" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart fa-lg"></span></button></div></div></div>');
								jQuery("#expires"+i).countdown(mwaka,mwezi,siku,saa,dakika,sekunde);
							}
						}
						$('#successMSG').html("you can now start bidding! Enjoy.");
						$('#SuccessM').modal('show');
					},
					error:function(error){
					    console.log(JSON.stringify(error));
						$('#content').html('');
					    $('#errorMSG').html("An error occurred.Please try again later.");
					    $('#ErrorM').modal('show');
					}
				});
			}
		});
		
		var BalanceD;
		var BonusD;

		//for the DWallet details
        $.ajax({
            url:'http://pennycoreapi.azurewebsites.net/Dwallet/GetWallet',
            method:'Get',
            dataType:'json',
            processData:false,
            success:function(ResponseBody){
                console.log(JSON.stringify(ResponseBody));
                BalanceD=ResponseBody.balance;
                BonusD=ResponseBody.bonus;
                $("#pop").attr("data-content", "<b>Balance:</b>" + "<br/>" + "<i>" + BalanceD + " Denari </i>" + "<br>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<b>Bonus:</b>" + "<br/>" + "<i>" + BonusD + " Denari </i><b id='bonusL'></b>" + "<br/>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<button class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' data-toggle='modal' data-target='#AccountInfo' type='button'>Account Info</button><button data-toggle='modal' data-target='#TopupAmt' class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' type='button'>Topup Wallet</button>");
            },
            error:function(error){
                console.log(JSON.stringify(error));
                $('#errorMSG').html("We are experiencing errors.Please try again later");
                $('#ErrorM').modal('show');
            }
        });
		
		//for getting id of the button clicked
		jQuery(document).delegate("#content button[type='button']","click",function(event){
			event.preventDefault();
			
			
			
			BtnId=$(this).attr('id');
			price=$(this).attr('name');

			console.log(BtnId);
			
			if (confirmEmail == false) {
				
			    $('#errorMSG').html("visit your Email address to confirm Your Email and enjoy Bidding.");
			    $('#ErrorM').modal('show');
				return false;
			}
			else if (confirmPnum == false) {
				
			    $("#TopupAmt").modal('show');
				return false;
			}
			else{
			    $('#bidmountM').modal('show');
			}
		});
					//for the bid button
			    $('#bidamBtn').click(function (event) {
			        event.preventDefault();
					$('#'+BtnId).addClass('disabled');
					$('#'+BtnId).html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');

			        var Amount = $('#bidMV').val();

			        if (Amount == "") {
						$('#'+BtnId).removeClass('disabled');
						$('#'+BtnId).html('Bid Now');
			            $('#errorMSG').html("please fill in amount you want to place");
			            $('#ErrorM').modal('show');
			            return false;
			        }
			        else if (Amount > BalanceD && Amount > BonusD) {
						$('#'+BtnId).removeClass('disabled');
						$('#'+BtnId).html('Bid Now');
			            $('#bidmountM').modal('hide');
			            $('#errorMSG').html("You are low on Denaries.Please top up to continue");
			            $('#ErrorM').modal('show');
						$('#TopupAmt').modal('show');
			            
			            return false;
			        }
			        else if (Amount < price) {
						$('#'+BtnId).removeClass('disabled');
						$('#'+BtnId).html('Bid Now');
			            $('#errorMSG').html("Bid must be equal to or higher than the price.\nPlease increase your amount.");
			            $('#ErrorM').modal('show');
			            return false;
			        }

					
					$('#bidmountM').modal('hide');
			        $.ajax({
			            url: 'http://pennycoreapi.azurewebsites.net/Bids/PlaceBid',
			            method: 'Post',
			            dataType: 'json',
			            data: "{ 'amount':'"+Amount+"', 'auctionId':'"+BtnId+"' }",
			            success: function (ResponseBody) {
			                console.log(JSON.stringify(ResponseBody));
							
			                //To update the Dwallet
			                $.ajax({
								url:'http://pennycoreapi.azurewebsites.net/Dwallet/GetWallet',
								method:'Get',
								dataType:'json',
								processData:false,
								success:function(ResponseBody){
									console.log(JSON.stringify(ResponseBody));
									BalanceD=ResponseBody.balance;
									BonusD=ResponseBody.bonus;
									$("#pop").attr("data-content", "<b>Balance:</b>" + "<br/>" + "<i>" + BalanceD + " Denari </i>" + "<br>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<b>Bonus:</b>" + "<br/>" + "<i>" + BonusD + " Denari </i><b id='bonusL'></b>" + "<br/>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<button class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' data-toggle='modal' data-target='#AccountInfo' type='button'>Account Info</button><button data-toggle='modal' data-target='#TopupAmt' class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' type='button'>Topup Wallet</button>");
								},
								error:function(error){
									console.log(JSON.stringify(error));
									
								},
			                    complete: function () {
			                        $('#successMSG').html("Bid placed successfully.You can now check your bid ranking");
			                        $('#SuccessM').modal('show');

			                        $('#' + BtnId).removeAttr("class");
			                        $('#' + BtnId).addClass("btn btn-success");

			                        $('#' + BtnId).removeClass('disabled');
			                        $('#' + BtnId).html('Bid Now');
			                    }
			                });
			            },
			            error: function (error) {
			                console.log(JSON.stringify(error));
							
							$('#bidmountM').modal('hide');
							$('#'+BtnId).removeClass('disabled');
							$('#'+BtnId).html('Bid Now');
			                $('#errorMSG').html("An error occured, please try again later!");
			                $('#ErrorM').modal('show');
			            },
			            complete: function () {
			                $('#prod1').modal('hide');
			            }
			        });

			    });
			

		//for the get bid Rank
		jQuery(document).delegate("#content button[type='Rank']","click",function(event){
			BtnId=$(this).attr('id');
			
			event.preventDefault();
			$.ajax({
				url:'http://pennycoreapi.azurewebsites.net/Auction/GetBidderRanking',
				method:'GET',
				headers:{'Authorization':sessionStorage.type+' '+sessionStorage.Osession},
				dataType:'json',
				data:'auctionId'+'='+BtnId,
				success:function(ResponseBody){
					console.log(JSON.stringify(ResponseBody));

					ResponsePC=ResponseBody;
					$("#bidRankContent").empty();

					for (var i=0;i<ResponsePC.length;i++) {
								if(ResponsePC[i].position=='1'){
									$("#bidRankContent").append('<div class="row"><div class="col-3 col-sm-3 col-md-3 col-lg-3 text-center"><img src="'+ResponsePC[i].url+'" alt="user image" width="50px" height="50px"></div><div class="col-3 col-sm-3 col-md-3 col-lg-3 text-dark"><b>'+ResponsePC[i].userName+'</b></div><div class="col-6 col-sm-6 col-md-6 col-lg-6"><div class="progress style="height:40px;"><div class="progress-bar bg-success" style="width:'+ResponsePC[i].totalBids+';">'+ResponsePC[i].totalBids+'Denari</div></div></div></div><hr>');
								}
								else if(ResponsePC[i].position=='2'){
									$("#bidRankContent").append('<div class="row"><div class="col-3 col-sm-3 col-md-3 col-lg-3 text-center"><img src="'+ResponsePC[i].url+'" alt="user image" width="50px" height="50px"></div><div class="col-3 col-sm-3 col-md-3 col-lg-3 text-dark"><b>'+ResponsePC[i].userName+'</b></div><div class="col-6 col-sm-6 col-md-6 col-lg-6"><div class="progress style="height:40px;"><div class="progress-bar bg-primary" style="width:'+ResponsePC[i].totalBids+';">'+ResponsePC[i].totalBids+'Denari</div></div></div></div><hr>');
								}
								else{
									$("#bidRankContent").append('<div class="row"><div class="col-3 col-sm-3 col-md-3 col-lg-3 text-center"><img src="'+ResponsePC[i].url+'" alt="user image" width="50px" height="50px"></div><div class="col-3 col-sm-3 col-md-3 col-lg-3 text-dark"><b>'+ResponsePC[i].userName+'</b></div><div class="col-6 col-sm-6 col-md-6 col-lg-6"><div class="progress style="height:40px;"><div class="progress-bar bg-danger" style="width:'+ResponsePC[i].totalBids+';">'+ResponsePC[i].totalBids+'Denari</div></div></div></div><hr>');
								}
						
					}

					$("#BidRank").modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("An Error occured, Please try again later.");
				    $('#ErrorM').modal('show');
				}
				
			});

			
		});
		
		var btnId;
		var AmountP;
		
		//for the my bid rank
		$("#MybidR").click(function(event){
			event.preventDefault();
			
			$.ajax({
				url:'http://pennycoreapi.azurewebsites.net/Auction/MyBidRanking?auctionId='+BtnId,
				method:'POST',
				dataType:'json',
				data:{'auctionId':BtnId},
				success:function(ResponseBody){
					console.log(JSON.stringify(ResponseBody));
					
					var ResponseT=JSON.parse(JSON.stringify(ResponseBody));
					$("#Runame").html(ResponseT.userName);
					$("#Rtb").html(ResponseT.totalBids);
					$("#Rpos").html(ResponseT.position);
					
					for (var key in ResponseT.bids) {
						if (ResponseT.bids.hasOwnProperty(key)) {
							btnId=ResponseT.bids[key].id;
							
							AmountP=ResponseT.bids[key].amount;
						}
					}
					$('.PBbtn').attr('id',btnId);
					
					$("#BidRank").modal('hide');
					$("#MyRank").modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
					$("#BidRank").modal('hide');
				    $('#errorMSG').html("An Error occured, Please try again later.");
				    $('#ErrorM').modal('show');
				}
			});
		});
		
		//for the get statement
		$("#Getstatembtn").click(function(event){
			event.preventDefault();
			
			var dateStart=$('#fromDate').val();
			var dateEnd=$('#EndDate').val();
			
			$.ajax({
				url:'http://pennycoreapi.azurewebsites.net/DWallet/GetStatement',
				method:'GET',
				dataType:'json',
				data:{'dateRange.start':dateStart,'dateRange.end':dateEnd},
				success:function(Response){
					console.log(JSON.stringify(Response));
					$("getStatmentC").empty();
					$("#getStatmentF").empty();
					
					for (var key in Response) {
							if (Response.hasOwnProperty(key)) {
								$("#getStatmentC").append('<ol style="list-style-type:circle;"><li><i>timestamp</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response[key].timestamp+'</i></li><li><i>TransactionRef</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response[key].transactionRef+'</i></li><li><i>Amount</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response[key].amount+'</i></li><li><i>Amount(KES)</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response[key].amountInKES+'</i></li><li><i>Type</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response[key].type+'</i></li><li><i>Details</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response[key].details+'</i></li></ol>');
							}
					}
					$("#Getstatem").modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("Failed! Please try again later.");
				    $('#ErrorM').modal('show');
				}
			});
		});
		
		var Bids;
		var AuctID;
		
		
				//for the promote bid
			$('#BPAbtn').click(function (event) {
			    event.preventDefault();
				$("#MyRank").modal('hide');
				$('#'+btnId).addClass('disabled');
				$('#'+btnId).html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');

			    var times = $('#BPA').val();

			    if (times == "") {
					$('#'+btnId).removeClass('disabled');
					$('#'+btnId).html('Promote Bid');
			        $('#errorMSG').html("Please fill in some Amount!");
			        $('#ErrorM').modal('show');
			        return false;
			    }
				else if(times=="0" || times=="1"){
					$('#'+btnId).removeClass('disabled');
					$('#'+btnId).html('Promote Bid');
			        $('#errorMSG').html("Bid cannot be multiplied by "+times+" ! Input new value." );
			        $('#ErrorM').modal('show');
			        return false;
				}
				
			    else {
			        

			        var NewBid = AmountP * times;

			        var someChecks = NewBid - AmountP;

			        if (someChecks > BalanceD && someChecks > BonusD) {
						$('#'+btnId).removeClass('disabled');
						$('#'+btnId).html('Promote Bid');
			            $('#errorMSG').html("You are low on Denaries.Please top up to continue");
			            $('#ErrorM').modal('show');
						$('#TopupAmt').modal('show');
			            
			            return false;
			        }
					else {
			            var Cont = confirm("You are about to promote your bid from " + AmountP + " to " + NewBid);
			            if (Cont == true) {
			                $.ajax({
			                    url: 'http://pennycoreapi.azurewebsites.net/Bids/PromoteBid',
			                    method: 'PUT',
			                    dataType: 'json',
			                    data: "{ 'id':"+btnId+", 'times': "+times+" }",
			                    success: function (Response) {
			                        console.log(JSON.stringify(Response));
									$('#'+btnId).removeClass('disabled');
									$('#'+btnId).html('Promote Bid');
									$('#BPromote').modal('hide');
			                        $('#successMSG').html("Bid Promoted successfully.\n You can now check your new bid ranking.");
			                        $('#SuccessM').modal('show');
									
									//To update my bid rank
									$.ajax({
										url:'http://pennycoreapi.azurewebsites.net/Auction/MyBidRanking?auctionId='+BtnId,
										method:'POST',
										dataType:'json',
										data:{'auctionId':BtnId},
										success:function(ResponseBody){
											console.log(JSON.stringify(ResponseBody));
					
											var ResponseT=JSON.parse(JSON.stringify(ResponseBody));
											$("#Runame").html(ResponseT.userName);
											$("#Rtb").html(ResponseT.totalBids);
											$("#Rpos").html(ResponseT.position);
					
											for (var key in ResponseT.bids) {
												if (ResponseT.bids.hasOwnProperty(key)) {
													btnId=ResponseT.bids[key].id;
							
													AmountP=ResponseT.bids[key].amount;
												}
											}
											$('.PBbtn').attr('id',btnId);
					
											$("#MyRank").modal('show');
										},
										error:function(error){
											console.log(JSON.stringify(error));
											
										}
									});
									
									//To udate the Dwallet
									$.ajax({
										url:'http://pennycoreapi.azurewebsites.net/Dwallet/GetWallet',
										method:'Get',
										dataType:'json',
										processData:false,
										success:function(ResponseBody){
											console.log(JSON.stringify(ResponseBody));
											BalanceD=ResponseBody.balance;
											BonusD=ResponseBody.bonus;
											$("#pop").attr("data-content", "<b>Balance:</b>" + "<br/>" + "<i>" + BalanceD + " Denari </i>" + "<br>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<b>Bonus:</b>" + "<br/>" + "<i>" + BonusD + " Denari </i><b id='bonusL'></b>" + "<br/>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<button class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' data-toggle='modal' data-target='#AccountInfo' type='button'>Account Info</button><button data-toggle='modal' data-target='#TopupAmt' class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' type='button'>Topup Wallet</button>");
										},
										error:function(error){
											console.log(JSON.stringify(error));
											
										}
									});
			                    },
			                    error: function (error) {
			                        console.log(JSON.stringify(error));
									$('#'+btnId).removeClass('disabled');
									$('#'+btnId).html('Promote Bid');
									$('#BPromote').modal('hide');
			                        $('#errorMSG').html("Failed!Please try again later.");
			                        $('#ErrorM').modal('show');
			                    }
			                });
			            }else{
							$('#'+btnId).removeClass('disabled');
							$('#'+btnId).html('Promote Bid');
						}
			        }
			    }
			});
		
            //On focus auto complete phonenumber
			$('#TopupPN').focus(function () {
			    var PN = $('#PNum').html();
			    if (PN !== "") {
			        $("#TopupPN").val(PN);
			    }
			});
			

        //for the Dwallet topup button
                $('#TopupBtn').click(function (event) {
                    event.preventDefault();

                        var Phonenumber = $("#TopupPN").val();

                        var Amount = $('#TopupMV').val();

                        if (Amount == ""||Phonenumber=="") {
							$('#TopupAmt').modal('hide');
							
                            $('#errorMSG').html("please fill in all values!");
                            $('#ErrorM').modal('show');
                            return false;
                        }
                        else if (Amount <= 10) {
							$('#TopupAmt').modal('hide');
							
                            $('#errorMSG').html("Amount must be greater than 10!");
                            $('#ErrorM').modal('show');
                            return false;
                        }
                        else if (Phonenumber.length != 10) {
                            $('#errorMSG').html("phone number should be equal to 10 characters!");
                            $('#ErrorM').modal('show');
                            return false;
                        }

                        PhoneNumber = Phonenumber.toString();


                        $.ajax({
                            url: "http://pennycoreapi.azurewebsites.net/DWallet/Topup",
                            method: 'Post',
                            dataType: 'json',
                            data: JSON.stringify({ 'amount': Amount, 'phoneNumber': PhoneNumber }),
                            success: function (ResponseBody) {
                                console.log(JSON.stringify(ResponseBody));
                                
                                $('#successMSG').html("success!wait for mpesa popup.");
                                $('#SuccessM').modal('show');
								
								
                            },
                            error: function (error) {
                                console.log(JSON.stringify(error));
								
                                $('#errorMSG').html("Failed!please try again later");
                                $('#ErrorM').modal('show');
                            },
                            complete: function () {
                                $('#TopupAmt').modal('hide');	
                                
                            }

                        });
            
                });
           
        
         //for the view old password
        $('#OPV').click(function(event){
			event.preventDefault();
			if($('#oldP').attr('type')=='password'){
				$('#oldP').removeAttr('type');
				$('#oldP').attr('type','text');
			}else{
				$('#oldP').removeAttr('type');
				$('#oldP').attr('type','password');
			}
		});
		//for the view new password
		$('#NPV').click(function(event){
			event.preventDefault();
			if($('#NewP').attr('type')=='password'){
				$('#NewP').removeAttr('type');
				$('#NewP').attr('type','text');
			}else{
				$('#NewP').removeAttr('type');
				$('#NewP').attr('type','password');
			}
		});
		//for the view confirm new password
		$('#NCPV').click(function(event){
			event.preventDefault();
			if($('#conP').attr('type')=='password'){
				$('#conP').removeAttr('type');
				$('#conP').attr('type','text');
			}else{
				$('#conP').removeAttr('type');
				$('#conP').attr('type','password');
			}
		});
        

		//for the change password button
		$('#SubmitCP').click(function(event){
			event.preventDefault();
			
			var oldPassword=$('#oldP').val();
			var newPassword=$('#NewP').val();
			var confirmPassword=$('#conP').val();
			
			if(confirmPassword !==newPassword){
				$('#errorMSG').html("Password does not match!");
				$('#ErrorM').modal('show');
				return false;
			}

			var lengthValid = lengthValidator(newPassword);

			if (lengthValid) {
			    var capsValid = capitalValidator(newPassword);
			    if (capsValid) {
			        var lowerValid = lowercaseValidator(newPassword);
			        if (lowerValid) {
			            var numberValid = numberValidator(newPassword);
			            if (numberValid) {
			                var symbolValid = symbolValidator(newPassword);
			                if (symbolValid) {
								
								$('#SubmitCP').addClass('disabled');
								$('#SubmitCP').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');

			                    $.ajax({
									url:'http://pennycoreapi.azurewebsites.net/api/Account/changePassword',
									method:'Put',
									dataType:'json',
									data:JSON.stringify({'oldPassword':oldPassword,'newPassword':newPassword,'confirmPassword':confirmPassword}),
									success:function(ResponseBody){
										console.log(JSON.stringify(ResponseBody));
										$('#SubmitCP').removeClass('disabled');
										$('#SubmitCP').html('Change Password');
										$('#successMSG').html("password successful changed");
										$('#SuccessM').modal('show');
									},
									error:function(error){
										console.log(JSON.stringify(error));
										$('#SubmitCP').removeClass('disabled');
										$('#SubmitCP').html('Change Password');
										$('#errorMSG').html("We are experiencing errors.Please try again later");
										$('#ErrorM').modal('show');
									},
									complete:function(){
										$('#ChangeP').modal('toggle');
										$('#AccountInfo').modal('hide');
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

		//for the register additional info
		$('#addInfo').click(function(){
			event.preventDefault();
			var firstName=$('#FName').val();
			var lastName=$('#LName').val();
			var middleName=$('#MName').val();
			var nickName=$('#NickName').val();
			var phoneNumber = $('#PNumI').val();
			if (phoneNumber.length != 10) {
			    $('#errorMSG').html("PhoneNumber should be equal to 10 characters.");
			    $('#ErrorM').modal('show');
			    return false;
			}
			var idNumber=$('#Idnum').val();
			var dob=$('#Dob').val();
			var gender=$('#genI').val();

			$('#addInfo').addClass('disabled');
			$('#addInfo').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
			$.ajax({
				url:'http://pennycoreapi.azurewebsites.net/api/Account/RegisterAdditionalInfo',
				method:'Post',
				dataType:'json',
				data:JSON.stringify({'firstName':firstName,'lastName':lastName,'middleName':middleName,'nickName':nickName,'phoneNumber':phoneNumber,'idNumber':idNumber,'dob':dob,'gender':gender}),
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));
					$('#addInfo').removeClass('disabled');
					$('#addInfo').html('Submit');
				    $('#successMSG').html("Success.Additional information registered succefully");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
					console.log(JSON.stringify(error));
					$('#addInfo').removeClass('disabled');
					$('#addInfo').html('Submit');
					$('#errorMSG').html("We are experiencing errors.Please try again later");
					$('#ErrorM').modal('show');
				},
				complete:function(){
					$('#Reginfor').modal('hide');
					//To update the account information
					$.ajax({
						url:'http://pennycoreapi.azurewebsites.net/api/Account/UserInfo',
						method:'Get',
						dataType:'json',
						processData:false,
						success:function(ResponseBody){
							console.log(JSON.stringify(ResponseBody));
			
							var Name = ResponseBody.name;
							$("#name").html(Name);
							var Nickname = ResponseBody.nickname;
							$("#nickname").html(Nickname);
							var Username = ResponseBody.username;
							$("#username").html(Username);
							var EMail = ResponseBody.email;
							$("#email").html(EMail);
							var profilePic=ResponseBody.ProfilePic;
							if(profilePic===null){}
							else{
							$("#Ppic").attr("src",profilePic);
							}
							Phonenumber = ResponseBody.phoneNumber;
							$("#PNum").html(Phonenumber);
							var Idnumber = ResponseBody.idNumber;
							$("#idNum").html(Idnumber);
							var Gender = ResponseBody.gender;
							$("#gen").html(Gender);
							$("#dob").html(ResponseBody.dob);
							confirmEmail = ResponseBody.emailConfirmed;
							confirmPnum = ResponseBody.phoneNumberConfirmed;
							if (ResponseBody.emailConfirmed) {
								$("#CE").html("<span class='fa fa-check'></span>");
							} else {
								$("#CE").html("<span class='fa fa-close'></span>");
			
							}
							if (ResponseBody.phoneNumberConfirmed) {
								$("#CP").html("<span class='fa fa-check'></span>");
			
							} else {
								$("#CP").html("<span class='fa fa-close'></span>");
								$("#bonusL").html("<span class='fa fa-lock'></span>");
							}
			
						},
						error:function(error){
							console.log(JSON.stringify(error));
							
						}
					});
				}
			});
		});

	});

	//Acution products Active
	$("#LiveA").click(function(event){
		event.preventDefault();
	$.ajax({
					url:'http://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=ACTIVE',
					method:'Get',
					dataType:'json',
					headers:{
						'Content-Type':'application/json',
						'Authorization':sessionStorage.type+' '+sessionStorage.Osession
					},
					data:'state'+'='+'ACTIVE',
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						$("#content").empty();
						ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
						var i = 0;
						for (var key in ResponsePC) {
						    if (ResponsePC.hasOwnProperty(key)) {
						        i++;
								
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
									
						        $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 " style="display:flex;"><div class="card mb-3 text-center hoverable wow zoomInRight" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class=" view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p><a class="lead" data-toggle="collapse" href="#Description' + i + '" aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' + i + '"><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span><span id="expires'+i+'"></span></strong></h5><button class="btn btn-outline-deep-purple btn-sm float-left waves-effect" type="button" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].auctionPrice + '">Bid Now</button><button class="btn btn-success btn-sm float-right" type="Rank" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart fa-lg"></span></button></div></div></div>');
								jQuery("#expires"+i).countdown(mwaka,mwezi,siku,saa,dakika,sekunde);
							}
						}
					},
					error:function(error){
						console.log(JSON.stringify(error));
						$('#errorMSG').html("We are experiencing errors.Please try again later");
						$('#ErrorM').modal('show');
					}
	});
	});

	//Auction products closed
	$("#ClosedA").click(function(event){
		event.preventDefault();
	$.ajax({
					url:'http://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=CLOSED',
					method:'Get',
					dataType:'json',
					headers:{
						'Content-Type':'application/json',
						'Authorization':sessionStorage.type+' '+sessionStorage.Osession
					},
					data:'state'+'='+'CLOSED',
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						$("#content").empty();
						ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
						var i = 0;
						for (var key in ResponsePC) {
						    if (ResponsePC.hasOwnProperty(key)) {
						        i++;
							    $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 "><div class="card mb-3 text-center hoverable wow rotateIn" data-wow-delay="1.0" onclick="ClosedAlert()"><div class="view view-cascade overlay"><!--featured image--><div class="view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p> <a class="lead" data-toggle="collapse" href="#Description"' + i + ' aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description"' + i + '><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><button type="button" class="btn btn-success disabled float-left" onclick="ClosedAlert()">BID NOW</button></div></div></div>');
							}
						}
					},
					error:function(error){
						console.log(JSON.stringify(error));
						$('#errorMSG').html("We are experiencing errors.Please try again later");
						$('#ErrorM').modal('show');
					}
	});
	});

	//for the log out
	$("#logout").click(function(event){
			event.preventDefault();
			sessionStorage.clear();
			localStorage.removeItem("session");
			localStorage.removeItem("type");
			localStorage.removeItem("ExpTime");
			if(sessionStorage.session && localStorage.session){
			    $('#errorMSG').html("Failed.Please try again later");
			    $('#ErrorM').modal('show');
			} else {
			    $('#successMSG').html("Thank you for Visiting. ");
			    $('#SuccessM').modal('show');
				window.location="/";
			}
	});
	
	//function closed alert
	function ClosedAlert() {
	    $('#errorMSG').html("This Auction is closed.\nCheck the Live Auctions and bid on them.");
	    $('#ErrorM').modal('show');
	}
	
	//For the show image to upload
	$("#UPpic").on('change',function(){
		var imgPath=$(this)[0].value;
		var extn=imgPath.substring(imgPath.lastIndexOf('.')+1).toLowerCase();
		var image_holder=$("#holder");
		image_holder.empty();
		if(extn=="gif"||extn=="png"||extn=="jpg"||extn=="jpeg"){
			if(typeof(FileReader)!="undefined"){
				
					var reader=new FileReader();
					reader.onload=function(e){
						$("<img />",{"src":e.target.result,"class":"img-thumbnail","width":"200px","height":"200px"}).appendTo(image_holder);
					}
					image_holder.show();
					reader.readAsDataURL($(this)[0].files[0]);
				
			}
		}
		else{
			alert("please select images only.");
		}
	});

	//start the upload
	$("#UdpBtn").click(function(event){
		event.preventDefault();
		var image = $("#UPpic")[0].files[0];
		var form_data = new FormData();
		form_data.append("image",image);

		$.ajax({
			url:'http://pennycoreapi.azurewebsites.net/api/Account/UpdateProfilePic',
			type:'POST',
			data:form_data,
			cache:false,
			contentType:false,
			processData:false,
			success:function(ResponseBody){
				console.log(JSON.stringify(ResponseBody));

				//To update the account information
				$.ajax({
					url:'http://pennycoreapi.azurewebsites.net/api/Account/UserInfo',
					method:'Get',
					dataType:'json',
					processData:false,
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
		
						var Name = ResponseBody.name;
						$("#name").html(Name);
						var Nickname = ResponseBody.nickname;
						$("#nickname").html(Nickname);
						var Username = ResponseBody.username;
						$("#username").html(Username);
						var EMail = ResponseBody.email;
						$("#email").html(EMail);
						var profilePic=ResponseBody.ProfilePic;
						if(profilePic===null){}
						else{
						$("#Ppic").attr("src",profilePic);
						}
						Phonenumber = ResponseBody.phoneNumber;
						$("#PNum").html(Phonenumber);
						var Idnumber = ResponseBody.idNumber;
						$("#idNum").html(Idnumber);
						var Gender = ResponseBody.gender;
						$("#gen").html(Gender);
						$("#dob").html(ResponseBody.dob);
						confirmEmail = ResponseBody.emailConfirmed;
						confirmPnum = ResponseBody.phoneNumberConfirmed;
						if (ResponseBody.emailConfirmed) {
							$("#CE").html("<span class='fa fa-check'></span>");
						} else {
							$("#CE").html("<span class='fa fa-close'></span>");
		
						}
						if (ResponseBody.phoneNumberConfirmed) {
							$("#CP").html("<span class='fa fa-check'></span>");
		
						} else {
							$("#CP").html("<span class='fa fa-close'></span>");
							$("#bonusL").html("<span class='fa fa-lock'></span>");
						}
		
					},
					error:function(error){
						console.log(JSON.stringify(error));
						
					}
				});

				$('#successMSG').html("Profile Picture uploaded successifly.");
				$('#SuccessM').modal('show');
			},
			error:function(error){
				console.log(JSON.stringify(error));
				$('#errorMSG').html("Failed.Try again later.");
	    		$('#ErrorM').modal('show');
			}

		});
	});
}
else if(locate=="http://gadgets.pennyinc.co.ke/resetPassword.html"){
	$(document).ready(function(){
		var password;
		var confirmPassword;
		
		OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
		OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
		
		$("#RPsubmit").click(function(event){
		event.preventDefault();
		
		 password=$("#RPpass").val();
		confirmPassword=$("#RPcpass").val();
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
		                        url: "http://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

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
		                                url: 'http://pennycoreapi.azurewebsites.net/api/Account/ResetPassword',
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
		                                    console.stringify(JSON.stringify(error));
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
}
else if (locate == "http://gadgets.pennyinc.co.ke/confirmEmail.html") {
    $(document).ready(function(){
        var outletResponse;
			OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
			OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
			$("#CEmail").click(function () {
				event.preventDefault();
				
				
				$('#CEmail').addClass('disabled');
				$('#CEmail').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
				$.ajax({
					url:"http://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

					method:'POST',
					dataType:'json',
					headers:{
						'Content-Type':'application/json'
					},
					data:JSON.stringify({'username':OutAuthN,'password':OutAuthP}),
					success:function(ResponseBody){

						outletResponse =JSON.parse(JSON.stringify(ResponseBody));
						console.log(JSON.stringify(ResponseBody));
					},
					error:function(error){
						console.log(JSON.stringify(error));
					},
					complete:function(){
				
						$.ajax({
							url:'http://pennycoreapi.azurewebsites.net/api/Account/ConfirmEmail',
							method:'GET',
							headers:{'Authorization':outletResponse.token_type +' '+ outletResponse.access_token},
							data:{'ud':ud,'xc':xc},
							success:function(ResponseBody){
								console.log(JSON.stringify(ResponseBody));
								alert("Email confirmed Successful");
								window.location="https://www.pennyinc.co.ke";
							},
							error:function(error){
								console.log(JSON.stringify(error));
								$('#CEmail').removeClass('disabled');
								$('#CEmail').html('Continue');
								alert("Failed. Try again later.");
							}
						});
					}
				});
			});
		});
}

$(document).ready(function () {
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
        var outletResponse;
        $.ajax({
            url: "http://pennycoreapi.azurewebsites.net/oAuth2/GetToken",

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
                    url: 'http://pennycoreapi.azurewebsites.net/api/Account/SendEmail',
                    method: 'POST',
                    dataType: 'json',
                    headers: { 'Authorization': outletResponse.token_type + ' ' + outletResponse.access_token },
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
            }
        });
    });
});