//id = fname / nombre
//id = email / correo
//id = phone / telefono
//id = message / tetxarea

let btnEnviarMensaje = document.querySelector("#enviarMail");
let nameField = document.querySelector("#fname");
let emailField = document.querySelector("#email");
let phoneField = document.querySelector("#phone");
let messageField = document.querySelector("#message");


btnEnviarMensaje.onclick = () =>{

    if (nameField.value !="" && emailField.value !="" && phoneField.value !="" && messageField.value !=""){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your email has been sent successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          limpiar();
    } else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The fields must be complete!",
          });
    }
    

    return false;
    
}

function limpiar(){
    nameField.value=""
    emailField.value=""
    phoneField.value=""
    messageField.value=""
}