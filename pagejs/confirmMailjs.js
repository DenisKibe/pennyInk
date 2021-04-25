var locate;
var ud;
var xc;
locate=window.location.href;
sessionStorage.OPassEn="9a8b7c6d5e";var OutAuthP;sessionStorage.OName="U2FsdGVkX1/mOpstMQvax8KGHq1mRI2cQImKFsoWiZg=";var OutAuthN;sessionStorage.OPass="U2FsdGVkX19sqkGQ+ygRohHIbzxGq03NfiWCxp6sCf4=";sessionStorage.ONameEn="1z2y3x4w5v";

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
      console.log(OutAuthN);
			OutAuthP=CryptoJS.AES.decrypt(sessionStorage.OPass,sessionStorage.OPassEn).toString(CryptoJS.enc.Utf8);
      console.log(OutAuthP);
			$("#CEmail").click(function () {
				event.preventDefault();


				$('#CEmail').addClass('disabled');
				$('#CEmail').html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
				$.ajax({
					url:"http://127.0.0.1:5000/api/auth/getToken",

					method:'POST',
					dataType:'json',
					headers:{
						'Content-Type':'application/json'
					},
					data:JSON.stringify({'email':OutAuthN,'password':OutAuthP}),
					success:function(ResponseBody){

						outletResponse =JSON.parse(JSON.stringify(ResponseBody));
						console.log(JSON.stringify(ResponseBody));
					},
					error:function(error){
						console.log(JSON.stringify(error));
					},
					complete:function(){

						$.ajax({
							url:'http://127.0.0.1:5000/api/verifyEmail?ud='+ud+'&xc='+xc,
							method:'GET',
							headers:{
                'Content-Type':'application/json',
                'Authorization':outletResponse.token_type +' '+ outletResponse.access_token
              },
							processData:false,
							success:function(ResponseBody){
								console.log(JSON.stringify(ResponseBody));
								alert("Email confirmed Successful");
								window.location="/";
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
