import {collection,addDoc, getDocs,updateDoc,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {db} from "./firebase.js";
export const registrarreserva=async(persona)=>{
    console.log("persona")
    console.log(persona)
    const docRef = await addDoc(collection(db,"persona"),persona);
}
export const obtenerPersonas = async()=>{
    const ref = collection(db,"persona");
    const quearySnap = await getDocs(ref)
    console.log(quearySnap)
    let listado =[]
    quearySnap.forEach(doc =>{
        listado.push({...doc.data(),id:doc.id}); //id a los objetos, los puntos son para ingresar de diccionario en diciconario

    });
    return listado;
}
export const actualizarPersona = async(objeto,id)=>{
    const ref = doc(db,"persona",id);
    await updateDoc(ref,objeto);
}
export const eliminarPersona = async(id)=>{
    const ref = doc(db,"persona",id);
    await deleteDoc(ref);

}