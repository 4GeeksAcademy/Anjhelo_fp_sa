import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Form } from "../component/form.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "500px" }}>
				<Form />
			</div>
		</div>

	);
};
