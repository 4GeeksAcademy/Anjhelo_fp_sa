import React from "react";

export const Tabla = (props) => {



    return(
        <tr>
            <th scope="row">{props.num}</th>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.password}</td>
        </tr>
    )
}