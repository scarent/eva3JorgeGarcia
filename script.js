window.addEventListener("load",()=>{
    document.getElementById("btnmodoscuro").addEventListener("click",cambiarmodo);
    document.getElementById("btnfuente").addEventListener("click",cambiarfuente);
    document.getElementById("btnregistro").addEventListener("click",validar);

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