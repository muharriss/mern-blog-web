import React from "react";
import './textArea.css'

const TextArea = ({...rest}) => {
    return (
        <textarea {...rest} className="text-area"></textarea>
    )
}

export default TextArea