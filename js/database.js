$(document).on("ready",ini);

function ini()
{
	
}

//<!--Calling onDeviceReady method-->
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("vade.db", "1.0", "MY DB", 200000); //will create database Dummy_DB or open it

/*****creacion de tablas***/
var tblFichas = 'CREATE TABLE IF NOT EXISTS fichas_service';
tblFichas +='(id_fichas_service INTEGER PRIMARY KEY AUTOINCREMENT, id_fichas INTEGER  , nombre_fichas TEXT  ,'; 
tblFichas +='encabezado_tabla_fichas TEXT  , farmacocinetica_fichas TEXT  , accion_terapeutica_fichas TEXT  ,'; 
tblFichas +='clasificacion_farmacologica_fichas TEXT  , forma_terapeutica_fichas TEXT  , indicaciones_uso_fichas TEXT  ,'; 
tblFichas +='interacciones_fichas TEXT  , contraindicaciones_fichas TEXT  , periodo_retiro_fichas TEXT  ,'; 
tblFichas +='advertencias_fichas TEXT  , presentacion_fichas TEXT  , registro_sanitario_fichas TEXT  ,'; 
tblFichas +='id_fichas_fotos INTEGER  , consultas_fichas INTEGER  , buscador TEXT  , mecanismo_accion_fichas TEXT  ,';
tblFichas +='efectos_colaterales_fichas TEXT  , conservacion_fichas TEXT  , ingredientes_fichas TEXT  ,'; 
tblFichas +='tipo_alimento_fichas TEXT  , encabezado_dosificacion_fichas TEXT  , tipo_ficha TEXT  ,'; 
tblFichas +='tabla_formas_administracion TEXT  , tabla_laboratorios TEXT  , tabla_distribuidores TEXT  ,';
tblFichas +='tabla_composicion TEXT  , tabla_dosificacion TEXT, nombre_laboratorios TEXT, nombre_distribuidores TEXT, foto_fichas_fotos TEXT)';


var tblImagenEspecies = 'CREATE TABLE IF NOT EXISTS foto_especies ' ;
	tblImagenEspecies += '(id_fichas_especies INTEGER, id_fichas INTEGER,id_especies INTEGER,';
    tblImagenEspecies += 'nombre_especies TEXT , logo_especies TEXT)';
/******TERMINA Creacion de tablas*/


function onDeviceReady() {

	db.transaction(populateDB, errorCB, successCB);
}

//create table and insert some record
function populateDB(tx) {
	
	//creamos  las tablas
	var tblUsuarios = 'CREATE TABLE IF NOT EXISTS usuarios (id_usuario_local INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, nombres_usuario TEXT, apellidos_usuario TEXT, usuario_usuario TEXT, celular_usuario TEXT, telefono_usuario TEXT, nombre_estado TEXT)';

	tx.executeSql(tblUsuarios, [],
    	function(tx, result) {},
    	function(error){
    		alert('Error al crear Tabla Usuarios');
    });
    
    tx.executeSql(tblFichas,[],function(tx,result){},function(error){alert('Error al iniciar fichas')});
	tx.executeSql(tblImagenEspecies,[],function(tx,result){},function(error){alert('Error al iniciar especies')});
	
}  
   
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

//function will be called when process succeed
function successCB() {

}
