
$(document).on("ready",checkConnection1);

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
       
      
}

var cedula_participe = getQueryVariable("cedula_participe");
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
	
			pone_cta_individual(cedula_participe);
			pone_cta_desembolsar(cedula_participe);
			pone_credito_ordinario(cedula_participe);
			pone_credito_emergente(cedula_participe);
			pone_credito_2x1(cedula_participe);
			pone_credito_hipotecario(cedula_participe);
			pone_acuerdo_pago(cedula_participe);
			pone_credito_refinanciamiento(cedula_participe);
			
	     }else{
	    	 alert('Tu dispositivo no tiene internet.');
	    	 window.location.href = "index.html";
	    	 $("#cedula").val("");
		     $("#clave").val("");
	     }
     
    }



function pone_cta_individual(cedula){
	var base_url = 'http://18.218.148.189:80/webservices/';
	var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
	
	       $.ajax({
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{action:'consulta', cargar:'cargar_cta_individual', cedula:cedula},
			   dataType: 'json',
	    	        success: function(x){
	                   $("#pone_cta_individual").html(x);
	                 },
	                error: function(jqXHR,estado,error){
	                  $("#pone_cta_individual").html("Ocurrio un error al cargar la informacion de cuenta individual..."+estado+"    "+error);
	                }
	              });
	     
	  		}




function pone_cta_desembolsar(cedula){
	var base_url = 'http://18.218.148.189:80/webservices/';
	var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
	
	       $.ajax({
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{action:'consulta', cargar:'cargar_cta_desembolsar', cedula:cedula},
			   dataType: 'json',
	    	        success: function(x){
	                   $("#pone_cta_desembolsar").html(x);
	                 },
	                error: function(jqXHR,estado,error){
	                  $("#pone_cta_desembolsar").html("Ocurrio un error al cargar la informacion de cuenta desembolsar..."+estado+"    "+error);
	                }
	              });
	     
	  }



function pone_credito_ordinario(cedula){
	var base_url = 'http://18.218.148.189:80/webservices/';
	var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
	
	       $.ajax({
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{action:'consulta', cargar:'cargar_credito_ordinario', cedula:cedula},
			   dataType: 'json',
	    	        success: function(x){
	                   $("#pone_credito_ordinario").html(x);
	                 },
	                error: function(jqXHR,estado,error){
	                $("#pone_credito_ordinario").html("Ocurrio un error al cargar la informacion de crédito ordinario..."+estado+"    "+error);
  		              }
	              });
	     
	  }


 function pone_credito_emergente(cedula){
	var base_url = 'http://18.218.148.189:80/webservices/';
	var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
	
	       $.ajax({
	    	   type: 'POST',
			   url: base_url+pag_service,
			   data:{action:'consulta', cargar:'cargar_credito_emergente', cedula:cedula},
			   dataType: 'json',
	    	        success: function(x){
	                   $("#pone_credito_emergente").html(x);
	                 },
	                error: function(jqXHR,estado,error){
	                $("#pone_credito_emergente").html("Ocurrio un error al cargar la informacion de crédito emergente..."+estado+"    "+error);
  		              }
	              });
	     
	  }

 
 
 function pone_credito_2x1(cedula){
		var base_url = 'http://18.218.148.189:80/webservices/';
		var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
		
		       $.ajax({
		    	   type: 'POST',
				   url: base_url+pag_service,
				   data:{action:'consulta', cargar:'cargar_credito_2x1', cedula:cedula},
				   dataType: 'json',
		    	        success: function(x){
		                   $("#pone_credito_2x1").html(x);
		                 },
		                error: function(jqXHR,estado,error){
		                $("#pone_credito_2x1").html("Ocurrio un error al cargar la informacion de crédito 2 x 1..."+estado+"    "+error);
	  		              }
		              });
		     
		  }

 function pone_credito_hipotecario(cedula){
		var base_url = 'http://18.218.148.189:80/webservices/';
		var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
		
		       $.ajax({
		    	   type: 'POST',
				   url: base_url+pag_service,
				   data:{action:'consulta', cargar:'cargar_credito_hipotecario', cedula:cedula},
				   dataType: 'json',
		    	        success: function(x){
		                   $("#pone_credito_hipotecario").html(x);
		                 },
		                error: function(jqXHR,estado,error){
		                $("#pone_credito_hipotecario").html("Ocurrio un error al cargar la informacion de crédito hipotecario..."+estado+"    "+error);
	  		              }
		              });
		     
		  }


 
 
 function pone_acuerdo_pago(cedula){
		var base_url = 'http://18.218.148.189:80/webservices/';
		var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
		
		       $.ajax({
		    	   type: 'POST',
				   url: base_url+pag_service,
				   data:{action:'consulta', cargar:'cargar_acuerdo_pago', cedula:cedula},
				   dataType: 'json',
		    	        success: function(x){
		                   $("#pone_acuerdo_pago").html(x);
		                 },
		                error: function(jqXHR,estado,error){
		                $("#pone_acuerdo_pago").html("Ocurrio un error al cargar la informacion de acuerdo pago..."+estado+"    "+error);
	  		              }
		              });
		     
		  }

 
 
 
 function pone_credito_refinanciamiento(cedula){
		var base_url = 'http://18.218.148.189:80/webservices/';
		var pag_service = 'CargarConsultaAdminService.php?jsoncallback=?' ;
		
		       $.ajax({
		    	   type: 'POST',
				   url: base_url+pag_service,
				   data:{action:'consulta', cargar:'cargar_credito_refinanciamiento', cedula:cedula},
				   dataType: 'json',
		    	        success: function(x){
		                   $("#pone_credito_refinanciamiento").html(x);
		                 },
		                error: function(jqXHR,estado,error){
		                $("#pone_credito_refinanciamiento").html("Ocurrio un error al cargar la informacion de crédito refinanciamiento..."+estado+"    "+error);
	  		              }
		              });
		     
		  }