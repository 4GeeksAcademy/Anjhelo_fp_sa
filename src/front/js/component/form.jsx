import React, { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../store/appContext"

export const Form = () => {

    const [formData, setFormData] = useState({email: "", password: ""})
    const {actions, store} = useContext(Context)
    const navigate = useNavigate();

    const getData = (e) => {

        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const sendData = async (e) => {
        e.preventDefault();
        await actions.login(formData); 

        const token = localStorage.getItem("token"); 
        if (token) {
            navigate("/home_user")
        }
    };
    
    return(
        <form onSubmit={sendData}>
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
            
        </form>
    )
}