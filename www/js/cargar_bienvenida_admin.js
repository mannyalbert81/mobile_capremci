
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');



function checkConnection1() {
        
	
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	 
	 
		 pone_users();
		 cargar_sesiones();
	    
     
   }


function pone_users(){
	var base_url = 'http://186.4.157.125:80/webcapremci/webservices/';
	var pag_service = 'CargarBienvenidaAdminService.php?jsoncallback=?' ;
	
	       $.ajax({
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{action:'consulta', cargar:'cargar_usuarios'},
			   dataType: 'json',
	    	        success: function(x){
	                   $("#pone_users").html(x);
	                 },
	                error: function(jqXHR,estado,error){
	                  $("#pone_users").html("Ocurrio un error al cargar la información de usuarios..."+estado+"    "+error);
	                }
	              });
	     
	  		}




function cargar_sesiones(){
	var base_url = 'http://186.4.157.125:80/webcapremci/webservices/';
	var pag_service = 'CargarBienvenidaAdminService.php?jsoncallback=?' ;
	
	       $.ajax({
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{action:'consulta', cargar:'cargar_sesiones'},
			   dataType: 'json',
	    	        success: function(x){
	                   $("#pone_sesiones").html(x);
	                 },
	                error: function(jqXHR,estado,error){
	                  $("#pone_sesiones").html("Ocurrio un error al cargar la información de sesiones..."+estado+"    "+error);
	                }
	              });
	     
	  		}

