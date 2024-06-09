import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarreserva } from "./promesas.js";
window.addEventListener("load",()=>{   //solo se gatilla al cargar la pagina 
    //asigna la funcion cambiarmodo al boton de modo oscuro
    document.getElementById("btnmodoscuro").addEventListener("click",cambiarmodo);
    //asigna la funcion cambiarfuente al boton fuente
    document.getElementById("btnfuente").addEventListener("click",cambiarfuente);
    //asigna la funcion validar al boton registro, para validar los campos que no se han completado
    document.getElementById("btnregistro").addEventListener("click",validar);
    // asigna la funcion registrar al boton registro
    document.getElementById("btnregistro").addEventListener("click",registrar);
    //asigna la funcion actualizar al boton actualizar
    document.getElementById("btnACTUALIZA").addEventListener("click",actualizar);
    cargarDatos()
})
function cambiarmodo(){  //funcion para cambiar a modo oscuro
    var element =document.body; //obtiene el body del html
    element.classList.toggle("negro") //con el toggle alterna  la clase "negro" en el body, la clase negro en el css pone el backgroundcolor de color negro
}
function cambiarfuente(){ //funcion para cambiar la fuente de la pagina a una mas grande
    document.body.classList.toggle("fontsize") //alterna la clase creada en el body, "fontsize" en el css cambia la fuente a una mas grande

}
function validar(){  //esta funcion gatilla las funciones validarcampo y validarlargo, para validar los campos vacios del formulario
    validarcampo('nombre')
    validarcampo('email')
    validarcampo('fecha')
    validarcampo('comentario')
    validarlargo('telefono',8)
}
function validarcampo(idCampo){  //funcion que sirve para validar los campos que no esten vacios, si esta vacio los marca con rojo aparte de aparecer un mensaje de error
    let inombre = document.getElementById(idCampo); //obiene el elemento por su id
    console.log(inombre)
    let nombre = inombre.value;
    console.log(nombre)
    if(nombre.trim()==""){
        inombre.style.borderColor="red";
        let pnombre = document.getElementById("p"+idCampo);
        pnombre.style.display ="block";    
    }else{
        inombre.style.borderColor="green";
        let pnombre = document.getElementById("p"+idCampo);
        pnombre.style.display="none"
    }
}
function validarlargo(campo,largo){ //valida q el valor del campo tenga el largo que se le indica 
    let elemento = document.getElementById(campo);
    let valor = elemento.value;
    if(valor.length!=largo){ //si la longitud del valor no es igual a la longitud asignada se le cambia el color y muestra mensaje de error
        elemento.style.borderColor="red";
        let pelemento=document.getElementById('p'+campo);
        pelemento.style.display="block";
    }else{
        elemento.style.borderColor="green";
        let pelemento=document.getElementById('p'+campo);
        pelemento.style.display="none"
    }
}
const registrar=()=>{ //funcion que registra los datos
    //recupero datos
    let enombre=document.getElementById("nombre")
    let eemail=document.getElementById("email")
    let etelefono=document.getElementById("telefono")
    let efecha=document.getElementById("fecha")
    let etiporeserva=document.getElementById("tiporeserva")
    let eacompañante;
    if(document.getElementById("acompañante1").checked){  //verifica con el checked
        eacompañante="1-2 personas"  //si esta marcado asigna "1-2 personas"
    }else if(document.getElementById("acompañante2").checked){   //si la opcion anterior no esta marcada  asigna a la siguiente
        eacompañante="3 o mas personas"
    }
    let ecomentarios = document.getElementById("comentario")
    let emetodo;
    if(document.getElementById("contacto").checked){ //se verifica que este marcado, 
        emetodo="Email"; //se le asigna email por la opcion marcada
    }else if(document.getElementById("contacto2").checked){
        emetodo="telefono";
    }
    
    //recupero valores
    let vnombre = enombre.value;
    let vemail = eemail.value;
    let vtelefono = etelefono.value;
    let vfecha = efecha.value;
    let vtiporeserva = etiporeserva.value;
    let vacompañante = eacompañante;
    let vcomentarios = ecomentarios.value;
    let vmetodo = emetodo;
    // objeto
    let objeto={nombre:vnombre,email:vemail,telefono:vtelefono,fecha:vfecha,tiporeserva:vtiporeserva,acompañante:vacompañante,
        comentarios:vcomentarios,metodo:vmetodo
    }
    console.log(objeto)
    //validacion del registro 
    registrarreserva(objeto).then(()=>{
        alert("registrado con exito");
        cargarDatos();
    }).catch((r)=>{
        alert("Algo ocurrio intentelo nuevamnete");
        alert(r);
    });
} 
const cargarDatos = ()=>{  //obtiene y muestra los datos en una tabla
    obtenerPersonas().then((personas)=>{
        console.log("recuperado")
        let estructura="";
        personas.forEach((persona)=>{
            estructura +="<tr>"
            estructura +="<td>"+persona.nombre+"</td>";
            estructura +="<td>"+persona.email+"</td>";
            estructura +="<td>"+persona.telefono+"</td>";
            estructura +="<td>"+persona.fecha+"</td>";
            estructura +="<td>"+persona.tiporeserva+"</td>";
            estructura +="<td>"+persona.acompañante+"</td>";
            estructura +="<td>"+persona.comentarios+"</td>";
            estructura +="<td>"+persona.metodo+"</td>";
            estructura += "<td><button id='UPD"+persona.id+"'>Actualizar</button></td>";
            estructura += "<td><button id='DEL"+persona.id+"'>Eliminar</button></td>";
            estructura += "</tr>"
        });
        document.getElementById("tbDatos").innerHTML=estructura;  //agrega  la estructura
        personas.forEach((persona)=>{
            let botonUPD =document.getElementById("UPD"+persona.id);
            botonUPD.addEventListener("click",()=>{
                let enombre=document.getElementById("UPDnombre");
                let eemail=document.getElementById("UPDemail");
                let etelefono=document.getElementById("UPDtelefono");
                let efecha=document.getElementById("UPDfecha");
                let etiporeserva=document.getElementById("UPDtiporeserva");
                let eacompañante=document.getElementById("UPDacompañante")
                let ecomentarios=document.getElementById("UPDcomentario");
                let emetodo = document.getElementById("UPDcontactoo")
                enombre.value=persona.nombre;
                eemail.value=persona.email;
                etelefono.value=persona.telefono;
                efecha.value=persona.fecha;
                etiporeserva=persona.tiporeserva;
                eacompañante = persona.acompañante;
                ecomentarios.value=persona.comentario;
                emetodo = persona.contactoo
                document.getElementById("btnACTUALIZA").value=persona.id;
            })
            let botonDEL = document.getElementById("DEL"+persona.id); //BOTON DELETE, elimina los datos de la collecion 
            botonDEL.addEventListener("click",()=>{
                if(confirm("Seguro que quiere eliminar a \nNombre: "+persona.nombre+"")){
                    eliminarPersona(persona.id).then(()=>{
                        alert("Eliminado con exito")
                        cargarDatos();
                    })
                }
            })
        })
    });   
}
const actualizar = ()=>{ //funcion que actualiza los datos de la tabla
    //recupero datos
    let enombre=document.getElementById("UPDnombre")
    let eemail=document.getElementById("UPDemail")
    let etelefono=document.getElementById("UPDtelefono")
    let efecha=document.getElementById("UPDfecha")
    let etiporeserva=document.getElementById("UPDtiporeserva")
    let eacompañante;
    if(document.getElementById("UPDacompañante1").checked){  //verifica con el checked 
        eacompañante="1-2 personas"
    }else if(document.getElementById("UPDacompañante2").checked){
        eacompañante="3 o mas personas"
    }
    let ecomentarios = document.getElementById("UPDcomentario")
    let emetodo;
    if(document.getElementById("UPDcontacto").checked){
        emetodo="Email";
    }else if(document.getElementById("UPDcontacto2").checked){
        emetodo="telefono";
    }
    
    //recupero valores
    let vnombre = enombre.value;
    let vemail = eemail.value;
    let vtelefono = etelefono.value;
    let vfecha = efecha.value;
    let vtiporeserva = etiporeserva.value;
    let vacompañante = eacompañante;
    let vcomentarios = ecomentarios.value;
    let vmetodo = emetodo;
    // objeto
    let objeto={nombre:vnombre,email:vemail,telefono:vtelefono,fecha:vfecha,tiporeserva:vtiporeserva,eacompañante,vacompañante,
        comentarios:vcomentarios,metodo:vmetodo
    }
    let id =document.getElementById("btnACTUALIZA").value;
    actualizarPersona(objeto, id).then(()=>{
        alert("se actualizo con exito");
        cargarDatos();

    })
}