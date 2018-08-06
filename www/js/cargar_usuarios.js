
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');



function checkConnection1() {
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	 
		
	 
	    	 	load_usuarios(1);
	    
	 
   }



function load_usuarios(pagina){
	var base_url = 'http://186.4.157.125:4000/webcapremci/webservices/';
	var pag_service = 'CargarUsuariosService.php?jsoncallback=?';
	
	
	var search=$("#search").val();
   
         $("#load_registrados").fadeIn('slow');
	
	       $.ajax({
	    	   beforeSend: function(objeto){
 	           $("#load_registrados").html('<center><img src="img/load.gif"> Cargando...</center>')
 	           },
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{cargar:'cargar_usuarios', action:'ajax', page:pagina, search:search},
			   dataType: 'json',
	    	        success: function(x){
	    	        	$("#users_registrados").html(x);
      	               	 $("#tabla_usuarios").tablesorter(); 
      	                 $("#load_registrados").html("");
	                 },
	                error: function(jqXHR,estado,error){
	                	   $("#users_registrados").html("Ocurrio un error al cargar la informacion de Usuarios..."+estado+"    "+error);
	           	    }
	              });
	     
	  		}