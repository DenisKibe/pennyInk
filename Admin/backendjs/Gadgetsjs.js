
	$(document).ready(function(){

		if ((sessionStorage.getItem('Osession') === null || sessionStorage.getItem('Osession')=="undefined")) {

            window.location = "/Admin";
        }
	var pid;
	var pname;
	var BtnId;
	
	
	$.ajaxSetup({
        headers:{
            'Authorization':sessionStorage.Otype+' '+sessionStorage.Osession
        }
    });
	

	    //for the Live Auctions
    
        $.ajax({
            url: 'https://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=ACTIVE&category=edf78def-783b-459f-83dd-013f10c1e79f',
            method: 'Get',
            dataType: 'json',
            data: 'state' + '=' + 'ACTIVE'+'&'+'category'+'='+'edf78def-783b-459f-83dd-013f10c1e79f',
            success: function (ResponseBody) {
                console.log(JSON.stringify(ResponseBody));
                $("#content").empty();
                ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
                var i = 0;
                for (var key in ResponsePC) {

                    if (ResponsePC.hasOwnProperty(key)) {
                        i++;
                        $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 "><div class="card mb-3 text-center hoverable wow rotateIn" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class="view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p> <a class="lead" data-toggle="collapse" href="#Description' + i + '" aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' + i + '" ><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span>' + ResponsePC[key].expiryDate + '</strong></h5><button type="Rank" class="btn btn-primary float-right" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart"></span></button><button type="button" class="btn btn-outline-primary btn-md float-left" data-toggle="modal" data-target="#EdModal" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].imageUrl + '">Edit Auction</button></div></div></div>');
                    }
                }
                
            },
            error: function (error) {
                console.log(JSON.stringify(error));
                
            }
        });
    
    
	//for the create Auctions
    $('#actionC').click(function(){
        event.preventDefault();
        $('#actionC').addClass('disabled');
        $('#actionC').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        var name=$('#Pname').val();
        var description=$('#ProductD').val();
        var retailPrice=$('#retailP').val();
        var expiryDate=$('#Exdate').val()+' '+$('#Extime').val();
		var image = $("#imgU")[0].files[0];
		var category=pid;
		var form_data = new FormData();
		form_data.append("image",image);
		form_data.append("name",name);
		form_data.append("description",description);
		form_data.append("retailPrice",retailPrice);
		form_data.append("state","");
		form_data.append("productCategoryId",'edf78def-783b-459f-83dd-013f10c1e79f');
		form_data.append("productCategory",pname);
		form_data.append("imageUrl","");
		form_data.append("expiryDate",expiryDate);
    
 
		$.ajax({
			url:'https://pennycoreapi.azurewebsites.net/Auction/Create',
			type:'post',
			data:form_data,
			cache:false,
			//dataType:'script',
            contentType: false,
			processData:false,
			//enctype:'multipart/form-data',
			success:function(ResponseBody){
			    console.log(JSON.stringify(ResponseBody));
			    $('#actionC').removeClass('disabled');
			    $('#actionC').html('Create Auction');
			    $('#successMSG').html("success!Auction created.");
			    $('#SuccessM').modal('show');
			},
			error:function(error){
			    console.log(JSON.stringify(error));
			    $('#actionC').removeClass('disabled');
			    $('#actionC').html('Create Auction');
			    $('#errorMSG').html("Failed.Please try again later");
			    $('#ErrorM').modal('show');
			}
        
		});
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
		
		
		//for the Auction id of the click button to view bidRanks for users
		jQuery(document).delegate("#content button[type='Rank']","click",
		function(event){
			BtnId=$(this).attr('id');
			
			//for geting the bid ranks for live Auctions
			event.preventDefault();
			$.ajax({
				url:'https://pennycoreapi.azurewebsites.net/Auction/GetBidderRanking',
				method:'GET',
				dataType:'json',
				data:'auctionId'+'='+BtnId,
				success:function(ResponseBody){
					console.log(JSON.stringify(ResponseBody));
					$("#bidRank").empty();
					for (var key in ResponseBody) {
							if (ResponseBody.hasOwnProperty(key)) {
								$("#bidRank").append('<div class="row"><div class="col-4 col-sm-4 col-md-4 col-lg-4"><b>'+ResponseBody[key].userName+'</b></div><div class="col-8 col-sm-8 col-md-8 col-lg-8"><div class="progress"><div class="progress-bar bg-success progress-bar-striped progress-bar-animated" style="width:'+ResponseBody[key].totalBids+';">'+ResponseBody[key].totalBids+'Denari</div></div></div></div>');
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
		
		
		//for the navigation link to get Live Auctions
		$("#LiveA").click(function(event){
			event.preventDefault();
			$.ajax({
					url:'https://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=ACTIVE&category=edf78def-783b-459f-83dd-013f10c1e79f',
					method:'Get',
					dataType:'json',
					data: 'state' + '=' + 'ACTIVE' + '&' + 'category' + '=' +'edf78def-783b-459f-83dd-013f10c1e79f',
					success:function(ResponseBody){
					    console.log(JSON.stringify(ResponseBody));
					    $("#content").empty();
						ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
						var i = 0;
						for (var key in ResponsePC) {
						    
							if (ResponsePC.hasOwnProperty(key)) {
							    i++;
							    $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 "><div class="card mb-3 text-center hoverable wow rotateIn" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class="view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p> <a class="lead" data-toggle="collapse" href="#Description' + i + '" aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' + i + '" ><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span>' + ResponsePC[key].expiryDate + '</strong></h5><button type="Rank" class="btn btn-primary float-right" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart"></span></button><button type="button" class="btn btn-outline-primary btn-md float-left" data-toggle="modal" data-target="#EdModal" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].imageUrl + '">Edit Auction</button></div></div></div>');
							}
						}
						$('#successMSG').html("Live Auctions");
						$('#SuccessM').modal('show');
					},
					error:function(error){
					    console.log(JSON.stringify(error));
					    $('#errorMSG').html("An Error occured, Please try again later.");
					    $('#ErrorM').modal('show');
					}
			});
		});
		
		//for the navigation link to get Closed Auctions
		$("#ClosedA").click(function(event){
			event.preventDefault()
		$.ajax({
					url:'https://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=CLOSED&category=edf78def-783b-459f-83dd-013f10c1e79f',
					method:'Get',
					dataType:'json',
					data: 'state' + '=' + 'CLOSED' + '&' + 'category' + '=' +'edf78def-783b-459f-83dd-013f10c1e79f',
					success:function(ResponseBody){
					    console.log(JSON.stringify(ResponseBody));
					    $("#content").empty();
						ResponsePC = JSON.parse(JSON.stringify(ResponseBody));
						var i = 0;
						for (var key in ResponsePC) {
						    
							if (ResponsePC.hasOwnProperty(key)) {
							    i++;
							    $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 "><div class="card mb-3 text-center hoverable wow rotateIn" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class="view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p> <a class="lead" data-toggle="collapse" href="#Description' +i+ '"  aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' +i+ '" ><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span>' + ResponsePC[key].expiryDate + '</strong></h5><button type="Rank" class="btn btn-primary btn-md float-right" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart"></span></button><button type="button" class="btn btn-outline-primary btn-md float-left" data-toggle="modal" data-target="#EdModal" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].imageUrl + '">Edit Auction</button></div></div></div>');
							}
						}
						$('#successMSG').html("Closed Auctions");
						$('#SuccessM').modal('show');
					},
					error:function(error){
					    console.log(JSON.stringify(error));
					    $('#errorMSG').html("An Error occured, Please try again later.");
					    $('#ErrorM').modal('show');
					}
		});
		});
		
		//To get the image url and id of the product to edit
		var ImgUrl;
		jQuery(document).delegate("#content button[type='button']","click",
		function(event){
			BtnId=$(this).attr('id');
			ImgUrl=$(this).attr('name');
		});
		//for the edit Auction
		$("#EditA").click(function(){
			event.preventDefault();
			var name=$('#PName').val();
			var description=$('#ProductD').val();
			var retailPrice=$('#retailP').val();
			var state=$('#state').val();
			var expiryDate=$('#Exdate').val()+' '+$('#Extime').val();
			
			$.ajax({
				url:'https://pennycoreapi.azurewebsites.net/Auction/Edit',
				method:'Put',
				dataType:'json',
				data:{'id':BtnId,'name':name,'description':description,'retailPrice':retailPrice,'imageUrl':ImgUrl,'productCategoryId':pid,'state':state,'expiryDate':expiryDate},
				success:function(ResponseBody){
				    console.log(JSON.stringify(ResponseBody));
				    $('#successMSG').html("Product has been Edited successfully");
				    $('#SuccessM').modal('show');
				},
				error:function(error){
				    console.log(JSON.stringify(error));
				    $('#errorMSG').html("Failed!Please try again later.");
				    $('#ErrorM').modal('show');
				},
				complete:function(){
				    $('#EdModal').modal('hide');
					//to update the page
					$.ajax({
					    url:'https://pennycoreapi.azurewebsites.net/Auction/GetAuctions?state=CLOSED&category=edf78def-783b-459f-83dd-013f10c1e79f',
					method:'Get',
					dataType:'json',
					data: 'state' + '=' + 'CLOSED' + '&' + 'category' + '=' + 'edf78def-783b-459f-83dd-013f10c1e79f',
					success: function (ResponseBody) {

					    console.log(JSON.stringify(ResponseBody));
					    $("#content").empty();
						ResponsePC=JSON.parse(JSON.stringify(ResponseBody));
						var i = 0;
						for (var key in ResponsePC) {
							i++;
							if (ResponsePC.hasOwnProperty(key)) {
							    $("#content").append('<div class="col-lg-4 col-md-6 col-sm-6 c0l-12 mb-lg-0 mb-4 "><div class="card mb-3 text-center hoverable wow rotateIn" data-wow-delay="1.0"><div class="view view-cascade overlay"><!--featured image--><div class="view overlay"><img src="' + ResponsePC[key].imageUrl + '" class="img-fluid" alt="' + ResponsePC[key].name + '" /><a><div class="mask rgba-white-slight"></div></a></div></div><!--Excerpt--><div class="card-body"><h4 class="mb-4"><strong>' + ResponsePC[key].name + '</strong></h4><p> <a class="lead" data-toggle="collapse" href="#Description' + i + '"  aria-expanded="false" aria-controls="Description">Description <span class="fa fa-angle-down"></span></a><!--collapse element--><div class="collapse" id="Description' + i + '" ><div class="mt-3 mb-2">' + ResponsePC[key].description + '</div></div></p><p class="lead "><span class="mr-2"><del>KSh ' + ResponsePC[key].retailPrice + '</del></span><span class="font-weight-bold text-info">' + ResponsePC[key].auctionPrice + '</span> Denaris</p><h5 class="font-weight-bold text-center text-default"><strong><span class="fa fa-clock-o"></span>' + ResponsePC[key].expiryDate + '</strong></h5><button type="Rank" class="btn btn-primary btn-md float-right" data-toggle="modal" id="' + ResponsePC[key].id + '"><span class="fa fa-bar-chart"></span></button><button type="button" class="btn btn-outline-primary btn-md float-left" data-toggle="modal" data-target="#EdModal" id="' + ResponsePC[key].id + '" name="' + ResponsePC[key].imageUrl + '">Edit Auction</button></div></div></div>');
							}
						}
						$('#successMSG').html("Closed Auctions");
						$('#SuccessM').modal('show');
					},
					error:function(error){
					    console.log(JSON.stringify(error));
					    $('#errorMSG').html("An error occurred. Please try again later!");
					    $('#ErrorM').modal('show');
					}
					});
				}
			});
		});
	});

