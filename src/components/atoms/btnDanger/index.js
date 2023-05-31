import React from "react";
import './btnDanger.css'

const BtnDanger = ({title, ...rest}) => {
    return (
        <div>
            <button className="btn-danger" {...rest}>{title}</button>
        </div>
    )
}

export default BtnDanger