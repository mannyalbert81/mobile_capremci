$(document).on("ready",ini);

function ini()
{
	
}

//<!--Calling onDeviceReady method-->
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("capremci.db", "1.0", "MY DB", 10000); //will create database Dummy_DB or open it


function onDeviceReady() {

	db.transaction(populateDB, errorCB, successCB);
}

//create table and insert some record
function populateDB(tx) {
	
	//creamos  las tablas
	var tblBanner = 'CREATE TABLE IF NOT EXISTS banner (id_banner_local INTEGER PRIMARY KEY AUTOINCREMENT, nombre_banner TEXT)';

	tx.executeSql(tblBanner, [],
    	function(tx, result) {},
    	function(error){
    		alert('Error al crear Tabla Banner');
    });
    
    
	
}  
   
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

//function will be called when process succeed
function successCB() {

}
