
$(document).on("ready",onDeviceReady);

function onDeviceReady() 
{
	
	 $(document).on('click', '#enviar_email', function(){
		            var online;
			    	var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
			    	var validaFecha = /([0-9]{4})\-([0-9]{2})\-([0-9]{2})/;

			    	var nombre = $("#nombre").val();
			  		var correo = $("#correo").val();
			  		var asunto = $("#asunto").val();
			  		var mensaje = $("#mensaje").val();
			    	var error="FALSE";
			    	
			  		if (nombre == "")
			    	{
				    	
			    		$("#mensaje_nombre").text("Introduzca un Nombre");
			    		$("#mensaje_nombre").fadeIn("slow"); //Muestra mensaje de error
			    		error="TRUE";
			            return false;
				    }
			    	else 
			    	{
			    		$("#mensaje_nombre").fadeOut("slow"); //Muestra mensaje de error
			    		
					}
					
			  		if (correo == "")
			    	{
				    	
			    		$("#mensaje_correo").text("Introduzca un correo");
			    		$("#mensaje_correo").fadeIn("slow"); //Muestra mensaje de error
			            return false;
			            error="TRUE";
				    }
			    	else if (regex.test($('#correo').val().trim()))
			    	{
			    		$("#mensaje_correo").fadeOut("slow"); //Muestra mensaje de error
			    		
					}
			    	else 
			    	{
			    		$("#mensaje_correo").text("Introduzca un correo Valido");
			    		$("#mensaje_correo").fadeIn("slow"); //Muestra mensaje de error
			            return false;	
			            error="TRUE";
				    }
									    
			  		if (asunto == "")
			    	{
				    	
			    		$("#mensaje_asunto").text("Introduzca un Asunto");
			    		$("#mensaje_asunto").fadeIn("slow"); //Muestra mensaje de error
			            return false;
			            error="TRUE";
				    }
			    	else 
			    	{
			    		$("#mensaje_asunto").fadeOut("slow"); //Muestra mensaje de error
			    		
					}
					
			  		
			  		if (mensaje == "")
			    	{
				    	
			    		$("#mensaje_mensaje").text("Introduzca un Mensaje");
			    		$("#mensaje_mensaje").fadeIn("slow"); //Muestra mensaje de error
			            return false;
			            error="TRUE";
				    }
			    	else 
			    	{
			    		$("#mensaje_mensaje").fadeOut("slow"); //Muestra mensaje de error
			    		
					}
			  		
			  		
			  		if(error=="FALSE" ){
			  		
			  			checkConnection();
			  			
			  		}else{
			  			
			  			
			  		}
			  	
		});
	 
	 

	     $( "#nombre" ).focus(function() {
			  $("#mensaje_nombre").fadeOut("slow");
		    });
			
	     $( "#correo" ).focus(function() {
			  $("#mensaje_correo").fadeOut("slow");
		    });
	
	     $( "#asunto" ).focus(function() {
			 $("#mensaje_asunto").fadeOut("slow");
			});
			
	     $( "#mensaje" ).focus(function() {
			 $("#mensaje_mensaje").fadeOut("slow");
		  });
	
}


function checkConnection() {
       
	var online="";
	var networkState = navigator.network.connection.type;
    var states = {};
   
    states[Connection.UNKNOWN]  = '1';  //Conexión desconocida;
    states[Connection.ETHERNET] = '1';  //Conexión ethernet;
    states[Connection.WIFI]     = '1';  //Conexión WiFi';
    states[Connection.CELL_2G]  = '1';  //Conexión movil 2G';
    states[Connection.CELL_3G]  = '1';  //Conexión movil 3G';
    states[Connection.CELL_4G]  = '1';  //Conexión movil 4G';
    states[Connection.NONE]     = '0';  //Sin conexión';
      
    online=states[networkState];
   
     if (online=='1'){
    	
    	var nombre = $("#nombre").val();
  		var correo = $("#correo").val();
  		var asunto = $("#asunto").val();
  		var mensaje = $("#mensaje").val();
  		
 		var base_url = 'http://18.218.148.189:80/webservices/';
 		var pag_service = 'MailService.php';
 		
 		
 		$.ajax({
 			   type: 'POST',
 			   url: base_url+pag_service,
 			   data:{action:'enviar', nombres:nombre, email:correo, asuntos:asunto, mensajes:mensaje},
 			   dataType: 'json',
 			   success: function (x){
 				  
 				 $("#respuesta_servidor").html(x);
 				 $("#nombre").val("");
 			  	 $("#correo").val("");
 			  	 $("#asunto").val("");
 			  	 $("#mensaje").val("");
 			   },
 				error: function (jqXHR, textStatus, errorThrown) {
 				     alert("Consulte con los administradores del sistema.");
 			 }

 			});
 		
 		
    	 
     }else{
    	 
    	 alert('Tu dispositivo no tiene internet.');
    	 window.location.href = "index.html";
    	
	     $("#nombre").val("");
	  	 $("#correo").val("");
	  	 $("#asunto").val("");
	  	 $("#mensaje").val("");
	     
     }
     
    }






