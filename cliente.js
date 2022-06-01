const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');


const obtenerPersona = () =>{
    let URL = "http://localhost:8080/personas/persona/"+documento.value;

    documento.value;
    if(documento == ""){
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'el campo de documento es requerido',
            confirmButtonText: 'OK'
        })
    }
    else{
        fetch(URL)
        .then((respuesta) => {
            console.log(respuesta);
            if (respuesta.status === 404){
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'el documento no existe',
                    confirmButtonText: 'OK'
                })
            }
            return respuesta.json();
        })
        .then((response) => {
            console.log(response);
            nombre.value = response.nombre;
            apellido.value = response.apellido;
            edad.value = response.edad;
        })
    }   
}

const registrar = () => {

    if(documento == "" || nombre == "" || apellido == "" || edad == "" ){
        Swal.fire({
            title: 'Error!',
            text: 'asegurse de llenar todos los campos',
            icon: 'info',
            confirmButtonText: 'OK'
        })
    }
    else{
        let URL = "http://localhost:8080/personas/guardar";

        fetch(URL, {
            method:'POST',
            headers:{
                "Content-type":"application/json" 
            },
            body:JSON.stringify({
                id: documento.value,
                nombre: nombre.value,
                apellido: apellido.value,
                edad: edad.value
            })
        })
        .then(response => response)
        .then((respuesta) => {
            console.log(respuesta);

            if(respuesta.status==200){
                limpiar();
                Swal.fire({
                    title: 'Registrado',
                    text: 'la persona se registro',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
            else{
                if(respuesta.status==404){
                    Swal.fire({
                        title: 'Error!',
                        text: 'la persona se no se pudo resgistrar',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
                else{
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }
        })
    }
}


const actualizar = () => {

    let URL = "http://localhost:8080/personas/actualizar";

    fetch(URL,{
        method: 'PUT',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            id: documento.value,
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value
        })
    })
    .then((response) => {
        console.log(response);
        if(response.status==200){
            Swal.fire({
                title: 'Actualizado!',
                text: 'la persona se actualizo correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
        else{
            if(response.status==404){
                Swal.fire({
                    title: 'Error!',
                    text: 'Tiene que llenar el campo de documento buscar y actualizar',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
        return response.json();
    })
    .then(respuesta => {
        nombre.value = respuesta.nombre;
        apellido.value = respuesta.apellido;
        edad.value = respuesta.edad;

        limpiar();
    })
}


const eliminar = () => {

    let URL = "http://localhost:8080/personas/eliminar/"+documento.value;

    if(documento.value == ""){
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Primero tiene que llenar el campo de documento o buscar a la persona que quiere eliminar',
            confirmButtonText: 'OK'
        })
    }
    else{
        fetch(URL,{
            method:'DELETE',
        })
        .then(response => response)
        .then((respuesta) => {
            console.log(respuesta);
            if(respuesta.status==200){
                limpiar();
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'la persona se elimino correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
            else{
                if(respuesta.status==204){
                    Swal.fire({
                        title: 'Error!',
                        text: 'la persona se no se pudo eliminar',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }else{
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }      
        })
    }
}


function limpiar(){
    documento.value="";
    nombre.value="";
    apellido.value="";
    edad.value="";
}