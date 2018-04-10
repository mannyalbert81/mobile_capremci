
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');




function checkConnection1() {
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	    
	    	 
	    	 load_refinanciamiento(1);
	    	 
	     
	 
   }




function load_refinanciamiento(pagina){
	var base_url = 'http://18.218.148.189:80/webservices/';
	var pag_service = 'CargarCreditosDetalleService.php?jsoncallback=?';
	var cedula = localStorage.getItem('cedula_usuarios');
	   var search=$("#search_credito_refinanciamiento").val();
       var con_datos={
    		      cargar:'cargar_credito_refinanciamiento',
				  action:'ajax',
				  page:pagina,
				  search:search,
				  cedula:cedula
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


