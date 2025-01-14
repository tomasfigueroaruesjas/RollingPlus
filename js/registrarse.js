//localstorage debe tener una clave llamada usuarios -> array de objetos con los datos de cada usuario registrado

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let exitoRegistro = document.getElementById("registro") 

class Usuario {
    constructor(nombre, email, password, rol = "usuario", logueado = false) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.logueado = logueado;
    }
}

const registroUsuario = function (e) {

    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;


    if (isNaN(nombre))
    {
        //comparar contraseñas
        if (password !== password2) 
        {
            return alert("Las contraseñas no coinciden");
        }
    
        let validar = usuarios.find((user) => {
            return user.email === correo;
        });
    
        if (validar) 
        {

            setTimeout(function(){

                let msj = document.createElement("div")
                // msj.classList= "col-12 col-md-12 col-lg-12"
                
                let cuerpo = `  <div class="alert alert-danger mt-5" role="alert">
                                    El correo ${correo} ya se encuentra en uso!
                                </div>`
                
                msj.innerHTML = cuerpo
                document.getElementById("registro").appendChild(msj)
            }, 100)

            // return alert("El correo ya está registrado.");
        }else{

            usuarios.push(new Usuario(nombre, correo, password));
    
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
            document.getElementById("formularioRegistro").reset();
    
    
            let msj = document.createElement("div")
            // msj.classList= "col-12 col-md-12 col-lg-12"
            
            let cuerpo = `  <div class="alert alert-success mt-5" role="alert">
                                El correo ${correo} se ha registrado correctamente!
                            </div>`
            
            msj.innerHTML = cuerpo
            document.getElementById("registro").appendChild(msj)
    
            setTimeout(function(){
                location.replace("../pages/login.html");
            }, 3000)
        }
        
        
    }
    else
    {
        return alert("Ingrese datos validos")
    }
};

document.getElementById("formularioRegistro").addEventListener("submit", registroUsuario);
