
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
	    	 
	      load_refinanciamiento(1);
	    
	     }else{
	    	 alert('Tu dispositivo no tiene internet.');
	    	 window.location.href = "index.html";
	    	 $("#cedula").val("");
		     $("#clave").val("");
	     }
   }




function load_refinanciamiento(pagina){
	var base_url = 'http://18.218.148.189:80/webservices/';
	var pag_service = 'CargarCreditosDetalleService.php?jsoncallback=?';
	var cedula_participe = getQueryVariable("cedula_participe");
	   var search=$("#search_credito_refinanciamiento").val();
       var con_datos={
    		      cargar:'cargar_credito_refinanciamiento',
				  action:'ajax',
				  page:pagina,
				  search:search,
				  cedula:cedula_participe
				  };
  
       $("#load_credito_refinanciamiento_registrados").fadeIn('slow');
     $.ajax({
               beforeSend: function(objeto){
                 $("#load_credito_refinanciamiento_registrados").html('<center><img src="img/load.gif"> Cargando...</center>')
               },
               url: base_url+pag_service,
               type: 'GET',
               data: con_datos,
               dataType: 'json',
               success: function(x){
                 $("#cta_credito_refinanciamiento").html(x);
               	 $("#tabla_credito_refinanciamiento").tablesorter(); 
                 $("#load_credito_refinanciamiento_registrados").html("");
               },
              error: function(jqXHR,estado,error){
                $("#cta_credito_refinanciamiento").html("Ocurrio un error al cargar la información de Crédito Refinanciamiento..."+estado+"    "+error);
              }
            });


	   }


