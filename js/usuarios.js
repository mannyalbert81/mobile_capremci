var base_url = 'http://localhost:5000/Vademano/webservices/';
var pag_service = 'LoginService.php' ;
//var base_url = 'http://186.4.203.42:4000/Vademano/webservices/';
//var pag_service = 'FichaService.php' ;

$(document).on("ready",ini);

function ini()
{
	
}

document.addEventListener("deviceready", onDeviceReady, false);

var db = window.openDatabase("vade.db", "1.0", "MY DB", 200000); //crea o abre la base

function onDeviceReady() 
{
	db.transaction(init_pag, errorCB, successCB);
}

function init_pag(tx)
{
	
	//tx.executeSql('DROP TABLE IF EXISTS fichas_service');
		
	traeUsuarios();
}

function traeFichas()
{
	
	//var query='INSERT INTO usuarios (nombres_usuarios, apellidos_usuarios,usuario_usuarios,clave_usuarios) VALUES (?,?,?,?)';
	var queryIns = 'INSERT INTO usuarios(nombre_estado, id_usuario, nombres_usuario, apellidos_usuario, usuario_usuario, celular_usuario, telefono_usuario ) VALUES (?,?,?,?,?,?,?)';
	
	
	$.ajax({
		   type: 'POST',
		   url: base_url+pag_service,
		   data:{action:'consulta'},
		   dataType: 'json',
		   success: function (x) {
			   
			   $.each(x, function(i, j) {
				   //console.log( j.nombre_fichas );
				   db.transaction(function (tx) {
					   
					   tx.executeSql(queryIns,[j.nombre_estado, 
					                 			j.id_usuario,
					                			j.nombres_usuario, 
					                 			j.apellidos_usuario, 
					                 			j.usuario_usuario, 
					                  			j.celular_usuario, 
					                  			j.telefono_usuario ],function (tx, res) {},function (e) {alert("ERROR: " + e.message);});
					 
				   });
				  });
			   
			   //show_fichas();
			  
			   } ,
			error: function (jqXHR, textStatus, errorThrown) {
			     $("#fichas_registradas").html("Ocurrio un error al cargar la informacion de Usuarios..."+jqXHR);
		 }

		});
}


function errorCB(err) {
    console.log('error encontrado');
}
function successCB (){
}


/*FALLOS*/
/*//tx.executeSql('INSERT INTO usuarios (nombres_usuarios, apellidos_usuarios,usuario_usuarios,clave_usuarios) VALUES (?,?,?,?)',[],errorCB(tx),successCB);*/
//tx.executeSql('INSERT INTO usuarios (nombres_usuarios, apellidos_usuarios,usuario_usuarios,clave_usuarios) VALUES ("a","b","c","d")',[],successCB,errorCB(tx));					
/******PARA COMPROBAR**********/
/*
tx.executeSql(queryIns,[j.id_fichas,
j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas,j.nombre_fichas, j.id_fichas ],function (tx, res) {},function (e) {alert("ERROR: " + e.message);});
*/