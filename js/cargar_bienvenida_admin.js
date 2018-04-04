
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
		 pone_users();
		 cargar_sesiones();
	     }else{
	    	 alert('Tu dispositivo no tiene internet.');
	    	 window.location.href = "index.html";
	    	 $("#cedula").val("");
		     $("#clave").val("");
	     }
     
   }


function pone_users(){
	var base_url = 'http://18.218.148.189:80/webservices/';
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
	var base_url = 'http://18.218.148.189:80/webservices/';
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