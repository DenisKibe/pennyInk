var locate;
var ud;
var xc;
locate=window.location.href;
sessionStorage.OPassEn="9a8b7c6d5e";var OutAuthP;sessionStorage.OName="U2FsdGVkX19db19/l9WrPhELJLZW74bbvw0dZC3ilW1RG4fISbLIAgo3nllBAVcQ";var OutAuthN;sessionStorage.OPass="U2FsdGVkX1+tg2/0WmWeVXDcQbAHi/p3PcTpVoEJaUk=";sessionStorage.ONameEn="1z2y3x4w5v";

var linkR=/[#]/;
var finds=/[?]/;
if(locate.match(finds)){
	var pos=locate.indexOf('?');
	var pos=pos-1;
	
	var Qparm=locate.slice(pos,locate.length);
	locate= locate.slice(0,pos);
	
	var sep=Qparm.indexOf('&');
	
	ud=Qparm.slice(5,sep);
	
	var sep=sep+4;
	xc=Qparm.slice(sep,Qparm.length);
	
	
	}else if(locate.match(linkR)){
	
		locate=locate.replace("#"," ");
	}else{
	
		locate=window.location.href;
	}

if (locate == "http://gadgets.pennyinc.co.ke/" || locate == "http://gadgets.pennyinc.co.ke/index.html") {
	$(document).ready(function(){
	
		var outletResponse;
		var userResponse;
		OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
		OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
		
		//for the products in the splash screen
		$.ajax({
			url:"http://api.pennyinc.co.ke/oAuth2/GetToken",

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
					url:'http://api.pennyinc.co.ke/Auction/GetAuctions',
					method:'Get',
					dataType:'json',
					headers:{
						'Content-Type':'application/json',
						'Authorization':outletResponse.token_type+' '+outletResponse.access_token
					},
					data:{'state':'ACTIVE'},
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						ResponsePC=JSON.parse(JSON.stringify(ResponseBody));
							//version 1 products
						$("#prodv11").attr({"src":ResponsePC[0].imageUrl,"alt":ResponsePC[0].name});
						$("#prodv1T").html(ResponsePC[0].name);
						
						$("#prodv12").attr({"src":ResponsePC[1].imageUrl,"alt":ResponsePC[1].name});
						$("#prodv1T2").html(ResponsePC[1].name);
						
						$("#prodv13").attr({"src":ResponsePC[2].imageUrl,"alt":ResponsePC[2].name});
						$("#prodv1T3").html(ResponsePC[2].name);
						
						$("#prodv14").attr({"src":ResponsePC[3].imageUrl,"alt":ResponsePC[3].name});
						$("#prodv1T4").html(ResponsePC[3].name);
						
							//version 2 products
						$("#prodv21").attr({"src":ResponsePC[4].imageUrl,"alt":ResponsePC[4].name});
						$("#prodv2T").html(ResponsePC[4].name);
						$("#prodv2D").html(ResponsePC[4].description);
						$("#prodv2P").html(ResponsePC[4].auctionPrice);
						
						$("#prodv22").attr({"src":ResponsePC[5].imageUrl,"alt":ResponsePC[5].name});
						$("#prodv2T2").html(ResponsePC[5].name);
						$("#prodv2D2").html(ResponsePC[5].description);
						$("#prodv2P2").html(ResponsePC[5].auctionPrice);
						
						$("#prodv23").attr({"src":ResponsePC[6].imageUrl,"alt":ResponsePC[6].name});
						$("#prodv2T3").html(ResponsePC[6].name);
						$("#prodv2D3").html(ResponsePC[6].description);
						$("#prodv2P3").html(ResponsePC[6].auctionPrice);
						
							//version 3 products
						$("#prodv31").attr({"src":ResponsePC[7].imageUrl,"alt":ResponsePC[7].name});
						$("#prodv3T").html(ResponsePC[7].name);
						$("#prodv3P").html(ResponsePC[7].auctionPrice);
						
						$("#prodv32").attr({"src":ResponsePC[8].imageUrl,"alt":ResponsePC[8].name});
						$("#prodv3T2").html(ResponsePC[8].name);
						$("#prodv3P2").html(ResponsePC[8].auctionPrice);
						
						$("#prodv33").attr({"src":ResponsePC[9].imageUrl,"alt":ResponsePC[9].name});
						$("#prodv3T3").html(ResponsePC[9].name);
						$("#prodv3P3").html(ResponsePC[9].auctionPrice);
						
						$("#prodv34").attr({"src":ResponsePC[10].imageUrl,"alt":ResponsePC[10].name});
						$("#prodv3T4").html(ResponsePC[10].name);
						$("#prodv3P4").html(ResponsePC[10].auctionPrice);

						$('#successMSG').html("Welcome!\nPlease Login to view more Auctions \nand \nEnjoy to bid");
						$('#SuccessM').modal('show');
					},
					error:function(error){
					    console.log(JSON.stringify(error));
					    $('#errorMSG').html("An error occurred.Please try again later!");
					    $('#ErrorM').modal('show');
					}
				});
			}
		});


		//password validator

		function lengthValidator(pass){
			if (pass.length >= 8) {
				return true;
			} else {

				alert("password must be greater than 8 characters!"+pass.length);
				return false;
			}
		};

		function capitalValidator(pass){
			const upperCaseLetters = /[A-Z]/g;
			if (pass.match(upperCaseLetters)) {
				return true;
			} else {
				alert("password must contain atleast one upperCaseLetter!");
				return false;
			}
		};

		function lowercaseValidator(pass){
			const lowerCaseLetters = /[a-z]/g;
			if (pass.match(lowerCaseLetters)) {
				return true;
			} else {
				alert("password must contain atleast lowerCaseLetters!");
				return false;
			}
		};

		function numberValidator(pass){
			const numbers = /[0-9]/g;
			if (pass.match(numbers)) {
				return true;
			} else {
				alert("password must contain atleast one number!");
				return false;
			}
		};

		function symbolValidator(pass){
			const symbols = /[$-/:-?{-~!"^_`\[\]@#]/;
			if (pass.match(symbols)) {
				return true;
			} else {
				alert("password must contain atleast one symbol eg $-/:-?^_@#");
				return false;
			}
		};

		//for the login
		$('#SubmitL').click(function(event){
			event.preventDefault();
			var username=$('#Email').val();
			var password=$('#PwordL').val();


			lengthValidator(password);
			capitalValidator(password);
			lowercaseValidator(password);
			numberValidator(password);
			symbolValidator(password);


			$.ajaxSetup({
				headers:{
					'Content-Type':'application/json'
				}
			});

			$.ajax({
				url:"http://api.pennyinc.co.ke/oAuth2/GetToken",

				method:'POST',
				dataType:'json',
				data:JSON.stringify({'username':username,'password':password}),
				success:function(ResponseBody){

					console.log(JSON.stringify(ResponseBody));
					
					userResponse =JSON.parse(JSON.stringify(ResponseBody));
					if (userResponse.access_token == "") {
					    $('#errorMSG').html("Failed! Your Email or password is invalid");
					    $('#ErrorM').modal('show');
					    return false;
					}
					else if (typeof (Storage) == "undefined") {
					    $('#errorMSG').html("please use a modern browser!");
					    $('#ErrorM').modal('show');
					    return false;
					}else{
					    sessionStorage.session=userResponse.access_token;
					    sessionStorage.type = userResponse.token_type;

					    window.location = "productPage.html";
					}
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("Failed!Please try again later.");
				    $('#ErrorM').modal('show');
				}
			});

		});

		//for the signup area
		var password;
        var confirmPassword;
		$('#SubmitS').click(function(event){
			event.preventDefault();
			password=$('#PwordS').val();
			confirmPassword=$('#Cpword').val();
			
			lengthValidator(password);
			capitalValidator(password);
			lowercaseValidator(password);
			numberValidator(password);
			symbolValidator(password);
			
			if (password != confirmPassword) {
			    $('#errorMSG').html("Password does not much!");
			    $('#ErrorM').modal('show');

				$('#Cpword').focus();
				return false;

			}

			$.ajax({
				url:"http://api.pennyinc.co.ke/oAuth2/GetToken",

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

					var email=$('#EmailS').val();
					var fName=$('#firstname').val();
					var lName=$('#lastname').val();



					$.ajaxSetup({
						headers:{
							'Content-Type':'application/json',
							'Authorization':outletResponse.token_type +' '+ outletResponse.access_token
						}
					});

					$.ajax({
						url:"http://api.pennyinc.co.ke/api/Account/RegisterUser",

						method:'POST',
						dataType:'json',
						data:JSON.stringify({'email':email,'fName':fName,'lName':lName,'password':password,'confirmPassword':confirmPassword}),
						success:function(ResponseBody){
							console.log(JSON.stringify(ResponseBody));

							$('#successMSG').html("Success! User is now Registered.\n You can now login.");
							$('#SuccessM').modal('show');
						},
						error:function(error){
						    console.log(JSON.stringify(error));
						    $('#errorMSG').html("Could Not Register User!Please try again later.");
						    $('#ErrorM').modal('show');
						}
					});
				}
			});

		});

		//for the forgot password
		$("#changeP").click(function(){
			var username=$('#Email').val();

			if(username==""){
				alert("please fill out this field");
				$("#Email").focus();
				return false;
			}
			$.ajax({
				url:"http://api.pennyinc.co.ke/api/Account/ResetPassword",
				method:'Put',
				dataType:'json',
				data:{'username':username,'resetPasswordEndpoint':'http://gadgets.pennyinc.co.ke/resetPassword.html'},
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));

				    $('#successMSG').html("Email Reset link send to your Email!");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("failed!/n Action could not be completed at this time.\n please try again later");
				    $('#ErrorM').modal('show');
				}

			});
		});
    });

}


//To be used only when the user is loged in
else if (locate == "http://gadgets.pennyinc.co.ke/productPage.html") {
    
	$(document).ready(function(){
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
            url:'http://api.pennyinc.co.ke/api/Account/UserInfo',
            method:'Get',
            dataType:'json',
            processData:false,
            success:function(ResponseBody){
                console.log(JSON.stringify(ResponseBody));
				if(ResponseBody.emailConfirmed==false){
							//send confirmation email 
							$.ajax({
								url:'http://api.pennyinc.co.ke/api/Account/SendEmailConfirmation',
								method:'POST',
								dataType:'json',
								data:JSON.stringify({'confirmationEndpoint':'gadgets.pennyinc.co.ke/confirmEmail.html','appName':'Denari Gadgets'}),
								success:function(Response){
								    console.log(JSON.stringify(Response));
								    $('#successMSG').html("An Email has been sent to your Email Address.\n Please veryify Your Email.");
								    $('#SuccessM').modal('show');
								},
								error:function(error){
								    console.log(JSON.stringify(error));
								    $('#errorMSG').html("We are experiencing errors. Please try again later.");
								    $('#ErrorM').modal('show');
								}
							});
				}else{
					var Name=ResponseBody.name;
					$("#name").html(Name);
					var Nickname=ResponseBody.nickname;
					$("#nickname").html(Nickname);
					var Username=ResponseBody.username;
					$("#username").html(Username);
					var EMail=ResponseBody.email;
					$("#email").html(EMail);
					Phonenumber=ResponseBody.phoneNumber;
					$("#PNum").html(Phonenumber);
					var Idnumber=ResponseBody.idNumber;
					$("#idNum").html(Idnumber);
					var Gender=ResponseBody.gender;
					$("#gen").html(Gender);
					$("#dob").html(ResponseBody.dob);
					confirmEmail=ResponseBody.emailConfirmed;
					confirmPnum=ResponseBody.phoneNumberConfirmed;
					if(ResponseBody.emailConfirmed){
						$("#CE").html("<span class='fa fa-check'></span>");
					}else{
						$("#CE").html("<span class='fa fa-close'></span>");
					}
					if(ResponseBody.phoneNumberConfirmed){
						$("#CP").html("<span class='fa fa-check'></span>");
						
					}else{
						$("#CP").html("<span class='fa fa-close'></span>");
						$("#bonusL").html("<span class='fa fa-lock'></span>");
					}
					
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
	
	
	$("#bonusL").click(function () {
	    $('#errorMSG').html("Bonus will be unlocked on Your first Deposite.");
	    $('#ErrorM').modal('show');
	});

		
		
		OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
		OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);

		$.ajax({
			url:"http://api.pennyinc.co.ke/oAuth2/GetToken",

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
					url:'http://api.pennyinc.co.ke/Auction/GetAuctions',
					method:'Get',
					dataType:'json',
					headers:{
						'Content-Type':'application/json',
						'Authorization':outletResponse.token_type+' '+outletResponse.access_token
					},
					data:{'state':'ACTIVE'},
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
						var i = 0;
						for (var key in ResponsePC) {
						    if (ResponsePC.hasOwnProperty(key)) {
						        i++;
						        $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 " style="display:flex;"><div class="card mb-3 text-center hoverable wow zoomOutRight" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class=" view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p><a class="lead" data-toggle="collapse" href="#Description' + i + '" aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' + i + '"><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span>' + ResponsePC[key].expiryDate + '</strong></h5><button class="btn btn-outline-deep-purple btn-sm float-left waves-effect" type="button" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].auctionPrice + '">Bid Now</button><button class="btn btn-success btn-sm float-right" type="Rank" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart fa-lg"></span></button></div></div></div>');
							}
						}
						$('#successMSG').html("you can now start bidding! Enjoy.");
						$('#SuccessM').modal('show');
					},
					error:function(error){
					    console.log(JSON.stringify(error));
					    $('#errorMSG').html("An error occurred.Please try again later.");
					    $('#ErrorM').modal('show');
					}
				});
			}
		});

		//for the bid button
		
		//for getting id of the button clicked
		jQuery(document).delegate("#content button[type='button']","click",
		function(event){
			event.preventDefault();
			
			BtnId=$(this).attr('id');
			price=$(this).attr('name');

			console.log(BtnId);
			
			if (confirmEmail == false) {
			    $('#errorMSG').html("Please confirm Your Email to enjoy Bidding.");
			    $('#ErrorM').modal('show');
				return false;
			}
			else if (confirmPnum == false) {
			    $('#errorMSG').html("Please confirm your Phone Number to enjoy bidding.\n Phone Number will be confirmed on your 1st Top up.");
			    $('#ErrorM').modal('show');
				return false;
			}
			else{

			var Amount=prompt("Enter Amount to bid:");
			
			if (Amount = "") {
			    $('#errorMSG').html("please fill in amount you want to place");
			    $('#ErrorM').modal('show');
					return false;
			}
			else if (!isNaN(Amount)) {
			    $('#errorMSG').html("Only numeric values are allowed!");
			    $('#ErrorM').modal('show');
				return false;
			}
			else if(Amount<$("#bal").html()&&Amount<$("#bon").html()){
				alert("Please top up first");
				$('#DTopup').modal('show');
				return false;
			}
			else if (Amount < price) {
			    $('#errorMSG').html("Bid must be equal to or higher than the price.\nPlease increase your amount.");
			    $('#ErrorM').modal('show');
				return false;
			}
			$(this).removeAttr("class");
			$(this).addClass("btn btn-success");
		
			$.ajax({
				url:'http://api.pennyinc.co.ke/Bids/PlaceBid',
				method:'Post',
				dataType:'json',
				data:{'amount':Amount,'auctionId':BtnId},
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));
				    $('#successMSG').html("Bid placed successfully.You can now check your bid ranking");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("An error occured, please try again later!");
				    $('#ErrorM').modal('show');
				},
				complete:function(){
					$('#prod1').modal('hide');
					//To update the Dwallet
					$.ajax({
						url:'http://api.pennyinc.co.ke/Dwallet/GetWallet',
						method:'Get',
						dataType:'json',
						processData:false,
						success:function(ResponseBody){
							console.log(JSON.stringify(ResponseBody));
							$("#bal").html(ResponseBody.balance);
							$("#bon").html(ResponseBody.bonus);
						},
						error:function(error){
						    console.log(JSON.stringify(error));
						    $('#errorMSG').html("An error occured, please try again later!");
						    $('#ErrorM').modal('show');
						}
					});
				}
			});
			}
		});

		//for the get bid Rank
		jQuery(document).delegate("#content button[type='Rank']","click",function(event){
			BtnId=$(this).attr('id');
			
			event.preventDefault();
			$.ajax({
				url:'http://api.pennyinc.co.ke/Auction/GetBidderRanking',
				method:'GET',
				headers:{'Authorization':sessionStorage.type+' '+sessionStorage.Osession},
				dataType:'json',
				data:'auctionId'+'='+BtnId,
				success:function(ResponseBody){
					console.log(JSON.stringify(ResponseBody));

					for (var key in ResponseBody) {
							if (ResponseBody.hasOwnProperty(key)) {
								$("#bidRankContent").append('<div class="row"><div class="col-4 col-sm-4 col-md-4 col-lg-4"><b>'+ResponseBody[key].userName+'</b></div><div class="col-8 col-sm-8 col-md-8 col-lg-8"><div class="progress"><div class="progress-bar bg-success progress-bar-striped progress-bar-animated" style="width:'+ResponseBody[key].totalBids+';">'+ResponseBody[key].totalBids+'Denari</div></div></div></div>');
							}
					}
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("An Error occured, Please try again later.");
				    $('#ErrorM').modal('show');
				},
				complete:function(){
					$("#BidRank").modal('show');
				}
			});

			
		});
		
		//for the my bid rank
		$("#MybidR").click(function(event){
			event.preventDefault();
			
			$.ajax({
				url:'http://api.pennyinc.co.ke/Auction/MyBidRanking?auctionId='+BtnId,
				method:'POST',
				dataType:'json',
				data:{'auctionId':BtnId},
				success:function(ResponseBody){
					console.log(JSON.stringify(ResponseBody));
					$("#Runame").html(ResponseBody.UserName);
					$("#Rtb").html(ResponseBody.totalBids);
					$("#Rpos").html(ResponseBody.position);
					
					for (var key in Response.bids) {
							if (Response.bids.hasOwnProperty(key)) {
						
						
								$("#Mybidcontent").append('<ol style="list-style-type:square;"><li><i>Amount</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response.bids[key].amount+'</i></li><li><i>Id</i> <span class="fa fa-angle-double-right"></span> <i id="">'+Response.bids[key].auctionId+'</i></li><li><button type="button" class="btn btn-primary" name="'+Response.bids[key].auctionId+'" id="'+Response.bids[key].id+'">Promote Bid</button></li></ol>');
							}
					}
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("An Error occured, Please try again later.");
				    $('#ErrorM').modal('show');
				},
				complete:function(){
					$("#MyRank").modal('show');
				}
			});
		});
		
		//for the get statement
		$("#Getstatembtn").click(function(event){
			event.preventDefault();
			
			var dateStart=$('#fromDate').val();
			var dateEnd=$('#EndDate').val();
			
			$.ajax({
				url:'http://api.pennyinc.co.ke/DWallet/GetStatement',
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
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("Failed! Please try again later.");
				    $('#ErrorM').modal('show');
				},
				complete(){
					$("#Getstatem").modal('show');
				}
			});
		});
		
		var Bids;
		
		//for the promote bid
		jQuery(document).delegate("#Mybidcontent button[type='button']","click",function(event){
			event.preventDefault();
			
			BtnId=$(this).attr('id');
			var AuctID=$(this).attr('name');
			
			var times=prompt("Enter by how many times you want to promote your bid:");
			
			if (times == "") {
			    $('#errorMSG').html("Please fill in some Amount!");
			    $('#ErrorM').modal('show');
				return false;
			}
			else if (isNaN(times)) {
			    $('#errorMSG').html("only numbers are allowed!");
			    $('#ErrorM').modal('show');
				return false;
			}else{
				$.ajax({
					url:'http://api.pennyinc.co.ke/Auction/MyBidRanking',
					method:'POST',
					dataType:'json',
					data:{'auctionId':AuctID},
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						Bids=ResponseBody.totalBids;
					},
					error:function(error){
					    consloe.log(JSON.stringify(error));
					    $('#errorMSG').html("Failed!Please try again later.");
					    $('#ErrorM').modal('show');
					}
				});
				
				var NewBid=Bids*times;
				
				var someChecks=NewBid-Bids;
				
				if (someChecks < $("#bal").html() && someChecks < $("#bon").html()) {
					alert("Please top up 1st");
					$('#DTopup').modal('show');
				return false;
				}else{
					var Cont=confirm("You are about to promote your bid from "+Bids+" to "+NewBid);
					if(Cont==true){
						$.ajax({
							url:'http://api.pennyinc.co.ke/Bids/PromoteBid',
							method:'PUT',
							dataType:'json',
							data:{'id':BtnId,'times':times},
							success:function(Response){
							    console.log(JSON.stringify(Response));
							    $('#successMSG').html("Bid Promoted successfully.\n You can now check your new bid ranking.");
							    $('#SuccessM').modal('show');
							},
							error:function(error){
							    console.log(JSON.stringify(error));
							    $('#errorMSG').html("Failed!Please try again later.");
							    $('#ErrorM').modal('show');
							}
						});
					}
				}
			}
		});
		
		//for the DWallet details
        $.ajax({
            url:'http://api.pennyinc.co.ke/Dwallet/GetWallet',
            method:'Get',
            dataType:'json',
            processData:false,
            success:function(ResponseBody){
                console.log(JSON.stringify(ResponseBody));
                var BalanceD=ResponseBody.balance;
                var BonusD=ResponseBody.bonus;
                $("#pop").attr("data-content", "<b>Balance:</b>" + "<br/>" + "<i>" + BalanceD + " Denari </i>" + "<br>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<b>Bonus:</b>" + "<br/>" + "<i>" + BonusD + " Denari </i>" + "<br/>" + "<hr class='mb-0 pb-0'>" + "<br/>" + "<button class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' data-toggle='modal' data-target='#AccountInfo' type='button'>Account Info</button><button data-toggle='modal' data-target='#DWTopup' class='btn btn-primary btn-sm pl-1 pr-1 mr-1 ml-1' type='button'>Topup Wallet</button>");
            },
            error:function(error){
                console.log(JSON.stringify(error));
                $('#errorMSG').html("We are experiencing errors.Please try again later");
                $('#ErrorM').modal('show');
            }
        });

        

        //for the Dwallet topup button

        $('#TopUpW').click(function(event){
			event.preventDefault();
			$('#DWTopup').modal('hide');
			var Amount=prompt("Enter Amount to Topup:");
			
			if (Amount==""){
			    $('#errorMSG').html("please insert Amount!");
			    $('#ErrorM').modal('show');
				return false;
			}
			else if (isNaN(Amount)) {
			    $('#errorMSG').html("Only numeric values accepted!");
			    $('#ErrorM').modal('show');
				return false;
			}
			else if (Amount <= 10) {
			    $('#errorMSG').html("Amount must be greater than 10!");
			    $('#ErrorM').modal('show');
				return false;
			}
			else if(Phonenumber==""){
				Phonenumber=prompt("Enter phone Number:","07********");
				if (isNaN(phonenumber)) {
				    $('#errorMSG').html("Only numeric values accepted!");
				    $('#ErrorM').modal('show');
					return false;
				}
				else if (phonenumber.length != 10) {
				    $('#errorMSG').html("Phone Number not valid!\n Number should contain 10 characters.");
				    $('#ErrorM').modal('show');
					return false;
				}
			}
			
			var PhoneNumber=Phonenumber.toString();


			$.ajax({
				url:"http://api.pennyinc.co.ke/DWallet/Topup",
				method:'Post',
				dataType:'json',
				data:JSON.stringify({'amount':Amount,'phoneNumber':PhoneNumber}),
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));
				    $('#successMSG').html("success!wait for mpesa popup.");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("Failed!please try again later");
				    $('#ErrorM').modal('show');
				},
				complete:function(){
					$('#DTopup').modal('hide');
					//to update the Dwallet
					$.ajax({
						url:'http://api.pennyinc.co.ke/Dwallet/GetWallet',
						method:'Get',
						dataType:'json',
						processData:false,
						success:function(ResponseBody){
							console.log(JSON.stringify(ResponseBody));
							$("#bal").html(ResponseBody.balance);
							$("#bon").html(ResponseBody.bonus);
						},
						error:function(error){
						    console.log(JSON.stringify(error));
						    $('#errorMSG').html("We are experiencing errors.Please try again later");
						    $('#ErrorM').modal('show');
						}
					});
				}

			});
		});

		//for the change password button
		$('#changeP').click(function(){
			event.preventDefault();
			var oldPassword=$('#oldP').val();
			var newPassword=$('#NewP').val();
			var confirmPassword=$('#conP').val();


			$.ajax({
				url:'http://api.pennyinc.co.ke/api/Account/changePassword',
				method:'Put',
				dataType:'json',
				data:JSON.stringify({'oldPassword':oldPassword,'newPassword':newPassword,'confirmPassword':confirmPassword}),
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));
				    $('#successMSG').html("password successful changed");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("We are experiencing errors.Please try again later");
				    $('#ErrorM').modal('show');
				},
				complete:function(){
				    $('#ChangeP').modal('toggle');
				}
			});
		});

		//for the register additional info
		$('#addInfo').click(function(){
			event.preventDefault();
			var firstName=$('#FName').val();
			var lastName=$('#LName').val();
			var middleName=$('#MName').val();
			var nickName=$('#NickName').val();
			var phoneNumber=$('#PNumI').val();
			var idNumber=$('#Idnum').val();
			var dob=$('#Dob').val();
			var gender=$('#genI').val();


			$.ajax({
				url:'http://api.pennyinc.co.ke/api/Account/RegisterAdditionalInfo',
				method:'Post',
				dataType:'json',
				data:JSON.stringify({'firstName':firstName,'lastName':lastName,'middleName':middleName,'nickName':nickName,'phoneNumber':phoneNumber,'idNumber':idNumber,'dob':dob,'gender':gender}),
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));
				    $('#successMSG').html("Success.Additional information registered succefully");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
					console.log(JSON.stringify(error));
					$('#errorMSG').html("We are experiencing errors.Please try again later");
					$('#ErrorM').modal('show');
				},
				complete:function(){
					$('#Reginfor').modal('hide');
					//To update the account information
					$.ajax({
						url:'http://api.pennyinc.co.ke/api/Account/UserInfo',
						method:'Get',
						dataType:'json',
						processData:false,
						success:function(ResponseBody){
							console.log(JSON.stringify(ResponseBody));
							$("#name").html(ResponseBody.name);
							$("#nickname").html(ResponseBody.nickname);
							$("#username").html(ResponseBody.username);
							$("#email").html(ResponseBody.email);
							$("#PNum").html(ResponseBody.phoneNumber);
							$("#idNum").html(ResponseBody.idNumber);
							$("#gen").html(ResponseBody.gender);
							$("#dob").html(ResponseBody.dob);

						},
						error:function(error){
							console.log(JSON.stringify(error));
							$('#errorMSG').html("We are experiencing errors.Please try again later");
							$('#ErrorM').modal('show');
						}
					});
				}
			});
		});

	});

	//Acution products Active
	$("#LiveA").click(function(){
		event.preventDefault();
	$.ajax({
					url:'http://api.pennyinc.co.ke/Auction/GetAuctions',
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
						        $("#content").append(' <div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 "><div class="card mb-3 text-center hoverable wow flipInX" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class=" view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p><a class="lead" data-toggle="collapse" href="#Description' + i + '" aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' + i + '"><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span>' + ResponsePC[key].expiryDate + '</strong></h5><button class="btn btn-outline-deep-purple btn-sm float-left waves-effect" type="button" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].auctionPrice + '">Bid Now</button><button class="btn btn-success btn-sm float-right" type="Rank" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart fa-lg"></span></button></div></div></div>');
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
	$("#ClosedA").click(function(){
		event.preventDefault();
	$.ajax({
					url:'http://api.pennyinc.co.ke/Auction/GetAuctions',
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
							    $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 "><div class="card mb-3 text-center hoverable wow rotateIn" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class="view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p> <a class="lead" data-toggle="collapse" href="#Description"' + i + ' aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description"' + i + '><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span>' + ResponsePC[key].expiryDate + '</strong></h5><button type="button" class="btn btn-success disabled float-left" onclick="ClosedAlert()">BID NOW</button></div></div></div>');
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
			if(sessionStorage.session || sessionStorage.type){
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
		
			lengthValidator(password);
			capitalValidator(password);
			lowercaseValidator(password);
			numberValidator(password);
			symbolValidator(password);
			
			
		if(password!=confirmPassword){
				alert('password does not much');
				$('#RCcpass').focus();
				return false;

		}
		
		$.ajax({
			url:"http://api.pennyinc.co.ke/oAuth2/GetToken",

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
					url:'http://api.pennyinc.co.ke/api/Account/ResetPassword',
					method:'POST',
					headers:{'Authorization':outletResponse.token_type +' '+ outletResponse.access_token},
					dataType:'json',
					data:{'email':email,'password':password,'confirmPassword':confirmPassword,'code':xc},
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						alert("Password changed successfully.You can now login.");
				
							window.location="http://gadgets.pennyinc.co.ke/";
					},
					error:function(error){
						console.stringify(JSON.stringify(error));
						alert("Failed!Please try again later.");
					}
				});
			}
		});
	});
});
}
else if(locate=="http://gadgets.pennyinc.co.ke/confirmEmail.html"){
		$(document).ready(function(){
			OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
			OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
			$("#CEmail").click(function(){
				event.preventDefault();
				
				$.ajax({
			url:"http://api.pennyinc.co.ke/oAuth2/GetToken",

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
					url:'http://api.pennyinc.co.ke/api/Account/ConfirmEmail',
					method:'GET',
					headers:{'Authorization':outletResponse.token_type +' '+ outletResponse.access_token},
					data:{'ud':ud,'xc':xc},
					success:function(ResponseBody){
						console.log(JSON.stringify(ResponseBody));
						alert("Email confirmed Successful");
						window.location="http://gadgets.pennyinc.co.ke";
					},
					error:function(error){
						console.log(JSON.stringify(error));
						alert("Failed. Try again later.");
					}
				});
			}
		});
			});
});
}
