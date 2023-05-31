 import React from "react";
 import './link.css'

 const LinkTo = (props) => {
    return (
        <div>
            <p className="link" onClick={props.onClick}>{props.title}<span className="link2">{props.title2}</span></p>
        </div>
    )
 }

 export default LinkTo