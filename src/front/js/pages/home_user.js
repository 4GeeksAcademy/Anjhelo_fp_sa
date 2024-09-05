import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";


export const Home_user = () => {

    const {actions, store} = useContext(Context)

    useEffect(() => {
        actions.getUsers();
    },[])

    if(localStorage.getItem("token"))
    {
        return(
        <div>
            <h1>Hola</h1>
        </div>)
    }
    else
    {
        return(
        <div>
            <h1>Adios</h1>
        </div>)
    }
}