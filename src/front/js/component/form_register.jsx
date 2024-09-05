import React, {useState, useContext} from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
export const Form_register = () => {

    const [formData, setFormData] = useState({name: "", email: "", password: ""})
    const {store, actions} = useContext(Context);

    const getData = (e) =>{
        e.preventDefault();
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const sendData = (e) =>{
        e.preventDefault()
        actions.register(formData);
    }

    return(
        <form className="was-validated" novalidate onSubmit={sendData}>
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
            <button type="submit" class="btn btn-primary container">Registrarse</button>
            <Link to="/">
            <i class="fa-solid fa-chevron-left mt-3"></i>
            </Link>
        </form>
    )
}