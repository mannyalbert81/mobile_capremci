
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




function checkConnection1() {
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	   
	  
	    	 load_cta_desembolsar(1);
	    
   }




function load_cta_desembolsar(pagina){
	var base_url = 'http://186.4.157.125:4000/webcapremci/webservices/';
	var pag_service = 'CargarCreditosDetalleService.php?jsoncallback=?';
	var cedula_participe = getQueryVariable("cedula_participe");
	   var search=$("#search_desembolsar").val();
       var con_datos={
    		      cargar:'cargar_cta_desembolsar',
				  action:'ajax',
				  page:pagina,
				  search:search,
				  cedula:cedula_participe
				  };
  
       $("#load_cta_desembolsar_registrados").fadeIn('slow');
     $.ajax({
               beforeSend: function(objeto){
                 $("#load_cta_desembolsar_registrados").html('<center><img src="img/load.gif"> Cargando...</center>')
               },
               url: base_url+pag_service,
               type: 'GET',
               data: con_datos,
               dataType: 'json',
               success: function(x){
                 $("#cta_desembolsar_registrados").html(x);
               	 $("#tabla_cta_desembolsar").tablesorter(); 
                 $("#load_cta_desembolsar_registrados").html("");
               },
              error: function(jqXHR,estado,error){
                $("#cta_desembolsar_registrados").html("Ocurrio un error al cargar la información de Cuenta Desembolsar..."+estado+"    "+error);
              }
            });


	   }


