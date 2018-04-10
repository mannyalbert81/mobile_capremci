
$(document).on("ready",checkConnection1);



//var cedula = getQueryVariable("cedula");
var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');




function checkConnection1(){
      
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	
	 
	 
	
	 
	      load_acuerdo_pago(1);
	      
	    
	 
   }




function load_acuerdo_pago(pagina){
	var base_url = 'http://18.218.148.189:80/webservices/';
	var pag_service = 'CargarCreditosDetalleService.php?jsoncallback=?';
	var cedula = localStorage.getItem('cedula_usuarios');
	   var search=$("#search_acuerdo_pago").val();
       var con_datos={
    		      cargar:'cargar_acuerdo_pago',
				  action:'ajax',
				  page:pagina,
				  search:search,
				  cedula:cedula
				  };
  
       $("#load_acuerdo_pago_registrados").fadeIn('slow');
     $.ajax({
               beforeSend: function(objeto){
                 $("#load_acuerdo_pago_registrados").html('<center><img src="img/load.gif"> Cargando...</center>')
               },
               url: base_url+pag_service,
               type: 'GET',
               data: con_datos,
               dataType: 'json',
               success: function(x){
                 $("#cta_acuerdo_pago").html(x);
               	 $("#tabla_acuerdo_pago").tablesorter(); 
                 $("#load_acuerdo_pago_registrados").html("");
               },
              error: function(jqXHR,estado,error){
                $("#cta_acuerdo_pago").html("Ocurrio un error al cargar la información de Acuerdo de Pago..."+estado+"    "+error);
              }
            });


	   }


