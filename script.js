import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarreserva } from "./promesas.js";
window.addEventListener("load",()=>{
    document.getElementById("btnmodoscuro").addEventListener("click",cambiarmodo);
    document.getElementById("btnfuente").addEventListener("click",cambiarfuente);
    document.getElementById("btnregistro").addEventListener("click",validar);
    document.getElementById("btnregistro").addEventListener("click",registrar);
    document.getElementById("btnACTUALIZA").addEventListener("click",actualizar);
    cargarDatos()
})
function cambiarmodo(){
    var element =document.body;
    element.classList.toggle("negro")
}
function cambiarfuente(){
    document.body.classList.toggle("fontsize")

}
function validar(){
    validarcampo('nombre')
    validarcampo('email')
    validarcampo('fecha')
    validarcampo('comentario')
    validarlargo('telefono',8)
}
function validarcampo(idCampo){
    let inombre = document.getElementById(idCampo);
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
function validarlargo(campo,largo){
    let elemento = document.getElementById(campo);
    let valor = elemento.value;
    if(valor.length!=largo){
        elemento.style.borderColor="red";
        let pelemento=document.getElementById('p'+campo);
        pelemento.style.display="block";
    }else{
        elemento.style.borderColor="green";
        let pelemento=document.getElementById('p'+campo);
        pelemento.style.display="none"
    }
}
const registrar=()=>{
    //recupero datos
    let enombre=document.getElementById("nombre")
    let eemail=document.getElementById("email")
    let etelefono=document.getElementById("telefono")
    let efecha=document.getElementById("fecha")
    let etiporeserva=document.getElementById("tiporeserva")
    let eacompañante;
    if(document.getElementById("acompañante1").checked){  //verifica con el checked 
        eacompañante="1-2 personas"
    }else if(document.getElementById("acompañante2").checked){
        eacompañante="3 o mas personas"
    }
    let ecomentarios = document.getElementById("comentario")
    let emetodo;
    if(document.getElementById("contacto").checked){
        emetodo="Email";
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
const cargarDatos = ()=>{
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
        document.getElementById("tbDatos").innerHTML=estructura;
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
            let botonDEL = document.getElementById("DEL"+persona.id); //BOTON DELETE
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
const actualizar = ()=>{
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