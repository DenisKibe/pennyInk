var locate;
var ud;
var xc;
locate=window.location.href;
sessionStorage.OPassEn="9a8b7c6d5e";var OutAuthP;sessionStorage.OName="U2FsdGVkX19db19/l9WrPhELJLZW74bbvw0dZC3ilW1RG4fISbLIAgo3nllBAVcQ";var OutAuthN;sessionStorage.OPass="U2FsdGVkX1+tg2/0WmWeVXDcQbAHi/p3PcTpVoEJaUk=";sessionStorage.ONameEn="1z2y3x4w5v";


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
        var outletResponse;
			OutAuthN=CryptoJS.AES.decrypt(sessionStorage.OName,sessionStorage.ONameEn).toString(CryptoJS.enc.Utf8);
			OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
			$("#CEmail").click(function () {
				event.preventDefault();
				
				
				$('#CEmail').addClass('disabled');
				$('#CEmail').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
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
						console.log(JSON.stringify(ResponseBody));
					},
					error:function(error){
						console.log(JSON.stringify(error));
					},
					complete:function(){
				
						$.ajax({
							url:'https://pennycoreapi.azurewebsites.net/api/Account/ConfirmEmail?ud='+ud+'&xc='+xc,
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