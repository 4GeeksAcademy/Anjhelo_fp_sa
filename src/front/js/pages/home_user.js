import React, { useContext, useEffect } from "react";
import { Tabla } from "../component/tabla.jsx";
import { Context } from "../store/appContext";


export const Home_user = () => {

    const {actions, store} = useContext(Context)

    useEffect(() => {
        actions.getUsers();
    },[])

    if(localStorage.getItem("token"))
    {
        return(
        <div className="container">
            <h1>Admin: {localStorage.getItem("name")}</h1>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {store.Lista.map((item, index) => 
                        <Tabla num={index + 1} name={item.name} email={item.email} password={item.password} key={index}/>
                    )}
                </tbody>
            </table>
        </div>)
    }
    else if (localStorage.getItem("token") == undefined || localStorage.getItem("token" === ""))
    {
        return(
        <div>
            <h1>Tu no deberias estar aqui</h1>
        </div>)
    }
}