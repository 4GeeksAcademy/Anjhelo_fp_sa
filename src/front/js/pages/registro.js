import React from "react";
import { Form_register } from "../component/form_register.jsx";

export const Registro = () => {
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "500px" }}>
				<Form_register/>
			</div>
		</div>
    ); 
}

