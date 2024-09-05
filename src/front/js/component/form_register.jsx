import React, {useState, useContext} from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";
export const Form_register = () => {

    const [formData, setFormData] = useState({name: "", email: "", password: ""})
    const {store, actions} = useContext(Context);
    const [registro, setRegistro] = useState(null)
    const navigate = useNavigate();

    const getData = (e) =>{
        e.preventDefault();
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const sendData = async (e) =>{
        e.preventDefault()
        setRegistro(await actions.register(formData));
        console.log(registro)
    }


    const respuesta = (registro) => {
        if (registro == true) {
            return (
                <div class="alert alert-primary mt-2" role="alert">
                    Registro exitoso
                </div>
            );
        } else if(registro == false) {
            return (
                <div class="alert alert-danger mt-2" role="alert">
                    Usuario ya registrado
                </div>
            );
        }
        else{
            return null
        }
    };
    
    return(
        <form className="was-validated" novalidate onSubmit={sendData}>
            <h1 className="text-center">Registro</h1>
            <div class="mb-3">
                <label for="exampleName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="name" name="name" required onChange={getData}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" required onChange={getData}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required onChange={getData}/>
            </div>           
            <button type="submit" class="btn btn-primary container" id="liveToastBtn">Registrarse</button>
            {respuesta(registro)}
            <Link to="/">
            <i class="fa-solid fa-chevron-left mt-3"></i>
            </Link>
        </form>
    )
}