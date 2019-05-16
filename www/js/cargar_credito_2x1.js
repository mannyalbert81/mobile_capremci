
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');




function checkConnection1() {
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	    
	
	      load_credito_2x1(1);
	      
	     
	 
   }




function load_credito_2x1(pagina){
	var base_url = 'http://186.4.157.125:80/webcapremci/webservices/';
	var pag_service = 'CargarCreditosDetalleService.php?jsoncallback=?';
	var cedula = localStorage.getItem('cedula_usuarios');
	   var search=$("#search_credito_2x1").val();
       var con_datos={
    		      cargar:'cargar_credito_2x1',
				  action:'ajax',
				  page:pagina,
				  search:search,
				  cedula:cedula
				  };
  
       $("#load_credito_2x1_registrados").fadeIn('slow');
     $.ajax({
               beforeSend: function(objeto){
                 $("#load_credito_2x1_registrados").html('<center><img src="img/load.gif"> Cargando...</center>')
               },
               url: base_url+pag_service,
               type: 'GET',
               data: con_datos,
               dataType: 'json',
               success: function(x){
                 $("#cta_credito_2x1").html(x);
               	 $("#tabla_credito_2x1").tablesorter(); 
                 $("#load_credito_2x1_registrados").html("");
               },
              error: function(jqXHR,estado,error){
                $("#cta_credito_2x1").html("Ocurrio un error al cargar la información de Crédito 2 x 1..."+estado+"    "+error);
              }
            });


	   }


