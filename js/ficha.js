$(document).on("ready",ini);

function ini()
{
	
}

document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("vade.db", "1.0", "MY DB", 200000); 

function onDeviceReady() 
{
	db.transaction(init_pag, errorCB, successCB);
}

function init_pag(tx)
{	
	checkConnection();
}

var online;
var contador_fichas=0;
var cont_real=0;

function checkConnection() {
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
    	
    	 check_actualizacion();
    	 
    	 $(document).on('click', '#btn_actualizar', function(){
    		 
    		 traeFichas();
    		 traeImagenEspecies();
    		 verificarusuario();
    		 alert("Datos Actualizados Correctamente");
    		 cont_real=0;
			 $("#count_fichas_nuevas").html(cont_real);
			 
    		});
    	 
     }else{
    	 
    	 	$(document).on('click', '#btn_actualizar', function(){
    		 alert("Necesitas tener internet en tu dispositivo para actualizar las nuevas fichas.");
    		 cont_real=0;
			 $("#count_fichas_nuevas").html(cont_real);
    		});
    	
     }
     
    }


function check_actualizacion() {
	
	var datosUsuario ='actualizacion';	

	archivoValidacion = "http://186.4.203.42:4000/Vademano/webservices/ActualizacionFichaService.php?jsoncallback=?"

 	$.getJSON( archivoValidacion, { actualizar:datosUsuario })
	.done(function(x) {
		
		contador_fichas=x[0].total;
		
		if(contador_fichas > 0){
			db.transaction(function(transaction) {
				transaction.executeSql('SELECT * FROM fichas_service WHERE 1=1 ', [], function (tx, results) {
				var len = results.rows.length, i;
				cont_real=contador_fichas-len;
				
				if (cont_real > 0){
					$("#count_fichas_nuevas").html(cont_real);
				}else{
					cont_real=0;
					$("#count_fichas_nuevas").html(cont_real);
				}
			
				}, null);
				
			});
			
		}
	});
	
}


function verificarusuario(){
	
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM usuarios WHERE 1=1', [], function (tx, results) {
		var len_usuarios = results.rows.length, i;
		var id_usuario=0;
		
		for (i=0; i<=len_usuarios-1; i++) {
			id_usuario = results.rows.item(i).id_usuario;
		}
		
		if(id_usuario > 0){
			 archivoValidacion = "http://186.4.203.42:4000/Vademano/webservices/SincronizacionUsuarioInactivoService.php?jsoncallback=?"
				   var queryIns = 'INSERT INTO usuarios(id_usuario, nombres_usuario, apellidos_usuario , usuario_usuario , celular_usuario , telefono_usuario, nombre_estado ) VALUES (?,?,?,?,?,?,?)';
					 
					$.getJSON( archivoValidacion, { id_usuario:id_usuario})
					.done(function(x) {
						console.log(x);
						db.transaction(function (tx) {
							 tx.executeSql("DELETE FROM usuarios;");
							});
						
							$.each(x, function(i, j) {			
								   db.transaction(function (tx) {				  
								   tx.executeSql(queryIns,
										   [j.id_usuario,j.nombres_usuario,j.apellidos_usuario,j.usuario_usuario,j.celular_usuario,j.telefono_usuario,j.nombre_estado],
									 function (tx, res) {
										   
									   db.transaction(function(transaction) {
											transaction.executeSql('SELECT * FROM usuarios WHERE 1=1', [], function (tx, results) {
											var len_usuarios1 = results.rows.length, i;
											var id_usuario1=0;
											var estado='';
											
											for (i=0; i<=len_usuarios1 - 1; i++) {
												id_usuario1 = results.rows.item(i).id_usuario;
												estado = results.rows.item(i).nombre_estado;
											}
											
											if(id_usuario1>0){
												
												if(estado=='ACTIVO'){
													
												}else{
													
													window.location.href = "UsuarioInactivo.html";
												}
												
											}else{
												
												window.location.href = "index1.html";
											}
											
											}, null);
											
										});
											
									  },
											   function (e) {alert("ERROR: " + e.message);});
								   });
						  });
					});
			
		}else{
			
			window.location.href = "index1.html";
		}
		
		
		}, null);
		
	});
	
}


function traeFichas(){
	
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

function errorCB(err) {
    console.log('error encontrado');
}
function successCB (){
}

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

