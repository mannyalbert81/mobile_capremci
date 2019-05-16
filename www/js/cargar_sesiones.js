
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');




function checkConnection1() {
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	 
	   
	 
	    	 	load_sesiones(1);
	 
	 
	              $("#buscar").click(function() 
				  {
			    	var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
			    	var validaFecha = /([0-9]{4})\-([0-9]{2})\-([0-9]{2})/;

			    	var desde = $("#desde").val();
			    	var hasta = $("#hasta").val();
			    	
			    	
			    	


					if(desde > hasta){

						$("#mensaje_desde").text("Fecha desde no puede ser mayor a hasta");
			    		$("#mensaje_desde").fadeIn("slow"); //Muestra mensaje de error
			            return false;
			            
					}else 
			    	{
			    		$("#mensaje_desde").fadeOut("slow"); //Muestra mensaje de error
			    		 load_sesiones(1);
					} 


					if(hasta < desde){

						$("#mensaje_hasta").text("Fecha hasta no puede ser menor a desde");
			    		$("#mensaje_hasta").fadeIn("slow"); //Muestra mensaje de error
			            return false;
			            
					}else 
			    	{
			    		$("#mensaje_hasta").fadeOut("slow"); //Muestra mensaje de error
			    		 load_sesiones(1);
					} 
					
			    					    

				}); 


			        $( "#desde" ).focus(function() {
					  $("#mensaje_desde").fadeOut("slow");
				    });
					
			        $( "#hasta" ).focus(function() {
					  $("#mensaje_hasta").fadeOut("slow");
				    });
	 
	 
	    
	 
   }




function load_sesiones(pagina){
	var base_url = 'http://186.4.157.125:80/webcapremci/webservices/';
	var pag_service = 'CargarSesionesService.php?jsoncallback=?';
	
	
	var search=$("#search").val();
	   var desde=$("#desde").val();
	   var hasta=$("#hasta").val();
   
         $("#load_registrados").fadeIn('slow');
	
	       $.ajax({
	    	   beforeSend: function(objeto){
 	           $("#load_registrados").html('<center><img src="img/load.gif"> Cargando...</center>')
 	           },
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{cargar:'cargar_sesiones', action:'ajax', page:pagina, search:search, desde:desde, hasta:hasta},
			   dataType: 'json',
	    	        success: function(x){
	    	        	$("#sesiones_registrados").html(x);
      	               	 $("#tabla_sesiones").tablesorter(); 
      	                 $("#load_registrados").html("");
	                 },
	                error: function(jqXHR,estado,error){
	                	   $("#sesiones_registrados").html("Ocurrio un error al cargar la informacion de Sesiones..."+estado+"    "+error);
	           	    }
	              });
	     
	  		}