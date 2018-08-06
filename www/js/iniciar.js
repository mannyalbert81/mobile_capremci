$(document).on("ready",onDeviceReady);

document.addEventListener("deviceready", onDeviceReady, false);
//var db = window.openDatabase("capremci.db", "1.0", "MY DB", 10000); //crea o abre la base


function onDeviceReady() 
{
	iniciar_banner();
	
}

var online;


function checkConnection() {
        
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
    	   
    	 
    	    var cedula = $("#cedula").val();
    		var clave = $("#clave").val();
    		var id_usuarios = "";
    		var cedula_usuarios = "";
    		var nombre_usuarios = "";
    		var correo_usuarios = "";
    		var id_estado = "";
    		
    		var base_url = 'http://186.4.157.125:4000/webcapremci/webservices/';
    		var pag_service = 'LoginService.php' ;
    	 
    		
    		
    		$.ajax({
    			   type: 'POST',
    			   url: base_url+pag_service,
    			   data:{action:'consulta', cedula_usuarios:cedula, clave_usuarios:clave},
    			   dataType: 'json',
    			   success: function (x) {
    				 		
    						$.each(x, function(i, j) {			
    							id_usuarios = j.id_usuarios;
    							cedula_usuarios  =  j.cedula_usuarios;
    							nombre_usuarios  =  j.nombre_usuarios;
    							correo_usuarios  =  j.correo_usuarios;
    							id_estado        =   j.id_estado;
    							id_rol           =   j.id_rol;
    							fotografia_usuarios   =   j.fotografia_usuarios;
    							
    						});
						 
    						  window.localStorage.setItem("cedula_usuarios", cedula_usuarios);
    					      window.localStorage.setItem("nombre_usuarios", nombre_usuarios);
    					      window.localStorage.setItem("correo_usuarios", correo_usuarios);
    					      window.localStorage.setItem("id_estado", id_estado);
    					      window.localStorage.setItem("id_rol", id_rol);
    					      window.localStorage.setItem("fotografia_usuarios", fotografia_usuarios);
    					
    					      
    					if(id_estado==1 || id_estado==2){
    						
    						if(id_rol==1 || id_rol==42){
    							
    							window.location.href = "BienvenidaAdmin.html";
    							
    						}else{
    							
    							//window.location.href = "Bienvenida.html?cedula="+cedula_usuarios+"";
    							window.location.href = "Bienvenida.html";
    						}
    						
    						
    						
    					}else{
    						
    						alert("Hola " + nombre_usuarios + " tu usuario se encuentra inactivo.");
    						$("#cedula").val("");
    				    	$("#clave").val("");
    				    	
    					}
    				   
    				  
    				   } ,
    				error: function (jqXHR, textStatus, errorThrown) {
    				     alert("Usuario no existe.");
    				     $("#cedula").val("");
 				    	$("#clave").val("");
    			 }

    			});
    		
    		
    	 
     }else{
    	 
    	 alert('Tu dispositivo no tiene internet.');
    	 window.location.href = "index.html";
    	 $("#cedula").val("");
	    	$("#clave").val("");
     }
     
    }






function iniciar_banner() {
    
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
    	  
    		var base_url = 'http://186.4.157.125:4000/webcapremci/webservices/';
    		var pag_service = 'LoginService.php' ;
    		
    		
    		$.ajax({
    			   type: 'POST',
    			   url: base_url+pag_service,
    			   data:{action:'banner'},
    			   dataType: 'json',
    			   success: function (x) {
    				 		
    				   $("#banner").html(x);
    				  
    				   
    					
    				   } ,
    				error: function (jqXHR, textStatus, errorThrown) {
    				     alert("Consulte con los administradores del sistema.");
    			 }

    			});
    		
    		
    		
    		 $(document).on('click', '#btn_iniciar', function(){
     			
    			 var cedula = $("#cedula").val();
    	    	 var clave = $("#clave").val();
    	    	 var error="";

    	    	   if (cedula == "")
			    	{
				    	
			    		$("#mensaje_cedula").text("Introduzca Cedula");
			    		$("#mensaje_cedula").fadeIn("slow"); //Muestra mensaje de error
			    		error="SI";
			            return false;
				    }
			    	else 
			    	{
			    		$("#mensaje_cedula").fadeOut("slow"); //Muestra mensaje de error
			    		error="NO";
					}
    	    	   
    	    	   
    	    	   if (clave == "")
			    	{
				    	
			    		$("#mensaje_clave").text("Introduzca Clave");
			    		$("#mensaje_clave").fadeIn("slow"); //Muestra mensaje de error
			    		error="SI";
			            return false;
				    }
			    	else 
			    	{
			    		$("#mensaje_clave").fadeOut("slow"); //Muestra mensaje de error
			    		error="NO";
					}
    	    	 
    	    	   
    	    	   if(error=="NO"){
			  			
    	    		   checkConnection();
			  		}
     
    	    	   
     		});
    		 
    		 
    		 $( "#cedula" ).focus(function() {
    			  $("#mensaje_cedula").fadeOut("slow");
    		    });
    			
    	     $( "#clave" ).focus(function() {
    			  $("#mensaje_clave").fadeOut("slow");
    		    });

    		
    	 
     }else{
    	 
    	      
    	       
    	       
    	       
    	       
    	       
    	       $(document).on('click', '#btn_iniciar', function(){
        			
      			 var cedula = $("#cedula").val();
      	    	 var clave = $("#clave").val();
      	    	 var error="";

      	    	   if (cedula == "")
  			    	{
  				    	
  			    		$("#mensaje_cedula").text("Introduzca Cedula");
  			    		$("#mensaje_cedula").fadeIn("slow"); //Muestra mensaje de error
  			    		error="SI";
  			            return false;
  				    }
  			    	else 
  			    	{
  			    		$("#mensaje_cedula").fadeOut("slow"); //Muestra mensaje de error
  			    		error="NO";
  					}
      	    	   
      	    	   
      	    	   if (clave == "")
  			    	{
  				    	
  			    		$("#mensaje_clave").text("Introduzca Clave");
  			    		$("#mensaje_clave").fadeIn("slow"); //Muestra mensaje de error
  			    		error="SI";
  			            return false;
  				    }
  			    	else 
  			    	{
  			    		$("#mensaje_clave").fadeOut("slow"); //Muestra mensaje de error
  			    		error="NO";
  					}
      	    	 
      	    	   
      	    	   if(error=="NO"){
  			  			
      	    		 alert('Tu dispositivo no tiene internet.');
      	      	    $("#cedula").val("");
      	  	    	$("#clave").val("");
  			  		}
       
      	    	   
       		});
      		 
      		 
      		 $( "#cedula" ).focus(function() {
      			  $("#mensaje_cedula").fadeOut("slow");
      		    });
      			
      	     $( "#clave" ).focus(function() {
      			  $("#mensaje_clave").fadeOut("slow");
      		    });

    	 
     	}
     
    }







