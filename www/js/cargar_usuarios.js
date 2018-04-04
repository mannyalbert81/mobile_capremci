
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');


var online;

function checkConnection1() {
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	 
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
	 
	    	 	load_usuarios(1);
	     }else{
	    	 alert('Tu dispositivo no tiene internet.');
	    	 window.location.href = "index.html";
	    	 $("#cedula").val("");
		     $("#clave").val("");
	     }
	 
   }



function load_usuarios(pagina){
	var base_url = 'http://18.218.148.189:80/webservices/';
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