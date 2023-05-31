import React from "react";
import Gap from "../gap";

const Upload = ({img, ...rest}) => {
    return (
    <div className="upload-wrapper" >
        {img && <img className="preview" src={img} />}
        <Gap height={10} />
        <input className="upload" type="file" {...rest}/>
    </div>
    )
}

export default Upload 