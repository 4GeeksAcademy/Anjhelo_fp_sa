import React, { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../store/appContext"

export const Form = () => {

    const [formData, setFormData] = useState({email: "", password: ""})
    const {actions, store} = useContext(Context)
    const [status, setStatus] = useState(null)
    const navigate = useNavigate();

    let result = true

    const getData = (e) => {

        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const sendData = async (e) => {
        e.preventDefault();
        const result = await actions.login(formData);
        setStatus(result);

        if (result) {
            navigate("/home_user")
        }
        else{
            navigate("/")
        }
    }

    const respuesta = (status) => {
        if (status === false) {
            return (
                <div class="alert alert-danger mt-2" role="alert">
                    La dirección de correo electrónico o la contraseña que has introducido no son correctas.
                </div>
            )}
        else{
            return null
        }
    };
    
    return(
        <form onSubmit={sendData}>
            <h1 className="text-center">Login</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" name="email" aria-describedby="emailHelp" onChange={getData} required/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" onChange={getData} required/>
            </div>
            <div class="mb-3">
                <Link to="/registro">
                    <a>Registrarse</a>
                </Link>
            </div>
            <button type="submit" class="btn btn-primary container">Ingresar</button>
            {respuesta(status)}
        </form>
    )
}