window.addEventListener("load",()=>{
    document.getElementById("btnmodoscuro").addEventListener("click",cambiarmodo);
    document.getElementById("btnfuente").addEventListener("click",cambiarfuente);
})
function cambiarmodo(){
    var element =document.body;
    element.classList.toggle("negro")
}