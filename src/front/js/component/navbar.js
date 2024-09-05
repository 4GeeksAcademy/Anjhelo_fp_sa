import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const {actions, store} = useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-primary" onClick={actions.cerrar_sesion}>SALIR <i class="fa-solid fa-arrow-right-from-bracket ms-1"></i></button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
