
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');




function checkConnection1() {
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	  
	    	 load_cta_individual(1);
	    
	 
   }




function load_cta_individual(pagina){
	var base_url = 'http://186.4.157.125:80/webcapremci/webservices/';
	var pag_service = 'CargarCreditosDetalleService.php?jsoncallback=?';
	var cedula = localStorage.getItem('cedula_usuarios');
	   var search=$("#search").val();
       var con_datos={
    		      cargar:'cargar_cta_individual',
				  action:'ajax',
				  page:pagina,
				  search:search,
				  cedula:cedula
				  };
  
       $("#load_cta_individual_registrados").fadeIn('slow');
     $.ajax({
               beforeSend: function(objeto){
                 $("#load_cta_individual_registrados").html('<center><img src="img/load.gif"> Cargando...</center>')
               },
               url: base_url+pag_service,
               type: 'GET',
               data: con_datos,
               dataType: 'json',
               success: function(x){
                 $("#cta_registrados").html(x);
               	 $("#tabla_cta_individual").tablesorter(); 
                 $("#load_cta_individual_registrados").html("");
               },
              error: function(jqXHR,estado,error){
                $("#cta_registrados").html("Ocurrio un error al cargar la información de Cuenta Individual..."+estado+"    "+error);
              }
            });


	   }


