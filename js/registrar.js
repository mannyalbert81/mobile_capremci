$(document).on("ready",init_pag);

function ini()
{
	
}

document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("vade.db", "1.0", "MY DB", 200000); //crea o abre la base

function onDeviceReady() 
{
	db.transaction(init_pag, errorCB, successCB);
}

var online;
function init_pag()
{
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

		if(online=='1'){
			
			 traeFichas();
 			 traeImagenEspecies();
 			 
			$(document).on('click', '#btn-scanner', function(){
				 scan();
			});
		}else{
			
			alert("Debes tener internet en tu celular para registralo en nuestro sistema.");
		}
	
}


function errorCB(err) {
    console.log('error encontrado');
}

function successCB (){
	
}

function scan()
{
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {
                	var value = result.text;
				 
                	if(value!="")
                	{
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

                			if(online=='1'){
                				
                				
                				 archivoValidacion = "http://186.4.203.42:4000/Vademano/webservices/SincronizacionService.php?jsoncallback=?"
                				 	
                				  var queryIns = 'INSERT INTO usuarios(id_usuario, nombres_usuario, apellidos_usuario , usuario_usuario , celular_usuario , telefono_usuario, nombre_estado ) VALUES (?,?,?,?,?,?,?)';
                					 
                					$.getJSON( archivoValidacion, { id_usuario:value})
									.error(function(jqXHR, textStatus, errorThrown) {
									alert("error " + textStatus);
									alert("incoming Text " + jqXHR.responseText);
    })
                					
									.done(function(x) {
									 
                						db.transaction(function (tx) {
                							 tx.executeSql("DELETE FROM usuarios;");
                							});
                						
                							$.each(x, function(i, j) {			
                								   db.transaction(function (tx) {				  
                								   tx.executeSql(queryIns,
                										   [j.id_usuario,j.nombres_usuario,j.apellidos_usuario,j.usuario_usuario,j.celular_usuario,j.telefono_usuario,j.nombre_estado],
                									 function (tx, res) {
                										   
                										     traeFichas();
                				                			 traeImagenEspecies();
                			                				
                			                				window.location.href = "Bienvenida.html";
                									   
                									  },
                											   function (e) {alert("El usuario no esta registrado en nuestro sistema o esta inactivo: " + e.message);});
                								   });
                						  });
                					});
                				
                			}else{
                				
                				alert("Necesitas tener internet en tu dispositivo para registrarlo.");
                			}
                			
                			
                	}else{
                		
                		alert("No se pudo leer el cordigo Qr.");
                	}
                }
            }
        },
        function (error) {
            alert("Error al abrir la cámara de tu dispositivo: " + error);
        }
   );
}


function openURL(url)
{
    window.open(url, '_blank', 'location=yes');
}

/*****************************************************************************************/

function traeFichas()
{
	var base_url = 'http://186.4.203.42:4000/Vademano/webservices/';
	var pag_service = 'FichaService.php?jsoncallback=?' ;

	var queryIns = 'INSERT INTO fichas_service(id_fichas, nombre_fichas, encabezado_tabla_fichas, farmacocinetica_fichas, accion_terapeutica_fichas, clasificacion_farmacologica_fichas, forma_terapeutica_fichas, indicaciones_uso_fichas, interacciones_fichas, contraindicaciones_fichas, periodo_retiro_fichas, advertencias_fichas, presentacion_fichas, registro_sanitario_fichas, id_fichas_fotos, consultas_fichas, buscador, mecanismo_accion_fichas, efectos_colaterales_fichas, conservacion_fichas, ingredientes_fichas, tipo_alimento_fichas, encabezado_dosificacion_fichas, tipo_ficha, tabla_formas_administracion, tabla_laboratorios, tabla_distribuidores, tabla_composicion, tabla_dosificacion, nombre_laboratorios, nombre_distribuidores, foto_fichas_fotos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	 
	$.getJSON( base_url+pag_service, { action:'consulta'})
	.done(function(x) {
		db.transaction(function (tx) {
			 tx.executeSql("DELETE FROM fichas_service;");
			});
		
		$.each(x, function(i, j) {			
			   db.transaction(function (tx) {				  
				   tx.executeSql(queryIns,[j.id_fichas,j.nombre_fichas, j.encabezado_tabla_fichas,
				                           j.farmacocinetica_fichas, j.accion_terapeutica_fichas,
				                           j.clasificacion_farmacologica_fichas, j.forma_terapeutica_fichas,
				                           j.indicaciones_uso_fichas, j.interacciones_fichas,
				                           j.contraindicaciones_fichas, j.periodo_retiro_fichas,
				                           j.advertencias_fichas, j.presentacion_fichas,
				                           j.registro_sanitario_fichas, j.id_fichas_fotos,
				                           j.consultas_fichas, j.buscador,j.mecanismo_accion_fichas,
				                           j.efectos_colaterales_fichas,j.conservacion_fichas,
				                           j.ingredientes_fichas,j.tipo_alimento_fichas, j.encabezado_dosificacion_fichas,
				                           j.tipo_ficha, j.tabla_formas_administracion,j.tabla_laboratorios,
				                           j.tabla_distribuidores,j.tabla_composicion, j.tabla_dosificacion,
				                           j.nombre_laboratorios,j.nombre_distribuidores,
				                           j.foto_fichas_fotos],function (tx, res) {},function (e) {alert("ERROR: " + e.message);});
				 
			   				});
			  });
	});
	
}


/**********************************************************************************************/

function traeImagenEspecies()
{
	var queryIns = 'INSERT INTO foto_especies(id_fichas_especies,id_fichas,id_especies,nombre_especies,logo_especies) VALUES (?,?,?,?,?)';
	var datosUsuario ='especies';	

	archivoValidacion = "http://186.4.203.42:4000/Vademano/webservices/FichaImgService.php?jsoncallback=?"

 	$.getJSON( archivoValidacion, { imagen:datosUsuario })
	.done(function(x) {
		db.transaction(function (tx) {
			tx.executeSql("DELETE FROM foto_especies;");
			});
		
		 $.each(x, function(i, j) {
			    db.transaction(function (tx) {
				 tx.executeSql(queryIns,[j.id_fichas_especies,j.id_fichas,j.id_especies,j.nombre_especies,j.logo_especies ],function (tx, res) {},function (e) {alert("ERROR: " + e.message);});
			   });
		 });
	})
}

