
$(document).on("ready",checkConnection1);




var cedula = localStorage.getItem('cedula_usuarios');
var nombre_usuarios = localStorage.getItem('nombre_usuarios');
var fotografia_usuarios = localStorage.getItem('fotografia_usuarios');

var correo_usuarios = localStorage.getItem('correo_usuarios');
var id_estado = localStorage.getItem('id_estado');
var id_rol = localStorage.getItem('id_rol');

function checkConnection1() {
      
	 var nombre_rol="";
	 var nombre_estado="";
	
	 imgficha = 'data:image/png;base64,'+fotografia_usuarios;
	 $("#fotografia_usuarios").attr({'src':imgficha});
	 $("#nombre_usuarios").html(nombre_usuarios);
	 
	 $("#fotografia_usuarios_2").attr({'src':imgficha});
	 $("#cedula_usuarios").val(cedula);
	 $("#nombre_usuarios_2").val(nombre_usuarios);
	 $("#correo_usuarios").val(correo_usuarios);
	 
	 
	 if(id_rol == 1){
			
			 nombre_rol="Administrador";
			
		}else if(id_rol == 41){
			
			 nombre_rol="Partícipe";
			
		}else{
			
			 nombre_rol="Consultor";
			
		}
		 
		 $("#nombre_rol").val(nombre_rol);  	
	 
	 
	if(id_estado == 1){
		
		 nombre_estado="ACTIVO";
		
	}else if(id_estado == 2){
		
		 nombre_estado="DESAFILIADO";
		
	}else{
		
		 nombre_estado="LIQUIDADO CESANTE";
		
	}
	 
	 $("#nombre_estado").val(nombre_estado);  	
	    
	 
   }

